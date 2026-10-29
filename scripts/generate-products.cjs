const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('scripts/image-manifest.json', 'utf8'));

const categories = [
  { slug: 'sofas', label: 'Sofas', folder: 'sofas', namePrefix: 'Sofa', basePrice: 150000, priceStep: 5000, varName: 'sofas' },
  { slug: 'center-tables', label: 'Center Tables', folder: 'center-tables', namePrefix: 'Center Table', basePrice: 80000, priceStep: 3000, varName: 'centerTables' },
  { slug: 'dining-table', label: 'Dining Table', folder: 'dining-table', namePrefix: 'Dining Table', basePrice: 120000, priceStep: 5000, varName: 'diningTables' },
  { slug: 'office-furniture', label: 'Office Furniture', folder: 'office-furniture', namePrefix: 'Office Furniture', basePrice: 100000, priceStep: 8000, varName: 'officeFurniture' },
  { slug: 'bed-frames', label: 'Bed Frames', folder: 'bed-frames', namePrefix: 'Bed Frame', basePrice: 90000, priceStep: 5000, varName: 'bedFrames' },
];

const NAIRA = '\u20a6';

let out = `// ============================================================
// PRODUCTS AND SERVICES DATA
// Generated from image manifest. Edit names and prices here.
// Prices are tentative placeholders shown on the site.
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

for (const cat of categories) {
  const files = manifest[cat.slug];
  const first = files[0];
  out += `  {
    slug: '${cat.slug}',
    label: '${cat.label}',
    image: '/images/${cat.folder}/${first.file}',
    imageWidth: ${first.width},
    imageHeight: ${first.height},
    alt: '${cat.label} category - De Redeemed Interiors Company',
  },\n`;
}
out += ']\n\n';

for (const cat of categories) {
  const files = manifest[cat.slug];
  out += `export const ${cat.varName}: Product[] = [\n`;
  files.forEach((f, i) => {
    const n = String(i + 1).padStart(2, '0');
    const price = cat.basePrice + i * cat.priceStep;
    const priceStr = NAIRA + price.toLocaleString('en-NG');
    out += `  {
    id: '${cat.slug}-${n}',
    category: '${cat.label}',
    categorySlug: '${cat.slug}',
    categoryLabel: '${cat.label}',
    name: '[Placeholder] ${cat.namePrefix} ${n}',
    price: '${priceStr}',
    image: '/images/${cat.folder}/${f.file}',
    imageWidth: ${f.width},
    imageHeight: ${f.height},
    alt: '${cat.namePrefix} ${n} - De Redeemed Interiors Company',
  },\n`;
  });
  out += ']\n\n';
}

out += `export const allProducts: Product[] = [
  ...sofas,
  ...centerTables,
  ...diningTables,
  ...officeFurniture,
  ...bedFrames,
]

export const services: Service[] = [
  {
    id: 'custom-furniture-production',
    name: '[Placeholder] Custom Furniture Production',
    description: '[Placeholder] We design and produce custom furniture to your exact specifications. Contact us to discuss your requirements.',
    image: '/images/carousel/IMG_0780.webp',
    imageWidth: 1600,
    imageHeight: 1200,
  },
  {
    id: 'interior-decoration',
    name: '[Placeholder] Interior Decoration',
    description: '[Placeholder] Our interior decoration service transforms your space into a beautifully curated environment. Contact us to get started.',
    image: '/images/carousel/IMG_0784.webp',
    imageWidth: 1600,
    imageHeight: 1200,
  },
  {
    id: 'furniture-supply-and-dealership',
    name: '[Placeholder] Furniture Supply and Dealership',
    description: '[Placeholder] We supply and deal in quality furniture for homes, offices and commercial spaces across Delta State and beyond.',
    image: '/images/carousel/IMG_0788.webp',
    imageWidth: 1600,
    imageHeight: 1200,
  },
]
`;

fs.writeFileSync('src/data/products.ts', out, 'utf8');
console.log('Generated products.ts');
for (const cat of categories) {
  console.log('  ' + cat.slug + ': ' + manifest[cat.slug].length + ' products');
}
