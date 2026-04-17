import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find something like property: value ? option1 : option2
# We look for a property name (word or hyphenated), colon, then the ternary
# [a-zA-Z0-9-]+ : [^;{}]+ \? [^;{}]+ : [^;{}]+
pattern = re.compile(r'([a-zA-Z-]{3,})\s*:\s*([^;{}]*\s+\?\s+[^;{}]+\s+:\s*[^;{}]+)')

matches = pattern.findall(content)
for prop, val in matches:
    print(f"Property: {prop} | Value: {val}")

# Also look for standalone ternary leaks that might not follow the property format perfectly
pattern2 = re.compile(r'[^;{}]* [?][^:;{}]+:[^;{}]+')
matches2 = pattern2.findall(content)
# Filter out common false positives like URLs or JSON
filtered = [m for m in matches2 if "?" in m and ":" in m and "https://" not in m and "http://" not in m and '"' not in m and "{" not in m]
for m in filtered:
   if prop not in [x[0] for x in matches]: # avoid duplicates
       print(f"Potential leak: {m.strip()}")

