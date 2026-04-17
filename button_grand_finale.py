import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. COMPREHENSIVE LOCALIZATION
print("Performing final localization sweep...")
replacements = {
    # Buttons
    'Get started': 'Comece agora',
    'Get Started': 'Comece agora',
    'Start your visit': 'Comece agora',
    'Start Your Visit': 'Comece agora',
    'Start consultation': 'Comece agora',
    'Start Consultation': 'Comece agora',
    'Start a free consultation': 'Comece agora',
    'Start a free assessment': 'Comece agora',
    'Learn more': 'Saiba mais',
    'Learn More': 'Saiba mais',
    'Explore more': 'Saiba mais',
    'Explore the plan': 'Ver o plano',
    'See all': 'Ver todos',
    'Compare all': 'Comparar todos',
    'Read more': 'Leia mais',
    'Discover': 'Descobrir',
    # Specific sections
    'What We Treat': 'O que tratamos',
    'Popular reads': 'Leituras populares',
}

for eng, pt in replacements.items():
    content = content.replace(eng, pt)
    # Also handle JSON escaped versions if any (though unlikely for these plain strings)
    content = content.replace(eng.replace(' ', '\u0020'), pt)

# 2. COMPREHENSIVE CSS STANDARDIZATION
# We'll inject a robust script at the end of the first style block.
# We ensure Primary = White/Glass, Secondary = Transp/Border/Black

primary_classes = [
    ".cSumzE", ".eiXXfK", ".stacked-cta-card-style__Button-sc-142aa7a5-4", 
    ".cQmTqT", ".eiXXfK", ".gxNPCY" # Adding a few more found in grep
]

secondary_classes = [
    ".jclMmE", ".gmlcvs", ".bDlTdl", ".cfPMpa", ".ibWIvc", ".kzysoS", ".ejZhuM"
]

style_block = """
/* FINAL BUTTON STANDARDIZATION */
"""

# Primary
style_block += ", ".join(primary_classes) + """ {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: none !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
}
""" + ", ".join([c + ":hover" for c in primary_classes]) + """ {
    background-color: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    color: #ffffff !important;
}
"""

# Secondary
style_block += ", ".join(secondary_classes) + """ {
    background-color: transparent !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
    box-sizing: border-box !important;
}
""" + ", ".join([c + ":hover" for c in secondary_classes]) + """ {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-color: #000000 !important;
}
"""

# Inject before the first </style>
content = re.sub(r'</style>', style_block + '</style>', content, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Grand finale complete.")
