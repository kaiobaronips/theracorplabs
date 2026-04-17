import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Scale back from 96 to 72
logo_pattern = re.compile(r'(<img src="\./logo-theracorp\.png" height=")96(" alt="Theracorp Logo"[^>]*>)')

def resize_repl(match):
    return match.group(1) + "72" + match.group(2)

new_content, count = logo_pattern.subn(resize_repl, content)
print(f"Resized logos to height 72, matches: {count}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
