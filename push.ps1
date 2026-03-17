# Freuds Marketing - Push to GitHub
# Uso: copia nella cartella D:\GitHub\freuds-preview e lancia nel PowerShell

cd D:\GitHub\freuds-preview
git add .
$msg = Read-Host "Messaggio commit (invio per default)"
if ($msg -eq "") { $msg = "Update site" }
git commit -m $msg
git push
Write-Host "✓ Live su https://0xdonnie.github.io/freuds-preview/" -ForegroundColor Green
