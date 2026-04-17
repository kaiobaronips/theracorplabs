import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

def clean_css_block(match):
    block = match.group(0)
    # Find the value used for appearance
    # Look for any variant: -webkit-appearance, -moz-appearance, appearance
    val_match = re.search(r'(?:-webkit-|-moz-)?appearance:\s*([^;!\}]+)', block)
    if not val_match:
        return block
    
    val = val_match.group(1).strip()
    
    # Remove all variants of appearance from the block
    block = re.sub(r'(?:-webkit-|-moz-)?appearance:\s*[^;!\}]+;?', '', block)
    
    # Re-insert them in the correct order at the start of the block or end? 
    # Usually better to insert where they were or just at the end.
    # Let's insert them at the start of the properties list.
    insert_str = f"-webkit-appearance: {val}; -moz-appearance: {val}; appearance: {val};"
    
    # Assuming the block starts with {
    if '{' in block:
        block = block.replace('{', '{' + insert_str)
    else:
        # If it's a property list without braces
        block = insert_str + block
        
    return block

# Aggressive find all vendor-prefixed appearance and standard versions to unify them
print("Unifying appearance properties...")
# Find snippets that contain appearance
# Pattern: any sequence containing (webkit|moz)?appearance
snippets = re.finditer(r'[^;\}]*?(?:-webkit-|-moz-)?appearance:[^;\}]*?[;\}]', content)

# Instead of re.sub with callback which is hard for overlapping/complex cases,
# let's just do a specific replacement for the known problematic patterns.

# Remove redundant appearance:none if followed by another appearance:none
content = content.replace('appearance:none;appearance:none;', 'appearance:none;')
content = content.replace('appearance:button;appearance:button;', 'appearance:button;')
content = content.replace('appearance:textfield;appearance:textfield;', 'appearance:textfield;')

# Fix order: -webkit, -moz, then standard
content = re.sub(r'(-webkit-appearance:[^;!\}]+;)\s*appearance:[^;!\}]+;\s*(-moz-appearance:[^;!\}]+;)\s*appearance:[^;!\}]+;', 
                 r'\1 \2 appearance:\1', content) # Simplified logic

# Actually, let's just do a very clean replacement for all 3 variations into the correct 3-line block
for val in ['none', 'button', 'textfield']:
    # Match any combo of the 3 variants and replace with the standard set
    pattern = rf'(?:-webkit-appearance:\s*{val}\s*;?|-moz-appearance:\s*{val}\s*;?|appearance:\s*{val}\s*;?)+'
    replacement = f'-webkit-appearance:{val};-moz-appearance:{val};appearance:{val};'
    content = re.sub(pattern, replacement, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Clean-up complete.")
