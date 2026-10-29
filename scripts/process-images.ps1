$magick = "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"
$SourceRoot = "images"
$DestRoot = "public\images"
$ManifestPath = "scripts\image-manifest.json"

$categoryMap = [ordered]@{
  "Carousel"         = "carousel"
  "sofas"            = "sofas"
  "Center table"     = "center-tables"
  "Dining table"     = "dining-table"
  "Office Furniture" = "office-furniture"
  "bed frames"       = "bed-frames"
}

$manifest = @{}

foreach ($srcFolder in $categoryMap.Keys) {
  $destSlug = $categoryMap[$srcFolder]
  $srcPath  = Join-Path $SourceRoot $srcFolder
  $destPath = Join-Path $DestRoot $destSlug

  if (-not (Test-Path $srcPath)) {
    Write-Warning "Source not found: $srcPath"
    continue
  }
  New-Item -ItemType Directory -Force -Path $destPath | Out-Null

  $files = Get-ChildItem -Path $srcPath -File | Where-Object {
    ($_.Extension -match '^\.(jpg|jpeg)$' -or $_.Name -match '\.(JPG|JPEG)$') -and
    $_.Name -notlike "* - Copy*"
  }

  Write-Host "[$destSlug] Found $($files.Count) files"
  $manifest[$destSlug] = @()

  foreach ($file in $files) {
    $destName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name) + ".webp"
    $destFile = Join-Path $destPath $destName
    Write-Host "  Converting $($file.Name)"

    & $magick "$($file.FullName)" -resize "1600x>" -quality 82 "$destFile"

    if ($LASTEXITCODE -ne 0) {
      Write-Warning "  magick failed for $($file.Name), copying original JPG"
      $destName = $file.Name
      $destFile = Join-Path $destPath $destName
      Copy-Item $file.FullName $destFile -Force
    }

    $identifyOutput = (& $magick identify -format "%w %h" "$destFile" 2>&1)
    $parts = ($identifyOutput -split "\s+")
    $w = if ($parts.Count -ge 1 -and "$($parts[0])" -match "^\d+$") { [int]$parts[0] } else { 1200 }
    $h = if ($parts.Count -ge 2 -and "$($parts[1])" -match "^\d+$") { [int]$parts[1] } else { 900 }

    $manifest[$destSlug] += @{ file = $destName; width = $w; height = $h }
  }
}

$manifest | ConvertTo-Json -Depth 5 | Set-Content -Path $ManifestPath -Encoding UTF8
Write-Host "Manifest written to $ManifestPath"
Write-Host "Done."
