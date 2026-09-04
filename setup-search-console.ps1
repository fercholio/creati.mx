[CmdletBinding()]
param()
Push-Location $PSScriptRoot
node "$PSScriptRoot\scripts\setup-search-console.mjs"
Pop-Location