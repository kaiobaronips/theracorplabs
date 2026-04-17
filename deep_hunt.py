import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Look for any '?' in the style matches
styles = re.finditer(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
found = False
for style in styles:
    text = style.group(1)
    # Search for ? in the CSS text
    if '?' in text:
        # Find the line number/context
        idx = style.start(1)
        # Get snippet around first ?
        match_idx = text.find('?')
        snippet = text[max(0, match_idx-50):min(len(text), match_idx+50)]
        print(f"Found '?' in style block at index {idx + match_idx}: ...{snippet}...")
        found = True

if not found:
    print("No '?' found in any <style> block.")
    
# Check for CSS in styled-components data-styled tags or style attributes
inline_styles = re.finditer(r'style="([^"]*)"', content)
for inline in inline_styles:
    text = inline.group(1)
    if '?' in text:
        print(f"Found '?' in style attribute: {text}")
        found = True

# Check data-styled content
data_styled = re.finditer(r'data-styled[^>]*>(.*?)</data-styled>', content, re.DOTALL)
for ds in data_styled:
    text = ds.group(1)
    if '?' in text:
        print(f"Found '?' in data-styled block: ...{text[:100]}...")
        found = True

