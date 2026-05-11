const fs = require('fs');
const pages = [
  'app/privacidade/page.tsx',
  'app/praticas-privacidade/page.tsx',
  'app/politica-reembolso/page.tsx',
  'app/consentimento-medico/page.tsx',
  'app/declaracao-direitos/page.tsx'
];

pages.forEach(function(file) {
  let c = fs.readFileSync(file, 'utf8');
  
  // Add Link import if missing
  if (c.indexOf("from 'next/link'") === -1) {
    c = c.replace("import type { Metadata } from 'next';", "import type { Metadata } from 'next';\nimport Link from 'next/link';\nimport Image from 'next/image';");
  }
  
  fs.writeFileSync(file, c);
  console.log('OK: ' + file);
});

console.log('Done!');