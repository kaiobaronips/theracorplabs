import re

with open('index_backup.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for ternary leaks
ternary_pattern = re.compile(r'[:][^;{}]+ \? [^;{}]+ :')
matches = ternary_pattern.findall(content)
print(f"Total ternary leaks in backup: {len(matches)}")
for m in set(matches):
    print(f"Pattern found: {m}")

# Pattern for literal leaks
literal_pattern = re.compile(r'[:]\s*(undefined|null|true|false)\s*(?=;|}|\!)')
matches_lit = literal_pattern.findall(content)
print(f"\nTotal literal leaks in backup: {len(matches_lit)}")
for m in set(matches_lit):
    print(f"Literal found: {m}")

