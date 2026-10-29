# PLACEHOLDERS — Items to replace before launch

This file lists every stand-in used during development.

| # | Item | Current status | Where to change it |
|---|---|---|---|
| 1 | **Instagram link** | Empty string (link hidden) | Set `social.instagram` in `src/data/siteConfig.ts` |
| 2 | **Facebook link** | Empty string (link hidden) | Set `social.facebook` in `src/data/siteConfig.ts` |
| 3 | **TikTok link** | Empty string (link hidden) | Set `social.tiktok` in `src/data/siteConfig.ts` |
| 4 | **Domain name / Site URL** | `https://example.com` | Set `VITE_SITE_URL=https://yourdomain.com` in `.env` and rebuild |
| 5 | **Product prices** | `₦500,000` (tentative) | Edit prices in `src/data/products.ts` |
| 6 | **OG / social share image** | No image | Place `og-default.jpg` in `public/images/` |

---

### Completed Items
- **Logo:** `DE REDEEMED INTERIOR LOGO 2.png` integrated into the navbar and footer.
- **Favicon:** Generated from `DE REDEEMED INTERIOR LOGO 2.png` (`favicon.ico`, `favicon.png`, `apple-touch-icon.png`).
- **About Us copy & values (01–04):** Updated with DRIC's official profile (Diligent, Resourceful, Innovative, Customer-Centric).
- **Services:** Verified as real services (Custom furniture production, Interior decoration, Furniture supply and dealership) with `[Placeholder]` tags removed.
- **Product names:** `[Placeholder]` prefixes removed across all 158 products.
- **Carousel slides:** Updated with the latest high-resolution furniture imagery.
