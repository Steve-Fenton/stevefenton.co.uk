# Copies a theme from the astro accelerator into the current project.
#
# Just make sure both Astro Accelerator and your project are sibling folders
# i.e.
# c:\Users\Steve\repos\astro-accelerator
# c:\Users\Steve\repos\your-project

$location = Get-Location

$src = '../astro-accelerator/'
$srcC = $src + 'src/themes/accelerator/components'
$srcL = $src + 'src/themes/accelerator/layouts'

$destC = './src/themes/accelerator/components'
$destL= './src/themes/accelerator/layouts'

cd $src

git pull

cd $location

robocopy $srcC $destC

robocopy $srcL $destL

