import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Target the iwldUu class background color
# .iwldUu{position:relative;z-index:701;background-color:rgba(255,255,255,1);
pattern = re.compile(r'(\.iwldUu\{[^}]*background-color:rgba\(255,255,255,)1(\);)')

replacement = r'\1 0.7\2backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);'

new_content, count = pattern.subn(replacement, content)
print(f"Applied translucent effect to header, matches: {count}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
