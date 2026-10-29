const fs = require('fs');
const d = fs.readFileSync('scripts/image-manifest.json');
const start = d.indexOf('{');
const j = JSON.parse(d.slice(start));

const NAIRA = '\u20a6';

const cats = [
  {s:'sofas',             l:'Sofas',            f:'sofas',            n:'Sofa',             b:150000, p:5000,  v:'sofas'},
  {s:'center-tables',     l:'Center Tables',    f:'center-tables',    n:'Center Table',     b:80000,  p:3000,  v:'centerTables'},
  {s:'dining-table',      l:'Dining Table',     f:'dining-table',     n:'Dining Table',     b:120000, p:5000,  v:'diningTables'},
  {s:'office-furniture',  l:'Office Furniture', f:'office-furniture', n:'Office Furniture', b:100000, p:8000,  v:'officeFurniture'},
  {s:'bed-frames',        l:'Bed Frames',       f:'bed-frames',       n:'Bed Frame',        b:90000,  p:5000,  v:'bedFrames'},
];

console.log('Product counts:');
cats.forEach(c => console.log('  ' + c.s + ': ' + j[c.s].length));

let out = `// ============================================================
// PRODUCTS AND SERVICES DATA
// Generated from image manifest. Edit names and prices here.
// All prices are tentative placeholders.
// ============================================================

export interface Product {
  id: string
  category: string
  categorySlug: string
  categoryLabel: string
  name: string
  price: string
  image: string
  imageWidth: number
  imageHeight: number
  alt: string
}

export interface Service {
  id: string
  name: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
}

export interface Category {
  slug: string
  label: string
  image: string
  imageWidth: number
  imageHeight: number
  alt: string
}

export const categories: Category[] = [
`;

for (const c of cats) {
  const first = j[c.s][0];
  out += `  { slug: '${c.s}', label: '${c.l}', image: '/images/${c.f}/${first.file}', imageWidth: ${first.width}, imageHeight: ${first.height}, alt: '${c.l} category - De Redeemed Interiors Company' },\n`;
}
out += ']\n\n';

for (const c of cats) {
  out += `export const ${c.v}: Product[] = [\n`;
  j[c.s].forEach((f, i) => {
    const n = String(i + 1).padStart(2, '0');
    out += `  { id: '${c.s}-${n}', category: '${c.l}', categorySlug: '${c.s}', categoryLabel: '${c.l}', name: '${c.n} ${n}', price: '${NAIRA}500,000', image: '/images/${c.f}/${f.file}', imageWidth: ${f.width}, imageHeight: ${f.height}, alt: '${c.n} ${n} - De Redeemed Interiors Company' },\n`;
  });
  out += ']\n\n';
}

out += `export const allProducts: Product[] = [\n  ...sofas,\n  ...centerTables,\n  ...diningTables,\n  ...officeFurniture,\n  ...bedFrames,\n]\n\n`;

out += `export const services: Service[] = [
  { id: 'custom-furniture-production', name: 'Custom Furniture Production', description: 'We design and produce custom furniture to your exact specifications. Contact us to discuss your requirements.', image: '/images/carousel/IMG_0780.webp', imageWidth: 1600, imageHeight: 1200 },
  { id: 'interior-decoration', name: 'Interior Decoration', description: 'Our interior decoration service transforms your space into a beautifully curated environment. Contact us to get started.', image: '/images/carousel/IMG_0784.webp', imageWidth: 1600, imageHeight: 1200 },
  { id: 'furniture-supply-and-dealership', name: 'Furniture Supply and Dealership', description: 'We supply and deal in quality furniture for homes, offices and commercial spaces across Delta State and beyond.', image: '/images/carousel/IMG_0788.webp', imageWidth: 1600, imageHeight: 1200 },
]\n`;

fs.writeFileSync('src/data/products.ts', out, 'utf8');
console.log('Written src/data/products.ts successfully.');
