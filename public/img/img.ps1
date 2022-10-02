$files = Get-ChildItem -Recurse

foreach($file in $files) {
    $name = $file.Name
    if ($name -match '-scaled.png') {
        $file.Delete()
    }
}