import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken CSS ternary logic
# Instance 1 (undefined)
content = content.replace('undefined ? column :row nowrap', 'column')
# Instance 2 (true)
content = content.replace('true ? column :row nowrap', 'column')

# Clean up duplicates if any (since we replace 3 prefixes) - actually the string is unique enough.
# Let's do a more robust regex to be sure.
content = re.sub(r'(-webkit-|-ms-|)flex-flow:[^;]*\? column :row nowrap', r'\1flex-flow:column', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
