const fs = require('fs');
const path = require('path');

async function run() {
  try {
    const lucide = await import('lucide-react');
    // Pick exported symbols that look like icon component names (start with uppercase letter)
    const names = Object.keys(lucide).filter(n => /^[A-Z]/.test(n) && n !== 'default');

    const entries = names.sort().map(n => {
      // kebab-case key
      const key = n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      // human label
      const label = n.replace(/([A-Z])/g, ' $1').trim();
      return { key, componentName: n, label };
    });

    const content = `export type IconEntry = { key: string; componentName: string; label?: string };

// Auto-generated list of lucide-react icons
export const ICON_LIST: IconEntry[] = ${JSON.stringify(entries, null, 2)};
`;

    const outPath = path.join(__dirname, '..', 'components', 'icon-data.ts');
    fs.writeFileSync(outPath, content, 'utf8');
    console.log('Wrote', outPath, 'with', entries.length, 'icons');
  } catch (e) {
    console.error('Failed to generate icon list:', e);
    process.exit(1);
  }
}

run();
