import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

styles = re.finditer(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
found = False
for style in styles:
    text = style.group(1)
    # Search for literals followed by ; or }
    matches = re.finditer(r'([a-zA-Z-]{3,}):\s*(undefined|null|true|false)\s*(?=;|}|\!)', text)
    for m in matches:
        print(f"Found literal leak in style block: {m.group(1)}: {m.group(2)}")
        found = True

if not found:
    print("No literal leaks found in any <style> block.")
