---
id: 12944
title: 'Title case text with MySql'
pubDate: '2022-05-17T20:00:21+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=12944'
permalink: /2022/05/title-case-text-with-mysql/
categories:
    - Programming
tags:
    - mysql
---

I needed to update a WordPress taxonomy on a site with thousands of categories and tags. This is not a task for a human, so I created a bit of a gnarly SQL script to update the MySql table.

As you can see from the script, it has limitations! Specifically, if you need it to work on longer sentences, you’ll have to add more rows, as each row handles a “word” found in the text. For tags in WordPress, it is unlikely the edge of this would be tested, but if you were running it on titles it’s going to be a problem. Equally, it isn’t going to discriminate for words like “the”, which you may not want to title-case, such as “Back to the Future”. It’s going to give you “Back To The Future”, which is a bit awful.

For each word, it applies `UPPER` to the fist letter and `LOWER` to the rest, so it fixes things in both directions. For example “BACK TO THE FUTURE”, “back to the future”, and “bAcK tO tHe FuTuRe” will all become “Back To The Future”.

```
<pre class="prettyprint lang-sql">
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