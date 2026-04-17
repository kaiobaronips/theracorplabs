import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all -webkit-appearance and check if standard appearance follows
matches = re.finditer(r'-webkit-appearance:\s*([^;!\}]+)', content)
for m in matches:
    val = m.group(1)
    end_pos = m.end()
    # Check next 100 chars for "appearance:"
    context = content[end_pos : end_pos + 100]
    if 'appearance:' not in context:
        print(f"UNFIXED: -webkit-appearance:{val} at pos {m.start()}")
        print(f"Context: {context}")
    else:
        print(f"FIXED: -webkit-appearance:{val} followed by appearance:")

matches_moz = re.finditer(r'-moz-appearance:\s*([^;!\}]+)', content)
for m in matches_moz:
    val = m.group(1)
    end_pos = m.end()
    context = content[end_pos : end_pos + 100]
    if 'appearance:' not in context:
        print(f"UNFIXED: -moz-appearance:{val} at pos {m.start()}")
    else:
        print(f"FIXED: -moz-appearance:{val} followed by appearance:")

