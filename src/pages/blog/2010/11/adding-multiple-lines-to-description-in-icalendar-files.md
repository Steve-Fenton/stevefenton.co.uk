---
title: 'Adding Multiple Lines to Descriptions in ICalendar Files'
navMenu: false
pubDate: 2010-11-17T20:15:43+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Calendar
---

ICalendar files (or iCal files) are used to share event information. You just download the file and open it up using your preferred calendar tool and it adds the event to your calendar. This is great as it means you don’t need to copy and paste the event information into a new meeting.

One issue I came across while trying to generate iCal files for event information was that it doesn’t like line-breaks / multiple lines in any of the fields. This was a problem for the DESCRIPTION of the event, as it almost always contains a lot of text, with line breaks.

There is a quick fix though, which will get your iCal file back up and running without simply removing all of the formatting. Firstly, change the key from DESCRIPTION to:

```
DESCRIPTION;ENCODING=QUOTED-PRINTABLE:
```

Then replace all of the line breaks with “=0D=0A”. Like this…

```
DESCRIPTION;ENCODING=QUOTED-PRINTABLE:This is the first line.=0D=0AThe Second line.=0D=0AThe third line.
```

This will be interpreted as containing line breaks when the iCal is imported. Job done!