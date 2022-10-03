---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using Fitnesse for .NET'
pubDate: 2013-10-21T10:43:36+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=497'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - fitnesse
---

Fitnesse is a stand-alone wiki for describing and running your acceptance tests. There is a highly satisfying feeling you can only get from editing a wiki page, pressing a button and seeing if your program works as expected and although Fitnesse has roots in Java, it is an awesome tool for .NET too.

Here is a quick set up guide for getting started with Fitnesse with a C# program.

### Download Fitnesse

You can grab Fitnesse from the [official Fitnesse website](http://fitnesse.org/FitNesseDownload). Pop the fitnesse-standalone.jar file on your test server in the folder you want to run from, then run the following command (in this case, I’m running it from C:\\Fitnesse).

```
<pre class="prettyprint lang-powershell">
"C:\Program Files (x86)\Java\jre7\bin\java" -jar fitnesse-standalone.jar -p 8080
```
I’m using port 8080 in this example because the default port (80) is already taken. When you run the command, you’ll get a little Fitnesse window that you need to leave open while you want to access the wiki.

You can now browse to `http://localhost:8080` to see the default home page.

### Download FitSharp

You can grab FitSharp from the [FitSharp GitHub page](https://github.com/jediwhale/fitsharp/downloads). At the time of writing, FitSharp is targeting .NET 4 – so I downloaded the source and switched all the projects to 4.5 so it would be able to load all of my 4.5 assemblies.

I placed all of my FitSharp dlls in `C:\Fitnesse\Fitsharp` so I wouldn’t lose them.

### Write Your C# Code

To test my installation, I wrote a quick acceptance test that concatenates two strings (with a space in the middle) and returns the result. You will need to reference two of the DLLs from your FitSharp folder – so place them somewhere sensible:

- fit.dll
- fitsharp.dll

```
<pre class="prettyprint lang-csharp">
using fit;

namespace Acceptance.Tests
{
    public class MyAcceptanceTests : ColumnFixture
    {
        public string FirstString;
        public string SecondString;
        public string Concatenate()
        {
            return FirstString + " " + SecondString;
        }
    }
}
```
Build this project – the DLLs from your build will need to end up somewhere that your test server can get to.

### Write the Acceptance Test

If you go to `http://localhost:8080/MyAcceptanceTests` Fitnesse will create your new page for you to add tests to. In this page, you will need to add the following:

```
<pre class="prettyprint lang-plain_text">
!contents -R2 -g -p -f -h
!path C:\Source\AcceptanceTests\bin\Debug\AcceptanceTests.dll
!define COMMAND_PATTERN {%m -r fitnesse.fitserver.FitServer %p}
!define TEST_RUNNER {c:\Fitnesse\Fitsharp\Runner.exe}
!|AcceptanceTests.MyAcceptanceTests|
|FirstString|SecondString|Concatenate?|
|Hello      |World       |Hello World |
|Steve      |Fenton      |Steve Fenton|
```
The important bits here are…

- path – where your .NET DLLs can be found
- COMMAND\_PATTERN – this runs Fitnesse in .NET mode
- TEST\_RUNNER – this is the path to the FitSharp runner

You can now hit the “Test” button near the top right of the page to check your tests work.

If there is a problem, Fitnesse will give you a big red button that will show you the details of the error.

If a test fails, it will go red and describe why it failed.