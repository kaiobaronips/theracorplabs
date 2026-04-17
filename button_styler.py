import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# --- 1. LOCALIZATION ---
print("Localizing buttons...")
# Primary CTAs
content = content.replace('>Start your visit<', '>Comece agora<')
content = content.replace('>Get started<', '>Comece agora<')
content = content.replace('>Start consultation<', '>Comece agora<')
content = content.replace('>Start Consultation<', '>Comece agora<')
content = content.replace('>Start Your Visit<', '>Comece agora<')

# Secondary CTAs
content = content.replace('>Learn more<', '>Saber mais<')
content = content.replace('>Explore more<', '>Saber mais<')
content = content.replace('>Learn More<', '>Saber mais<')

# --- 2. PRIMARY BUTTON STYLE (.cSumzE) ---
print("Updating primary buttons (.cSumzE)...")
# Base State: Solid white background, black text
content = re.sub(r'\.cSumzE\{[^}]*font-weight:500;color:rgba\(0,0,0,1\);background-color:rgba\(255,255,255,1\);border-color:rgba\(255,255,255,0\);', 
                r'.cSumzE{color:rgba(0,0,0,1);background-color:rgba(255,255,255,1);border:1px solid transparent;', content)

# Hover State: Glassmorphism (Translucent white + Blur)
# Specifically targeting the media query for .cSumzE:hover
content = re.sub(r'@media \(hover:hover\)\{\.cSumzE:hover\{background-color:rgba\(255,255,255,0\.51\);border-color:rgba\(255,255,255,0\);\}', 
                r'@media (hover:hover){.cSumzE:hover{background-color:rgba(255,255,255,0.22) !important;color:rgba(255,255,255,1) !important;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-color:rgba(255,255,255,0.3) !important;}', content)

# --- 3. SECONDARY BUTTON STYLE (.jclMmE) ---
print("Updating secondary buttons (.jclMmE)...")
# Base State: Transparent, 2px white border, white text
content = re.sub(r'\.jclMmE\{[^}]*color:rgba\(255,255,255,1\);background-color:rgba\(0,0,0,0\.12\);', 
                r'.jclMmE{color:rgba(255,255,255,1);background-color:transparent;border:2px solid rgba(255,255,255,1) !important;', content)

# Hover State: Solid black background, white text
content = re.sub(r'@media \(hover:hover\)\{\.jclMmE:hover\{background-color:rgba\(0,0,0,0\.33\);-webkit-backdrop-filter:blur\(var\(--btn-blur\)\);backdrop-filter:blur\(var\(--btn-blur\)\);\}\.jclMmE:hover:before\{border-color:rgba\(255,255,255,0\);\}', 
                r'@media (hover:hover){.jclMmE:hover{background-color:rgba(0,0,0,1) !important;color:rgba(255,255,255,1) !important;border-color:rgba(0,0,0,1) !important;}', content, flags=re.MULTILINE)

# --- 4. FINISH ---
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Button standardization complete.")
