import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the previous injection
content = content.replace('<img src="./logo theracorp.png" height="24" alt="Theracorp Logo" style="object-fit: contain; width: auto; max-width: 100%;" />', '<img src="./logo-theracorp.png" height="24" alt="Theracorp Logo" style="object-fit: contain; width: auto; max-width: 100%;" />')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated space removed filename!")
