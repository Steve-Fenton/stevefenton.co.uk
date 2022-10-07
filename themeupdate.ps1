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

# Your own custom copies

## Author list page

$from = $src + 'src/pages/authors/[author]/'
$to = './src/pages/authors/[author]/'
robocopy $from $to '[page].astro'

## Article list page -> Blog list pages
$from = $src + 'src/pages/articles/'
$to = './src/pages/blog/'
robocopy $from $to '[page].astro'

## Article category list page -> Blog category list page
$from = $src + 'src/pages/articles/[category]/'
$to = './src/pages/blog/[category]/'
robocopy $from $to '[page].astro' /s

## Article tag list pages -> Blog tag list page
$from = $src + 'src/pages/articles/[tag]/'
$to = './src/pages/blog/[tag]/'
robocopy $from $to '[page].astro' /s

# Standard copies

robocopy $srcComponents $destComponents
robocopy $srcLayouts $destLayouts

# Aligns utils to the theme... these are shared between all accelerator themes

robocopy $srcUtils $destUtils *.astro
robocopy $srcUtils $destUtils *.js

