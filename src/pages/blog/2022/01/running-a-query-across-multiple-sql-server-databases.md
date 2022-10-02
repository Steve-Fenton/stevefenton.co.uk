---
layout: src/layouts/Default.astro
navMenu: false
title: 'Running a query across multiple SQL Server databases'
pubDate: 2022-01-18T11:36:59+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - sql
---

I was working on an issue where I needed to get data from about twenty instances of a database. The schema was very similar across all the databases, but each database was on a virtual machine on the network and had it’s own data. This is a legacy application that at some point in the past had a strategy of “an install per customer”. After manually getting data from each of these databases once, the next time I needed the data, I decided it was time to apply some automation. I wrote a very basic .NET 6 app, called MultiQuery, that takes in a query configuration and aggregates the data from all databases into a single CSV output file.

Under the hood, it is plain old connections and commands. The records are yielded back as enumerable data, which means the rows fly out straight into the file without having to bring all records into memory at the same time. I haven’t tested how far you can stretch this in terms of volumes of data, but it worked for my scenario.

### Query configuration

The query configuration is just a simple JSON file that takes the SQL query, the target fields, and a list of connection strings.

```
<pre class="prettyprint lang-json">
{
  "Query": "SELECT Id, Title FROM ExampleTable",
  "Fields": [
    "Id",
    "Title"
  ],
  "ConnectionStrings": [
    "Server=.;Database=Example1;Trusted_Connection=True;MultipleActiveResultSets=true",
    "Server=.;Database=Example2;Trusted_Connection=True;MultipleActiveResultSets=true"
  ]
}
```
The input file goes in `c:\Temp\mq\input.json` and the `output.csv` gets written to the same location (you can set a different drive letter if you wish, see below).

### Running the query

Then you just run the app using:

```
<pre class="prettyprint">
c:\...\MultiQuery> mq c
```
The only argument to pass to `mq` is the drive letter, in the above example it’s `c`.

### The output

The output file will have a column for each of the fields in the field list, plus an extra one to tell you the data source for each of the rows. It’s just a plain old CSV file.

[![The temp mq folder with an input and output file](/img/2022/01/temp-mq-folder.jpg)](https://www.stevefenton.co.uk/2022/01/running-a-query-across-multiple-sql-server-databases/temp-mq-folder/)

### Least privilege

You should use a SQL account with limited permissions (i.e. read only access to non-sensitive data) to ensure the tool is not used to export personal information, sensitive data, or change the data in the database.

In theory, you could run an `UPDATE` or `DELETE` query if you used an account with too much access – and you should ensure you don’t deploy this into a situation where it could be use to siphon out large volumes of personal data.

### Summary

This is a useful utility if you need to run a query against multiple databases. They don’t even have to have the same schema; they just need query compatibility (i.e. they could be totally different database schemas, but all have an “Audit” table that has “AuditType” and “AuditDate” columns).

Please feel free to raise issues or submit PRs over on the [MultiQuery GitHub site](https://github.com/Steve-Fenton/MultiQuery).