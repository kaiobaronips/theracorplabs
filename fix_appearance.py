import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix instances where -webkit-appearance exists but appearance doesn't follow quickly
# 1. button
content = content.replace('-webkit-appearance:button;}', '-webkit-appearance:button;appearance:button;}')
# 2. textfield
content = content.replace('-webkit-appearance:textfield;', '-webkit-appearance:textfield;appearance:textfield;')
# 3. none (search-decoration)
content = content.replace('-webkit-appearance:none;}', '-webkit-appearance:none;appearance:none;}')
# 4. more general cases if any
content = re.sub(r'(-webkit-appearance:\s*([^;!\}]+));(?!\s*appearance:)', r'\1;appearance:\2;', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Appearance properties fixed.")
