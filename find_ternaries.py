import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Search for property: value ? option1 : option2
# We look for a ":" then some characters, then a "?" then some characters, then a ":" then some characters.
# We exclude common URLs by checking for "https://" or "http://"
regex = r'[:]\s*[^;{}]+\s*\?\s*[^;{}]+\s*:\s*[^;{}]+'
matches = re.finditer(regex, content)

found = False
for match in matches:
    snippet = match.group(0)
    # Filter out common false positives
    if "http" not in snippet and '"' not in snippet and "{" not in snippet:
        print(f"Found match at index {match.start()}: {snippet}")
        found = True

if not found:
    print("No more ternary leaks found.")
