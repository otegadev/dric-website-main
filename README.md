# De Redeemed Interiors Company — Website

Static website for **De Redeemed Interiors Company (DRIC)**.  
Built with React 18 + TypeScript, Vite, Tailwind CSS and React Router.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # start local dev server at http://localhost:5173
npm run build      # production build → dist/
npx serve -s dist  # preview the build locally with SPA fallback (or npm run preview)
```

---

## Project structure

```
src/
  data/
    siteConfig.ts    ← company details, social links, WhatsApp number, site URL
    products.ts      ← all products (one per image) and services
    homeContent.ts   ← carousel slides and hero copy
    aboutContent.ts  ← About Us page copy (all placeholder text)
  components/        ← Navbar, Footer, Carousel, EnquiryButton, SEO
  pages/             ← Home, ProductGallery, AboutUs, ContactUs
public/images/       ← WebP images (copied/converted from the images/ folder)
scripts/             ← image processing and product generation scripts
```

---

## How to update content

### Company details (address, email, phone, social links)

Edit **`src/data/siteConfig.ts`**.

```ts
export const siteConfig = {
  email: 'Deredeemedinteriorcompany9@gmail.com',
  phone: '07071604223',
  address: 'No. 5 Otorho Road ...',
  social: {
    instagram: '',   // ← paste URL here when ready
    facebook:  '',
    tiktok:    '',
  },
  ...
}
```

Any social entry left as `''` is automatically hidden from the footer and Contact page.

### Site URL (for WhatsApp product links)

Create or edit **`.env`**:

```
VITE_SITE_URL=https://yourdomain.com
```

The variable is read at build time. Rebuild after changing it.

### Enquiry channel

The WhatsApp number and channel are in `siteConfig.ts` under `enquiry`:

```ts
enquiry: {
  channel: 'whatsapp',
  number: '2347071604223',  // no leading +
},
```

Change `channel` to `'email'` to route all enquiries to email instead.

### Product names and prices

Edit **`src/data/products.ts`**. Each product entry looks like:

```ts
{ id: 'sofas-01', name: '[Placeholder] Sofa 01', price: '₦150,000', ... }
```

Replace `[Placeholder] Sofa 01` with the real name and `₦150,000` with the real or tentative price.

### Adding or replacing product images

1. Place the new image in the appropriate folder under `images/` (e.g. `images/sofas/`).
2. Run the image processing script to convert it to WebP:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\process-images.ps1
   ```
3. Run the product generator to rebuild `src/data/products.ts`:
   ```bash
   node scripts/gen.cjs
   ```
4. Rebuild the site: `npm run build`.

### Carousel slides

Edit **`src/data/homeContent.ts`**. Each slide has `image`, `headline`, `description`, `buttonLabel` and `buttonHref`.

### About Us copy

Edit **`src/data/aboutContent.ts`**. Replace every `[Placeholder]` string with real text.

### Logo

1. Place the logo file at `public/images/logo.svg`.
2. In `src/data/siteConfig.ts`, change:
   ```ts
   logoImage: '',
   ```
   to:
   ```ts
   logoImage: '/images/logo.svg',
   ```

---

## Deployment

The build output is a fully static folder (`dist/`). Deploy it to any static host:

| Host | Notes |
|---|---|
| **Netlify** | Drag and drop `dist/`, or connect the repo. Add a `_redirects` file: `/* /index.html 200` |
| **Vercel** | Import the repo; set output directory to `dist`. |
| **GitHub Pages** | Push `dist/` to a `gh-pages` branch. |
| **cPanel / shared hosting** | Upload the contents of `dist/` to `public_html/`. Add an `.htaccess` with `FallbackResource /index.html`. |

> **Important:** because the site uses client-side routing, the host must return `index.html` for every URL. The instructions above configure this.

---

## Scripts reference

| Script | Purpose |
|---|---|
| `scripts/process-images.ps1` | Convert source JPGs → WebP and write to `public/images/` |
| `scripts/gen.cjs` | Regenerate `src/data/products.ts` from the image manifest |
| `scripts/image-manifest.json` | Dimensions of every converted image (auto-generated) |
