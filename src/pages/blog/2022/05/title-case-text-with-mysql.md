---
layout: src/layouts/Default.astro
navMenu: false
title: Title case text with MySql
pubDate: 2022-05-17
modDate: 2022-10-13
keywords: mysql,title case,script
description: Find out how to title case a text field in MySql with a script.
bannerImage:
    src: /i/x/2022/05/dolphin.png
    alt: A dolphin underwater
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - MySql
---

I needed to update a WordPress taxonomy on a site with thousands of categories and tags. This is not a task for a human, so I created a gnarly SQL script to update the MySql table.

As you can see from the script, it has limitations! Specifically, if you need it to work on longer sentences, you’ll have to add more rows, as each row handles one word found in the text. For tags in WordPress, it is unlikely the edge of this would be tested, but if you were running it on titles, it’s will be a problem.

Equally, it doesn't handle short words, like “the”, which you may not want to title-case, such as “Back to the Future”. It will give you “Back To The Future”, which is a bit awful.

For each word, it applies `UPPER` to the fist letter and `LOWER` to the rest, so it fixes casing in both directions. For example, “BACK TO THE FUTURE”, “back to the future”, and “bAcK tO tHe FuTuRe” will all become “Back To The Future”.

With all this in mind, here's the script:

```sql
UPDATE `terms` SET name = TRIM(
    CONCAT_WS(' ',
        CONCAT(UPPER(LEFT(SUBSTRING_INDEX(name, ' ', 1), 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ', 1), 2))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  2),LENGTH(SUBSTRING_INDEX(name, ' ',  1)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  2),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  1))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  3),LENGTH(SUBSTRING_INDEX(name, ' ',  2)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  3),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  2))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  4),LENGTH(SUBSTRING_INDEX(name, ' ',  3)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  4),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  3))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  5),LENGTH(SUBSTRING_INDEX(name, ' ',  4)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  5),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  4))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  6),LENGTH(SUBSTRING_INDEX(name, ' ',  5)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  6),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  5))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  7),LENGTH(SUBSTRING_INDEX(name, ' ',  6)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  7),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  6))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  8),LENGTH(SUBSTRING_INDEX(name, ' ',  7)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  8),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  7))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ',  9),LENGTH(SUBSTRING_INDEX(name, ' ',  8)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ',  9),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  8))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ', 10),LENGTH(SUBSTRING_INDEX(name, ' ',  9)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ', 10),3 + LENGTH(SUBSTRING_INDEX(name, ' ',  9))))),
        CONCAT(UPPER(MID(SUBSTRING_INDEX(name, ' ', 11),LENGTH(SUBSTRING_INDEX(name, ' ', 10)) + 2, 1)), LOWER(MID(SUBSTRING_INDEX(name, ' ', 11),3 + LENGTH(SUBSTRING_INDEX(name, ' ', 10)))))
    )
);
```

If someone knows a better way, I’d love to hear it!

<small>Dolphin picture by [Sheilapic](https://www.flickr.com/photos/53344659@N05/)</small>