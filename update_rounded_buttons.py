import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the previously injected block "FINAL BUTTON STANDARDIZATION"
# with the new rounded/borderless version.

new_styles = """
/* FINAL BUTTON STANDARDIZATION - ROUNDED & BORDERLESS */
/* Primary Buttons: Comece agora */
.cSumzE, .eiXXfK, .stacked-cta-card-style__Button-sc-142aa7a5-4, .cQmTqT, .gxNPCY {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: none !important;
    border-radius: 50px !important;
    font-weight: 600 !important;
    padding: 12px 32px !important;
    transition: all 0.3s ease !important;
}
.cSumzE:hover, .eiXXfK:hover, .stacked-cta-card-style__Button-sc-142aa7a5-4:hover, .cQmTqT:hover, .gxNPCY:hover {
    background-color: rgba(255, 255, 255, 0.22) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    color: #ffffff !important;
    transform: translateY(-1px);
}

/* Secondary Buttons: Saiba mais */
.jclMmE, .gmlcvs, .bDlTdl, .cfPMpa, .ibWIvc, .kzysoS, .ejZhuM {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 50px !important;
    font-weight: 600 !important;
    padding: 12px 32px !important;
    transition: all 0.3s ease !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
}
.jclMmE:hover, .gmlcvs:hover, .bDlTdl:hover, .cfPMpa:hover, .ibWIvc:hover, .kzysoS:hover, .ejZhuM:hover {
    background-color: #000000 !important;
    color: #ffffff !important;
    transform: translateY(-1px);
}

/* Button Reset for Spans and Icons inside */
.cSumzE span, .eiXXfK span, .jclMmE span, .gmlcvs span, .bDlTdl span, .cfPMpa span, .ibWIvc span, .kzysoS span, .ejZhuM span {
    color: inherit !important;
}
"""

# Find the start of the previous standardization block
pattern = r'/\* FINAL BUTTON STANDARDIZATION \*/.*?(?=/\*!sc\*/\n</style>)'
if re.search(pattern, content, flags=re.DOTALL):
    print("Found existing block, replacing...")
    content = re.sub(pattern, new_styles, content, flags=re.DOTALL)
else:
    print("Previous block not found exactly as expected. Looking for fallback marker...")
    # Fallback: inject before the first </style> if possible
    style_end_marker = '/*!sc*/\n</style>'
    if style_end_marker in content:
        content = content.replace(style_end_marker, new_styles + style_end_marker, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Rounded and Borderless buttons applied.")
