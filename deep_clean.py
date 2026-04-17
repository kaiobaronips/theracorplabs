import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern 1: Ternary leaks (property: val ? opt1 : opt2)
ternary_pattern = re.compile(r'([a-zA-Z-]{3,}):([^;{}]+\?[^;{}]+:[^;{}]+(?=;|}))')
ternary_matches = ternary_pattern.findall(content)

# Pattern 2: Literal leaks (property: null; property: undefined;)
literal_pattern = re.compile(r'([a-zA-Z-]{3,}):\s*(null|undefined|true|false)\s*(?=;|}|\!)')
literal_matches = literal_pattern.findall(content)

print(f"Found {len(ternary_matches)} ternary leaks.")
for prop, val in ternary_matches:
    print(prop, ":", val)

print(f"Found {len(literal_matches)} literal leaks.")
for prop, lit in literal_matches:
    print(prop, ":", lit)

