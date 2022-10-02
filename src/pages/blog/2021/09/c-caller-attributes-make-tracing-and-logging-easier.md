---
id: 11671
title: 'C# Caller Attributes make tracing and logging easier'
pubDate: '2021-09-03T07:50:24+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=11671'
permalink: /2021/09/c-caller-attributes-make-tracing-and-logging-easier/
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

If you wanted to include information about your source code in a trace message, there would be quite a lot of prep work to do before you could actually write a message out. Let’s use the below `WriteTrace` example to show what this does to your application.

```
<pre class="prettyprint lang-csharp">
public void WriteTrace(string message,
        string memberName = "",
        string filePath = "",
        int lineNumber = 0)
{
    Trace.WriteLine("Message: " + message);
    Trace.WriteLine("Caller member name: " + memberName);
    Trace.WriteLine("Caller source file path: " + filePath );
    Trace.WriteLine("Caller source line number: " + lineNumber );
}
```

Our `WriteTrace` method forces you to go an get a bunch of information to log, which means to call it with all that information you need to write code like this:

```
<pre class="prettyprint lang-csharp">
// Preparation
string currentFile = new System.Diagnostics.StackTrace(true).GetFrame(0).GetFileName();
string currentPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
int currentLine = new System.Diagnostics.StackTrace(true).GetFrame(0).GetFileLineNumber(); 

WriteTrace("Some process is starting, or whatever!", currentFile, currentPath, currentLine);
```

This is quite a lot of work and is no longer necessary as you can use caller attributes to solve the whole problem. Here is a new `WriteTrace` method that you can only call with a `message`, but that logs all the information you wanted in the original version:

```
<pre class="prettyprint lang-csharp">
public void WriteTrace(string message,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string filePath = "",
        [CallerLineNumber] int lineNumber = 0)
{
    Trace.WriteLine("Message: " + message);
    Trace.WriteLine("Caller member name: " + memberName);
    Trace.WriteLine("Caller source file path: " + filePath );
    Trace.WriteLine("Caller source line number: " + lineNumber );
}
```

The member name will be the method or property name, or in slightly funky scenarios you’ll get generated names like “.ctor” in constructors, “.cctor” in static constructors, and “Finalize” in destructors.

This means our calling code can be simplified down to this simple call:

```
<pre class="prettyprint lang-csharp">
WriteTrace("Some process is starting, or whatever!");
```

This is going to be useful if you are handling exception logging, or writing trace statements in your application.