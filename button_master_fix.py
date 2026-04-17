import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. REMOVE PREVIOUS INVALID CSS HACK
print("Removing invalid CSS overrides...")
pattern_to_remove = r'/\* Reinforce Secondary Button Pattern for Saiba Mais \*/.*?transition: all 0\.3s ease !important;\s*\}\s*\.jclMmE:hover, \.gmlcvs:hover, \.ibWIvc:hover \{.*?border-color: rgba\(0,0,0,1\) !important;\s*\}'
content = re.sub(pattern_to_remove, '', content, flags=re.DOTALL)

# 2. LOCALIZATION SWEEP
print("Localization sweep...")
# Ensure "Saber mais" is "Saiba mais"
content = content.replace('Saber mais', 'Saiba mais')
# Catch any remaining common English CTA strings in props or text
content = content.replace('Learn more', 'Saiba mais')
content = content.replace('Learn More', 'Saiba mais')
content = content.replace('Get started', 'Comece agora')
content = content.replace('Get Started', 'Comece agora')
content = content.replace('Start your visit', 'Comece agora')
content = content.replace('Start Your Visit', 'Comece agora')
content = content.replace('Start free consultation', 'Consultoria Grátis')

# 3. GLOBAL STYLE INJECTION (CLEAN)
# We'll inject a fresh <style id="theracorp-buttons"> block before </style> to ensure it wins but doesn't break syntax
style_end_marker = '/*!sc*/\n</style>'
if style_end_marker in content:
    print("Injecting standardized button styles...")
    
    # Primary: White -> Glass
    # Secondary: Transp/Border -> Black
    new_styles = """
/* THERACORP STANDARDIZED BUTTONS */
/* Primary Buttons: Comece agora */
.cSumzE, .eiXXfK, .stacked-cta-card-style__Button-sc-142aa7a5-4 {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: none !important;
    font-weight: 600 !important;
    transition: background-color 0.3s ease, backdrop-filter 0.3s ease, color 0.3s ease !important;
}
.cSumzE:hover, .eiXXfK:hover, .stacked-cta-card-style__Button-sc-142aa7a5-4:hover {
    background-color: rgba(255, 255, 255, 0.22) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    color: #ffffff !important;
}

/* Secondary Buttons: Saiba mais */
.jclMmE, .gmlcvs, .bDlTdl, .cfPMpa, .ibWIvc {
    background-color: transparent !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    font-weight: 600 !important;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease !important;
}
.jclMmE:hover, .gmlcvs:hover, .bDlTdl:hover, .cfPMpa:hover, .ibWIvc:hover {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-color: #000000 !important;
}

/* Button Reset for Spans and Icons inside */
.cSumzE span, .eiXXfK span, .jclMmE span, .gmlcvs span, .bDlTdl span, .cfPMpa span, .ibWIvc span {
    color: inherit !important;
}
"""
    # Replace the FIRST occurrence of style_end_marker (usually the main one)
    content = content.replace(style_end_marker, new_styles + style_end_marker, 1)

# 4. SAVE
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Master button fix complete.")
