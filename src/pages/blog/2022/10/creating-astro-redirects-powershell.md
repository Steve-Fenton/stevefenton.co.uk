---
layout: src/layouts/Default.astro
navMenu: false
title: 'Creating lots of Astro redirects with PowerShell'
pubDate: 2022-10-04
bannerImage:
  src: /img/2022/10/astro.png
  alt: The Astro rocket logo
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Astro
    - JavaScript
    - TypeScript
---

Part of moving my website to Astro involved moving the address of all the blog posts from `/2022/10/title` to `/blog/2022/10/title`. Not wanting to leave lots of people stranded, I decided to set up redirects for all the posts to get people to the correct place.

Astro generates static files, so I'm using a `Redirect.astro` layout, with a custom frontmatter value to do the redirect.

## Redirect.astro layout

```astro
---
import type { Frontmatter } from '@config';

// Properties
type Props = {
    frontmatter: Frontmatter;
}
const { frontmatter } = Astro.props as Props;

const destination = frontmatter.redirect;
const metaContent = `0; URL=${ destination }`;
---
<html>
    <meta charset="utf-8">
    <title>Redirecting to { destination }</title>
    <meta http-equiv="refresh" content={ metaContent }>
    <link rel="canonical" href={ destination }>
</html>
```

## Redirect markdown pages

Any markdown page can now signal a redirection using the `Redirect.astro` layout with a `redirect` address. The address can be relative, or fully qualified, so you redirect off-site if you need to.

```markdown
---
layout: src/layouts/Redirect.astro
title: Redirect
redirect: /blog/2009/04/pie-charts-are-bad/
navMenu: false
pubDate: 2022-09-17
---

```

## Automating redirect page creation

I didn't want to sit and write over 800 markdown redirect files, so a little PowerShell trickery was needed to speed things up. The simplest way to do this was:

1. Make a copy of all the posts in `src/pages/blog/` in a temporary directory
2. Run the PowerShell script against the directory to replace their content with redirects
3. Place the files in the root folder `src/pages/`
4. Test it all worked!

Here's the PowerShell script, which you run in the temporary directory.

```powershell
$loc = Get-Location
$len = $loc.ToString().length

$template = '---
layout: src/layouts/Redirect.astro
title: Redirect
redirect: {url}
navMenu: false
pubDate: 2022-09-17
---
<div>
Our article feed can be found <a href="{url}">here</a>
</div>'

Write-Host $template

$files = Get-ChildItem -Recurse

foreach($file in $files) {
    $name = $file.Name

    if ($name -match '.md$') {
        $fullName = $file.FullName
        $redirect = '/blog' + $fullName.Substring($len).replace('\', '/').replace('.md', '/')
        $contents = $template.Replace('{url}', $redirect)
        Set-Content -Path $fullName -Value $contents
    }
}
```

Amazingly, it took less than a second to update over 800 files.

Your situation may differ, but some of this might be useful.