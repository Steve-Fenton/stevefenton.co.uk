---
id: 988
layout: src/layouts/Default.astro
title: 'WPF BackgroundWorker and the mysterious 0x80131623 error'
pubDate: 2010-12-30T20:05:47+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=988'
permalink: /2010/12/wpf-backgroundworker-and-the-mysterious-0x80131623-error/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - wpf
---

If you use Windows Presentation Foundation (WPF), you are very likely to come across the awesome BackgroundWorker and its best friend the Dispatcher. The BackgroundWorker lets you chuck a long-running process onto another thread, allowing the UI to remain responsive. When the BackgroundWorker needs to pop something on the UI, you ask the Dispatcher to send it back to the UI thread.

This is actually one of my favourite features of WPF – using additional threads is incredibly simple. The only thing you have to watch out for is the mysterious 0x80131623 error, which you’ll find in your Output window in Visual Studio just after the UI disappears.

You may find that you get this error every time you run your UI, but you may also find it only happens occasionally. Here are the things you need to check before you go back to running everything on the UI thread.

### Never Cross The Threads

If you need to get something off of the UI to use in the BackgroundWorker, you need to send it as an argument. You can’t go and grab it while you are in the asynchronous process. You may find that this does sometimes work – but it will be unpredictable depending on whether anything on the UI thread is also accessing the item.

### Watch Out For Event Handlers

When you send something back to the UI, make sure you use the Dispatcher. Be aware that the instruction may fire off an event that you have set up. For example, if you trigger your BackgroundWorker from the text-changed event of a TextBox, and you use the Dispatcher to send text back to the TextBox, it will trigger the text-changed event and you’ll just keep going around and around.

### Simple Example

Here is a simple example of setting up and using a BackgroundWorker and Dispatcher, including passing an argument.

```
<pre class="prettyprint lang-csharp">
private BackgroundWorker _worker;

public Designer()
{
    InitializeComponent();
    Setup();
}

private void Setup()
{
    _worker = new BackgroundWorker();
    // We define the method "DoSomethingAsync" below...
    _worker.DoWork += new DoWorkEventHandler(DoSomethingAsync);
}

private void Button1_Click(object sender, RoutedEventArgs e)
    var text = TextBox1.Text;
    // Pass in the text as the argument
    _worker.RunWorkerAsync(text);
}

private void DoSomethingAsync(object sender, DoWorkEventArgs e)
{
    // Perform some long running process
    var longRunningProcessor = new LongRunningProcessor();
    var result = longRunningProcessor.DoLongRunningProcess(e.Argument.ToString());
    // Use the Dispatcher to send an instruction back to the UI thread
    Dispatcher.Invoke(DispatcherPriority.Normal, new Action(delegate
            {
                TextBox2.Text = result;
            }));
}
```