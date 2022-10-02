---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using NCover with MSBuild to get reports and trends'
pubDate: 2011-05-17T19:19:03+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=951'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - msbuild
    - ncover
---

A while ago I wrote an article about [how to get HTML Reports generated automatically by NCover as part of an MSBuild task](https://www.stevefenton.co.uk/2011/02/Adding-An-NCover-Target-To-MSBuild-To-Get-Code-Coverage/). In this article, I extend the example in order to get trend reporting.

In order to get trend reporting, you must specify a CoverageFile in your NCover task, and also an AppendTrendTo file, which will either create or update a trend file. Here is our NCover task after we have added these two properties:

```
<pre class="prettyprint lang-xml">
<NCover
        ToolPath="$(NCoverPath)\"
        TestRunnerArgs="@(UnitTestAssemblies, ' ')"
        TestRunnerExe="$(NUnitPath)nunit-console.exe"
        CoverAll="True"
        HtmlReportDir="$(NCoverOutputPath)\index.html"
        ProjectName="Code Coverage"
        CoverageFile="$(NCoverOutputPath)\Trends\coverage.xml"
        AppendTrendTo="$(NCoverOutputPath)\Trends\NCover.trend"
    />
```

The trend file is generated using the coverage file, so you have to generate the coverage file in order to get trend reports, even if you are most interested in the HTML reports.

Now you need to add an NCoverReporting task to do the rest. To do this, you will first need to add a UsingTask statement to your MSBuild script:

```
<pre class="prettyprint lang-xml">
<UsingTask TaskName="NCover.MSBuildTasks.NCoverReporting" 
           AssemblyFile="$(NCoverPath)\Build Task Plugins\NCover.MSBuildTasks.dll" />
```

And then the NCoverReporting task itself:

```
<pre class="prettyprint lang-xml"><NCoverReporting ToolPath="$(NCoverPath)\"
        CoverageDataPaths="$(NCoverOutputPath)\Trends\Coverage.xml"
        CoverageTrendPath="$(NCoverOutputPath)\Trends\NCover.trend"
        OutputReport="$(NCoverOutputPath)\Trends\"
    />
```

You should now have a Coverage.xml file and an NCover.trend file stored in the location of your choice.

Follow these instructions to view the trends…

- Open NCover Explorer
- Click on “Coverage File” &gt; “Open” and browse to Coverage.xml
- Once you have loaded Coverage.xml, you can load the trend information
- Click on “Load Trends” and browse to NCover.trend
- Click on “Trends And Statistics” to view reports

Important note – when you first add trends, the graph will only have a single data point. You will need to let the “Total Executions” count build up in order to get trends over time, this means you need to let the MSBuild task happen regularly to get long-term statistics.

Here is the complete example, which shows how it all slots together.

```
<pre class="prettyprint lang-xml">
<UsingTask TaskName="NCover.MSBuildTasks.NCover" AssemblyFile="$(NCoverPath)\Build Task Plugins\NCover.MSBuildTasks.dll"/>
<UsingTask TaskName="NCover.MSBuildTasks.NCoverReporting" AssemblyFile="$(NCoverPath)\Build Task Plugins\NCover.MSBuildTasks.dll" />
<ItemGroup>
    <SolutionFile Include="$(SourceDirectory)\Solution.sln"/>
</ItemGroup>
<PropertyGroup>
    <NUnitPath>C:\Program Files$(ProgramFilesSuffix)\NUnit 2.5.9\bin\net-2.0#/>#/NUnitPath>
    <NCoverPath>C:\Program Files\NCover</NCoverPath>
    <NCoverOutputPath>C:\Inetpub\wwwroot\NCover</NCoverOutputPath>
</PropertyGroup>
<Target Name="GetProjectSets">
    <Message Text="Getting all project sets from @(SolutionFile)" />
    <GetSolutionProjects Solution="@(SolutionFile)">
        <Output TaskParameter="Output" ItemName="SolutionProjects" />
    </GetSolutionProjects>
    <RegexMatch
        Input="@(SolutionProjects)"
        Expression=".([\.]csproj|[\.]vbproj|[\.]wdproj)$">
        <Output TaskParameter="Output" ItemName="SolutionProjectNames" />
    </RegexMatch>
   
    <RegexReplace
        Input="@(SolutionProjectNames)"
        Expression="(.)*\\((.)*(.csproj|.vbproj)(.)*)"
        Replacement="$(SourceDirectory)\$0"
        Count="-1">
        <Output TaskParameter="Output" ItemName="AllProjects" />
    </RegexReplace>
   
    <RegexMatch
        Input="@(AllProjects)"
        Expression="(.)*Test(s)?(.)*">
        <Output TaskParameter="Output" ItemName="UnitTestProjects" />
    </RegexMatch>
    <Message Text="Got the full paths to the following projects @(AllProjects)" />
</Target>
<Target Name="BuildUnitTests" DependsOnTargets="GetProjectSets">
    <Message Text="Build Unit Tests using @(UnitTestProjects)" />
    <MSBuild
        Projects="@(UnitTestProjects)"
        Targets="Build"
        Properties="Configuration=$(Configuration);Platform=$(Platform);RunCodeAnalysis=$(RunCodeAnalysis)">
        <Output TaskParameter="TargetOutputs" ItemName="UnitTestAssemblies" />
    </MSBuild>
</Target>
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
    />
    <NCoverReporting ToolPath="$(NCoverPath)\"
        CoverageDataPaths="$(NCoverOutputPath)\Trends\Coverage.xml"
        CoverageTrendPath="$(NCoverOutputPath)\Trends\NCover.trend"
        OutputReport="$(NCoverOutputPath)\Trends\"
    />
</Target>
```