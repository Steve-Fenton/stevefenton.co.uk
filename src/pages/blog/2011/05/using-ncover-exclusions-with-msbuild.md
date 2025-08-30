---
title: 'Using NCover exclusions with MSBuild'
navMenu: false
pubDate: 2011-05-30T18:24:04+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - msbuild
    - NCover
---

I have previously discussed [adding NCover to MSBuild](/blog/2011/02/adding-an-ncover-target-to-msbuild-to-get-code-coverage/) and also [how to get trend reporting as part of the NCover MSBuild target](/blog/2011/05/using-ncover-with-msbuild-to-get-reports-and-trends/). Let's add to all of that by filtering the NCover results to exclude stuff that you don't want in your coverage reports.

Remember, with great power comes great responsibility. Don't exclude code unless one of the following applies:

- The code is part of an external assembly that is tested in its own right – so you don't want code coverage for the assembly to appear in your results
- You have a common piece of code that has 100% test coverage, but you only want it to appear in its own NCover reports, not in the reports of each of its consumers
- You have an auto-generated piece of code (i.e. Reference.cs from a Web Service)

Just to make it clear… if you can write a test for a line of code – do it, don't exclude it if you could actually test it. So with this is mind, how do we exclude stuff from NCover?

## Exclude An Entire Assembly

You can exclude a whole assembly in NCover using the ExcludeAssemblies attribute. You specify the name of the assembly (without the ".dll" extension).

```ini
ExcludeAssemblies="MySql.Data"
```

This will exclude all code in MySql.Data.dll.

You can also specify multiple assemblies, using a semi-colon to separate each one.

```ini
ExcludeAssemblies="AutoMapper;MySql.Data"
```

Keep them in alphabetical order to make this list easier to maintain!

## Exclude By Attribute

In .NET 4 there is an attribute ready made for this, but you can easily create your own in previous versions. The attribute in question is in `System.Diagnostics.CodeAnalysis` and it is called the `ExcludeFromCodeCoverageAttribute`. To use it, just put the attribute on the class or method you want to exclude…

```csharp
using System.Diagnostics.CodeAnalysis;
[ExcludeFromCodeCoverage]
private class MyClass {
   //...
```

If you don't have .NET 4, roll your own until you upgrade your projects:

```csharp
public class ExcludeFromCodeCoverageAttribute : Attribute { }
```

In order to inform NCover about this attribute, supply the ExcludeAttributes attribute on your build target:

```ini
ExcludeAttributes="System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute"
```

Once again, use a semi-colon if you want to use more than one attribute.

## Exclude Specific Files

This is probably the one to use the least as it is going to be a maintenance overhead if you have a massive file list. The one scenario this is useful is for auto-generated classes as this means you don't need to make a manual change that will be overwritten if the class is re-generated. You just need to supply the full path to the file you want to exclude, with a bit of regex shenanigans. I don't actually know why this has to be a regular expression, given that you need to supply the whole file path – so let me know if you can think of a good reason.

Use the ExcludeFiles attribute to remove particular files from coverage results…

```ini
ExcludeFiles="c:\\Source\\Project\\Web References\\SomeWebService\\Reference\.cs"
```

Note that you need to double-slash the file path with `\\` and you need to escape the full-stop `\.` – otherwise it just won't work and you'll get a message about an "Invalid Regular Expression".

## Full Example

Here is an example that puts it all together, using the NCover target I've used in the previous articles…

```xml
<Target Name="RunCodeCoverage" DependsOnTargets="BuildAll;BuildUnitTests">
    <Message Text="Get code coverage from NCover" />
    <NCover
        ToolPath="$(NCoverPath)\"
        TestRunnerArgs="@(UnitTestAssemblies, ' ')"
        TestRunnerExe="$(NUnitPath)nunit-console.exe"
        CoverAll="True"
        HtmlReportDir="$(NCoverOutputPath)\index.html"
        ProjectName="Code Coverage"
        CoverageFile="$(NCoverOutputPath)\Trends\coverage.xml"
        AppendTrendTo="$(NCoverOutputPath)\Trends\NCover.trend"
        ExcludeAssemblies="AutoMapper;MySql.Data"
        ExcludeFiles="c:\\Source\\Project\\Web References\\SomeWebService\\Reference\.cs"
        ExcludeAttributes="System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute"
    />
    <NCoverReporting ToolPath="$(NCoverPath)\"
        CoverageDataPaths="$(NCoverOutputPath)\Trends\Coverage.xml"
        CoverageTrendPath="$(NCoverOutputPath)\Trends\NCover.trend"
        OutputReport="$(NCoverOutputPath)\Trends\"
    />
</Target>
```
