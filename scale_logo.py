import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to scale the logo by 4x original size (24 -> 96)
# Or 4x current size (42 -> 168). Usually users mean "make it 4x what it was originally" or 4x current.
# I'll go with 96 first as 168 might break the entire header container visibility.
# Actually, I'll use 96.

logo_pattern = re.compile(r'(<img src="\./logo-theracorp\.png" height=")\d+(" alt="Theracorp Logo"[^>]*>)')

def scale_repl(match):
    return match.group(1) + "96" + match.group(2)

new_content, count = logo_pattern.subn(scale_repl, content)
print(f"Scaled logos to height 96, matches: {count}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
