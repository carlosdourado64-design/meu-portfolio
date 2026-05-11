New-Item -ItemType Directory -Force -Path 'app\public\img\social' | Out-Null
$files = Get-ChildItem -LiteralPath 'IMG\Social media' -Filter '*.webp' | Sort-Object Name
$i = 1
foreach ($f in $files) {
    Copy-Item -LiteralPath $f.FullName -Destination "app\public\img\social\sm-$i.webp" -Force
    Write-Host "Copiado: $($f.Name) -> sm-$i.webp"
    $i++
}
Write-Host "Total: $($i-1) arquivos copiados"
