$from = './public/css/'
$to = './dist/css/'
robocopy $from $to '*.css'

$from = './public/js/'
$to = './dist/js/'
robocopy $from $to '*.js'

$from = './public/js/modules/'
$to = './dist/js/modules/'
robocopy $from $to '*.js'