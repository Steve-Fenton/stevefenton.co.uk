# Updates a site from the Astro Accelerator
#
# Copies layouts, components, utilities, and any additional files you select.
# Run this from your project folder.
#
# Just make sure both Astro Accelerator and your project are sibling folders
# i.e.
# c:\Users\You\repos\astro-accelerator
# c:\Users\You\repos\your-project

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
#
# You can copy items such as list pages to keep them in sync
# with updates, and you can place them in different locations
# such as taking:
#   src/pages/articles/[page].astro
# and putting it in:
#   src/pages/blog/[page].astro
# Note: The "from" folder should be prefixed with the $src variable:
#   $src + 'src/pages/articles/'
# Note: The "to" folder should be relative:
#   './src/pages/blog/'

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

