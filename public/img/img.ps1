$files = Get-ChildItem -Recurse

foreach($file in $files) {
    $name = $file.Name
    Write-host $file.Path

    if ($name -match 'x[0-9]+.jpg') {
        $file.Delete()
    }
}