$ErrorActionPreference = 'Stop'

Set-Location -Path $PSScriptRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error 'npm nao foi encontrado no PATH. Instale o Node.js para continuar.'
}

if (-not (Test-Path -Path (Join-Path $PSScriptRoot 'node_modules'))) {
    Write-Host 'Dependencias nao encontradas. Executando npm install...'
    npm install
}

Write-Host 'Iniciando projeto (npm run dev)...'
npm run dev
