---
layout: src/layouts/Default.astro
title: 'Adding an NCover target to MSBuild to get code coverage'
navMenu: false
pubDate: 2011-02-09T19:54:07+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - msbuild
    - NCover
---

This article describes how to add NCover code coverage to your MSBuild scripts in an extensible way. By using and adapting the example below, you should be able to get NCover results across your entire code base, all compiled into an excellent web-based summary.

You might also be interested in generating [Trend reports using MSBuild and NCover](/blog/2011/05/using-ncover-with-msbuild-to-get-reports-and-trends/).

If you follow a reasonable naming convention for your Unit Test projects, you can take advantage of this method, which will automatically add Unit Test projects based on running a regular expression to detect the projects based on the convention.

To tell MSBuild that NCover is going to get a piece of the action, we use the following configuration.

```xml
<UsingTask TaskName="NCover.MSBuildTasks.NCover" 
           AssemblyFile="$(NCoverPath)\Build Task Plugins\NCover.MSBuildTasks.dll"/>
```

We also need to set up some some properties that we will use throughout the MSBuild project. You probably already have properties, so just add these to your existing list.

If you are using a 64bit version of Windows, you will need to specify the path to NUnit using “Program Files (x86)” rather than simply “Program Files”. NCover comes in a 64 bit flavour, so just use “Program Files” for NCover.

```xml
<ItemGroup>
    <SolutionFile Include="$(SourceDirectory)\Solution.sln"/>
</ItemGroup>

<PropertyGroup>
    <NUnitPath>C:\Program Files$(ProgramFilesSuffix)\NUnit 2.5.9\bin\net-2.0</NUnitPath>
    <NCoverPath>C:\Program Files\NCover</NCoverPath>
    <NCoverOutputPath>C:\Inetpub\wwwroot\NCover</NCoverOutputPath>
</PropertyGroup>
```

The next step is to get all projects from the solution file and then extract from that collection a list of test projects. In this example, all test projects end with the word “Test”, so you can use a regular expression to extract test projects from the wider list of projects.

```xml
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
```

We then use the Unit Test Projects in a target that builds all unit tests. This also outputs some Unit Test Assemblies, which we need for NCover. It is assumed that you also have a step called “BuildProjects”, which builds everything except the unit tests – nothing specific needs to be added to that step, so it isn’t included here.

```xml
<Target Name="BuildUnitTests" DependsOnTargets="GetProjectSets">
    <Message Text="Build Unit Tests using @(UnitTestProjects)" />
    <MSBuild
        Projects="@(UnitTestProjects)"
        Targets="Build"
        Properties="Configuration=$(Configuration);Platform=$(Platform);RunCodeAnalysis=$(RunCodeAnalysis)">
        <Output TaskParameter="TargetOutputs" ItemName="UnitTestAssemblies" />
    </MSBuild>
</Target>
```

And finally, we generate the code coverage analysis by passing the Unit Test Assemblies that were generated in the Build Unit Tests stage to NCover.

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
    />
</Target>
```

The end result is that you can browse “http://buildmachine/CoverageReports/” where “buildmachine” is the relevant machine name, and you’ll get the full NCover summary and detail in HTML format.

## Notes on errors

You may come across the error “No data was collected”, usually accompanied by “NCover.Console is returning exit code #20000”. This can be resolved by following the [instructions on the official NCover website](http://www.ncover.com/lt/no-data).