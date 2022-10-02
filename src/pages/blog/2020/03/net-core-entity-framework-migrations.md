---
layout: src/layouts/Default.astro
navMenu: false
title: '.NET Core Entity Framework Migrations'
pubDate: 2020-03-28T21:37:15+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - core
    - entityframework
---

When you don’t want to script out your own database, Entity Framework Core has your back. When you change your database context or the models it uses, you can use a couple of commands to create and update your database to keep it in sync with your model. These examples run in the Package Manager console (and if you have trouble running them, check the end of this post).

Your package manager console can be found in Visual Studio using Tools -&gt; NuGet Package Manager -&gt; Package Manager Console.

[![Package Manager Location](/img/2020/03/tools-nuget-package-manager-console.jpg)](https://www.stevefenton.co.uk/2020/03/net-core-entity-framework-migrations/tools-nuget-package-manager-console/)

### What will be included

To make it into a migration, you need a model class to represent the table. You also need the property on the database context class.

Example model.

```
<pre class="prettyprint lang-csharp">
[Table("Content")]
public class Content
    : IDataModel
{
    public long Id { get; set; }

    public string Title { get; set; }

    public string CreatedBy { get; set; }
}
```
Example database context, with a DbSet of the model type.

```
<pre class="prettyprint lang-csharp">
public class ApplicationDbContext
    : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Content> Contents { get; set; }
}
```
### Create the initial version

To create the first migration file, run the `dotnet ef migrations add` command, and name the migration “InitialCreate”:

```
<pre class="prettyprint">
dotnet ef migrations add InitialCreate
```
You will find some new files in your project, named using a date-stamp and the name of your version. For example `20200328212129_InitialCreate.cs`. You can view the file and see what it does, it will all look pretty familiar. There is an “Up” method and a “Down” method. This allows you to apply or reverse the migration.

To apply all migrations and get the database into the up-to-date state, run:

```
<pre class="prettyprint">
PM> dotnet ef database update
Done.
```
### Applying changes

Each time you have changes you want to push into the database, you run the `ef migrations add` command with an appropriate name. In the example below, the “Container” table is going to be added…

```
<pre class="prettyprint">
PM> dotnet ef migrations add AddContainers
Done. To undo this action, use 'ef migrations remove'
```
And you make it happen using the same command as before:

```
<pre class="prettyprint">
PM> dotnet ef database update
Done.
```
The common pattern is `ef migrations add [name]` -&gt; `ef database update`.

### Undo! Removing a migration

If you made a mistake in adding a migration, you can remove it using this command:

```
<pre class="prettyprint">
PM> dotnet ef migrations remove
Removing migration '20200328212010_AddContainers'.
Reverting model snapshot.
Done.
```
### Migration Bundles

Starting from EF Core 6, you can bundle your migrations into an executable that you can run to upgrade your database.

```
<pre class="prettyprint">
PM> dotnet ef migrations bundle
Build started...
Build succeeded.
Building bundle...
Done.
```
This will generate an `efbundle.exe` file that can be deployed and run to perform the upgrade. This can be included in your normal deployment pipeline.

You can add to the same bundle over time using the `--force` option and you can change the connection using the `--connection` option.

```
<pre class="prettyprint">
PM> dotnet ef migrations bundle --force --connection "Data Source=.;Database=ExampleDatabase"
```
### Troubleshooting

The most likely error you’ll encounter is “Could not execute because the specified command or file was not found”.

When this happens, you just need to add the following to your .csproj file:

```
<pre class="prettyprint lang-xml">
  <ItemGroup>
    <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.3" />
  </ItemGroup>
```
Or you can just install the tool globally:

```
<pre class="prettyprint">
dotnet tool install --global dotnet-ef
```
To update the tool, use the following command, passing the appropriate version (you’ll be told the version when you get warned you are out of date).

```
<pre class="prettyprint">
dotnet tool update --global --version 3.1.5 dotnet-ef
```
If the tool can’t work out which project to use, you can give it a hint. All the commands accept the `--project` parameter.

```
<pre class="prettyprint">
dotnet ef migrations add InitialCreate --project Fenton.MigrationExample
```