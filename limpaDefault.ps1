# Limpa arquivos e pastas padrão do Next.js e cria uma estrutura escalável

# 1. Função para excluir arquivos e diretórios
function Clean-NextJsProject {
    param (
        [string]$RootPath
    )

    # Define arquivos e diretórios padrão para excluir
    $filesToDelete = @(
        ".eslintrc.json",
        "LICENSE",
        "next-env.d.ts",
        "postcss.config.mjs",
        "tailwind.config.ts",
        "README.md",
        "package-lock.json",
        "estrutura.ps1",
        "estrutura.txt"
    )
    $dirsToDelete = @(
        "public",
        "src"
    )

    # Remove os arquivos
    foreach ($file in $filesToDelete) {
        $filePath = Join-Path -Path $RootPath -ChildPath $file
        if (Test-Path $filePath) {
            Remove-Item $filePath -Force
            Write-Host "Removido arquivo: $filePath" -ForegroundColor Green
        }
    }

    # Remove os diretórios
    foreach ($dir in $dirsToDelete) {
        $dirPath = Join-Path -Path $RootPath -ChildPath $dir
        if (Test-Path $dirPath) {
            Remove-Item $dirPath -Recurse -Force
            Write-Host "Removido diretório: $dirPath" -ForegroundColor Green
        }
    }
}

# 2. Função para criar a nova estrutura do projeto
function Create-ProjectStructure {
    param (
        [string]$RootPath
    )

    # Define a nova estrutura
    $folders = @(
        "public",
        "src/app",
        "src/components",
        "src/styles",
        "src/utils",
        "src/assets"
    )
    $files = @(
        "public/favicon.ico",
        "public/logo.svg",
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/styles/globals.css",
        "src/styles/colors.css",
        "src/utils/api.ts",
        "package.json",
        "tsconfig.json",
        ".gitignore"
    )

    # Cria os diretórios
    foreach ($folder in $folders) {
        $folderPath = Join-Path -Path $RootPath -ChildPath $folder
        if (-not (Test-Path $folderPath)) {
            New-Item -ItemType Directory -Path $folderPath | Out-Null
            Write-Host "Criado diretório: $folderPath" -ForegroundColor Cyan
        }
    }

    # Cria os arquivos
    foreach ($file in $files) {
        $filePath = Join-Path -Path $RootPath -ChildPath $file
        if (-not (Test-Path $filePath)) {
            New-Item -ItemType File -Path $filePath | Out-Null
            Write-Host "Criado arquivo: $filePath" -ForegroundColor Yellow
        }
    }
}

# 3. Executa as funções
$RootPath = Get-Location

# Limpa os arquivos e diretórios padrão
Write-Host "Limpando projeto padrão do Next.js..." -ForegroundColor Magenta
Clean-NextJsProject -RootPath $RootPath

# Cria a nova estrutura escalável
Write-Host "Criando nova estrutura de projeto..." -ForegroundColor Magenta
Create-ProjectStructure -RootPath $RootPath

Write-Host "Estrutura criada com sucesso!" -ForegroundColor Green
