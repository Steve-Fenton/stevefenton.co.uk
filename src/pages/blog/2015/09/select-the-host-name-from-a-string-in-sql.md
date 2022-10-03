---
layout: src/layouts/Default.astro
navMenu: false
title: 'Select the host name from a string in SQL'
pubDate: 2015-09-14T08:43:46+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

If you have a table containing web addresses and you need to get hold of the host name, this script may come in handy:

```
<pre class="prettyprint lang-sql">SELECT 
	/* Get just the host name from a URL */
	SUBSTRING(@WebAddress,
		/* Starting Position (After any '//') */
		(CASE WHEN CHARINDEX('//', @WebAddress)= 0 THEN 1 ELSE CHARINDEX('//', @WebAddress) + 2 END),
		/* Length (ending on first '/' or on a '?') */
		CASE
			WHEN CHARINDEX('/', @WebAddress, CHARINDEX('//', @WebAddress) + 2) > 0 THEN CHARINDEX('/', @WebAddress, CHARINDEX('//', @WebAddress) + 2) - (CASE WHEN CHARINDEX('//', @WebAddress)= 0 THEN 1 ELSE CHARINDEX('//', @WebAddress) + 2 END)
			WHEN CHARINDEX('?', @WebAddress, CHARINDEX('//', @WebAddress) + 2) > 0 THEN CHARINDEX('?', @WebAddress, CHARINDEX('//', @WebAddress) + 2) - (CASE WHEN CHARINDEX('//', @WebAddress)= 0 THEN 1 ELSE CHARINDEX('//', @WebAddress) + 2 END)
			ELSE LEN(@WebAddress)
		END
	) AS 'HostName'
```
You can use this against a variable (as per the examples on this web page) or you can run it against a table just as easily. Just pop the column name in the script instead of @WebAddress.

For all of the following examples:

```
<pre class="prettyprint lang-sql">DECLARE @WebAddress varchar(300)

SET @WebAddress = 'https://www.stevefenton.co.uk/2015/09/get-argument-values-from-linq-expression/'
/* Host name script */

SET @WebAddress = '//www.stevefenton.co.uk/2015/09/get-argument-values-from-linq-expression/'
/* Host name script */

SET @WebAddress = 'https://www.stevefenton.co.uk/?y=2015&m=09&t=get-argument-values-from-linq-expression'
/* Host name script */

SET @WebAddress = 'https://www.stevefenton.co.uk?y=2015&m=09&t=get-argument-values-from-linq-expression'
/* Host name script */
```
The result will be:

```
www.stevefenton.co.uk
```