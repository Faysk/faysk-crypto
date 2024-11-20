# Limpa o arquivo estrutura.txt antes de começar
"" > estrutura.txt

# Função para gerar a estrutura
function Generate-Tree {
    param (
        [string]$Path,
        [int]$IndentLevel = 0
    )

    # Adiciona arquivos na pasta atual
    Get-ChildItem -Path $Path -File | ForEach-Object {
        (' ' * $IndentLevel) + '│   ' + $_.Name | Out-File -Append -FilePath estrutura.txt
    }

    # Adiciona subpastas
    Get-ChildItem -Path $Path -Directory | ForEach-Object {
        (' ' * $IndentLevel) + '├───' + $_.Name | Out-File -Append -FilePath estrutura.txt
        Generate-Tree -Path $_.FullName -IndentLevel ($IndentLevel + 4)
    }

    # Adiciona o final para a última pasta
    if ($IndentLevel -gt 0) {
        (' ' * ($IndentLevel - 4)) + '└───' | Out-File -Append -FilePath estrutura.txt
    }
}

# Diretório raiz do projeto
$RootPath = Get-Location

# Adiciona o cabeçalho com o nome do diretório raiz
"PS $RootPath\" | Out-File -FilePath estrutura.txt

# Gera a árvore ignorando node_modules, .git e .next
Get-ChildItem -Path $RootPath -File | ForEach-Object {
    '│   ' + $_.Name | Out-File -Append -FilePath estrutura.txt
}

Get-ChildItem -Path $RootPath -Directory | Where-Object {
    $_.Name -notin ".git", ".next", "node_modules"
} | ForEach-Object {
    '├───' + $_.Name | Out-File -Append -FilePath estrutura.txt
    Generate-Tree -Path $_.FullName -IndentLevel 4
}

# Remove o último └─── se necessário
(Get-Content estrutura.txt) -replace "└───$", "" | Set-Content estrutura.txt
