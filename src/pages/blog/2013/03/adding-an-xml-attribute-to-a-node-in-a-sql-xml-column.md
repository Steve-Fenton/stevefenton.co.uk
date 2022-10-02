---
id: 633
layout: src/layouts/Default.astro
title: 'Adding an XML attribute to a node in a SQL XML column'
pubDate: 2013-03-08T15:43:31+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=633'
permalink: /2013/03/adding-an-xml-attribute-to-a-node-in-a-sql-xml-column/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - sql
    - xml
---

I’m not the world’s biggest fan of XML, but if you get locked in a room with a SQL Server XML column at a party, you need to make the best of it and start undoing buttons.

So when you have an XML column, you have two parts to your SQL queries. The first part is good old fashioned SQL that deals with all your normal columns, the second is the special XQuery syntax that handles everything inside of the XML column.

I find it is best to work in these two areas independently, so to get into an example, I would start off by writing a SQL query such as:

```
<pre class="prettyprint lang-sql">
SELECT
    Id,
    XmlColumn
FROM
    MyTable
WHERE
    Id = 1
```

Next I forget all about SQL and write the XQuery bit:

```
<pre class="prettyprint lang-sql">SELECT
    Id,
    XmlColumn
FROM
    MyTable
WHERE
    Id = 1
AND
    XmlColumn.value('(Root/Customers/Customer)[1]', 'varchar[50]') = 'Example'
```

In a query, the first argument is the expression that finds a node in the XML, the second argument is the data type you want to treat the thing you found as. Zooming in, you can see the query expression is just some brackets containing a path through the XML and then outside of the brackets the selection of the (1-based array) first element – because I’m expecting exactly one in this case.

You can use the following chops to filter what you get back…

Use an attribute to filter results…

```
<pre class="prettyprint lang-sql">
'(Root/Customers/Customer[@MyAttribute="Example")[1]'
```

Get elements that don’t have a particular attribute…

```
<pre class="prettyprint lang-sql">
'(Root/Customers/Customer[not(@MyAttribute))[1]'
```

And so on.

The reasonably interesting thing is that you can actually update the XML in an UPDATE query too. Once again, think of things in terms of two queries, your SQL query and your XQuery…

```
<pre class="prettyprint lang-sql">
UPDATE
    MyTable
SET
    XmlColumn.modify('
        insert attribute MyAttribute {"Example Value"}
        into (Root/Customers/Customer[@Id="360"])[1]
    ')
WHERE
    Id = 1
```

The XQuery is like its own INSERT statement within the SQL query – in this example adding an attribute called “MyAttribute” with a value of “Example Value” to the Customer node that has an Id attribute equal to “360”. Sweet.