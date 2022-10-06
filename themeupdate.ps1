# Copies a theme from the astro accelerator into the current project.
#
# Just make sure both Astro Accelerator and your project are sibling folders
# i.e.
# c:\Users\Steve\repos\astro-accelerator
# c:\Users\Steve\repos\your-project

$location = Get-Location

$src = '../astro-accelerator/'
$srcComponents = $src + 'src/themes/accelerator/components'
$srcLayouts = $src + 'src/themes/accelerator/layouts'
$srcUtils = $src + 'src/utilities'

$destComponents = './src/themes/accelerator/components'
$destLayouts = './src/themes/accelerator/layouts'
$destUtils = './src/utilities'

cd $src

git pull

cd $location

robocopy $srcComponents $destComponents

robocopy $srcLayouts $destLayouts

robocopy $srcUtils $destUtils *.astro

