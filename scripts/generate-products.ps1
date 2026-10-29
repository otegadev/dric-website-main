# Generate src/data/products.ts from the image manifest
$manifest = Get-Content "scripts\image-manifest.json" -Raw | ConvertFrom-Json

$categoryConfig = @{
  "carousel"        = @{ label = "Carousel"; folder = "carousel"; skip = $true }
  "sofas"           = @{ label = "Sofas"; folder = "sofas"; namePrefix = "Sofa"; basePrice = 150000; priceStep = 5000; skip = $false }
  "center-tables"   = @{ label = "Center Tables"; folder = "center-tables"; namePrefix = "Center Table"; basePrice = 80000; priceStep = 3000; skip = $false }
  "dining-table"    = @{ label = "Dining Table"; folder = "dining-table"; namePrefix = "Dining Table"; basePrice = 120000; priceStep = 5000; skip = $false }
  "office-furniture"= @{ label = "Office Furniture"; folder = "office-furniture"; namePrefix = "Office Furniture"; basePrice = 100000; priceStep = 8000; skip = $false }
  "bed-frames"      = @{ label = "Bed Frames"; folder = "bed-frames"; namePrefix = "Bed Frame"; basePrice = 90000; priceStep = 5000; skip = $false }
}

$output = @"
// ============================================================
// PRODUCTS AND SERVICES DATA
// Auto-generated from image manifest — edit names and prices.
// Prices are tentative placeholders.
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

"@

# Categories array
$output += "export const categories: Category[] = [`n"
$catOrder = @("sofas","center-tables","dining-table","office-furniture","bed-frames")
foreach ($slug in $catOrder) {
  $cfg = $categoryConfig[$slug]
  $firstFile = ($manifest.$slug)[0]
  $output += "  {`n"
  $output += "    slug: '$slug',`n"
  $output += "    label: '$($cfg.label)',`n"
  $output += "    image: '/images/$($cfg.folder)/$($firstFile.file)',`n"
  $output += "    imageWidth: $($firstFile.width),`n"
  $output += "    imageHeight: $($firstFile.height),`n"
  $output += "    alt: '$($cfg.label) category — De Redeemed Interiors Company',`n"
  $output += "  },`n"
}
$output += "]`n`n"

# Product arrays per category
foreach ($slug in $catOrder) {
  $cfg = $categoryConfig[$slug]
  $files = $manifest.$slug
  $varName = $slug -replace "-", ""
  # camelCase the variable name
  $parts = $slug -split "-"
  $varName = $parts[0]
  for ($i = 1; $i -lt $parts.Count; $i++) {
    $varName += (Get-Culture).TextInfo.ToTitleCase($parts[$i])
  }
  # special cases
  if ($slug -eq "sofas") { $varName = "sofas" }
  if ($slug -eq "center-tables") { $varName = "centerTables" }
  if ($slug -eq "dining-table") { $varName = "diningTables" }
  if ($slug -eq "office-furniture") { $varName = "officeFurniture" }
  if ($slug -eq "bed-frames") { $varName = "bedFrames" }

  $output += "export const $varName`: Product[] = [`n"
  $i = 0
  foreach ($f in $files) {
    $i++
    $n = $i.ToString("D2")
    $price = $cfg.basePrice + ($i - 1) * $cfg.priceStep
    $priceFormatted = "{0:N0}" -f $price
    $priceFormatted = $priceFormatted -replace ",", ","
    $output += "  {`n"
    $output += "    id: '$slug-$n',`n"
    $output += "    category: '$($cfg.label)',`n"
    $output += "    categorySlug: '$slug',`n"
    $output += "    categoryLabel: '$($cfg.label)',`n"
    $output += "    name: '[Placeholder] $($cfg.namePrefix) $n',`n"
    $output += "    price: '`u{20A6}$priceFormatted',`n"
    $output += "    image: '/images/$($cfg.folder)/$($f.file)',`n"
    $output += "    imageWidth: $($f.width),`n"
    $output += "    imageHeight: $($f.height),`n"
    $output += "    alt: '$($cfg.namePrefix) $n — De Redeemed Interiors Company',`n"
    $output += "  },`n"
  }
  $output += "]`n`n"
}

# allProducts
$output += "export const allProducts: Product[] = [`n"
foreach ($slug in $catOrder) {
  $varName = ""
  if ($slug -eq "sofas") { $varName = "sofas" }
  if ($slug -eq "center-tables") { $varName = "centerTables" }
  if ($slug -eq "dining-table") { $varName = "diningTables" }
  if ($slug -eq "office-furniture") { $varName = "officeFurniture" }
  if ($slug -eq "bed-frames") { $varName = "bedFrames" }
  $output += "  ...$varName,`n"
}
$output += "]`n`n"

# Services
$output += @"
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
"@

$output | Set-Content -Path "src\data\products.ts" -Encoding UTF8
Write-Host "Generated src\data\products.ts"
Write-Host "  sofas: $(($manifest.sofas).Count)"
Write-Host "  center-tables: $(($manifest.'center-tables').Count)"
Write-Host "  dining-table: $(($manifest.'dining-table').Count)"
Write-Host "  office-furniture: $(($manifest.'office-furniture').Count)"
Write-Host "  bed-frames: $(($manifest.'bed-frames').Count)"
