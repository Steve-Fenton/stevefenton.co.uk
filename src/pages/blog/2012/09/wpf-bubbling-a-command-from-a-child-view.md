---
layout: src/layouts/Default.astro
navMenu: false
title: 'WPF bubbling a command from a child view'
pubDate: 2012-09-20T23:57:08+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=736'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'csharp'
    - wpf
    - xaml
---

If you are writing a <abbr title="Windows Presentation Foundation">WPF</abbr> application using re-usable views, you will at some point want to bubble an event or command up from the child view to its parent view. Luckily it is quite straight-forward to to with a RoutedEvent.

In our example, we will have the following components:

- **MainWindow**  
    This is our parent window that should handle events raised by child controls
- **ChildControl**  
    This is the control that will raise an event
- **ChildControlBase**  
    This is where we will define the event, so it can be raised from multiple child controls and still get easily handled in the parent window

Let’s start right down at the bottom of this stack. In ChildControlBase you need to define the event.

```
<pre class="prettyprint lang-csharp">
public class ChildControlBase : UserControl
{
    // This defines the custom event
    public static readonly RoutedEvent MyCustomEvent = EventManager.RegisterRoutedEvent(
        "MyCustom", // Event name
        RoutingStrategy.Bubble, // Bubble means the event will bubble up through the tree
        typeof(RoutedEventHandler), // The event type
        typeof(ChildControlBase)); // Belongs to ChildControlBase
        
    // Allows add and remove of event handlers to handle the custom event
    public event RoutedEventHandler MyCustom
    {
        add { AddHandler(MyCustomEvent, value); }
        remove { RemoveHandler(MyCustomEvent, value); }
    }
}
```
I have used “MyCustom” as the event name, in real life you would name this specifically after the intention of the event, for example “MajorIncidentAlert”.

In each child control that will *raise* the event, we inherit from our ChildControlBase, rather than directly from UserControl.

So in our XAML, we change:

```
<pre class="prettyprint lang-xml">
<UserControl ...
```
To:

```
<pre class="prettyprint lang-xml">
<MyNamespace:ChildControlBase ...
```
And in our code-behind, we can raise the event from anywhere we like. In this example, I am raising the event when a particular button is clicked, but you can raise the event at any point.

```
<pre class="prettyprint lang-csharp">
public partial class ChildControl
{
    public ChildControl()
    {
        InitializeComponent();
    }
    
    private void HandleButtonClick(object sender, RoutedEventArgs e)
    {
        // This actually raises the custom event
        var newEventArgs = new RoutedEventArgs(MyCustomEvent);
        RaiseEvent(newEventArgs);
    }
}
```
The last piece of the puzzle is to *handle* the event. It is worth remembering that the event can be handled by the child control and still be bubbled up to the parent window – this pattern doesn’t just allow you to raise an event to the parent, it can be handled multiple times as it bubbles up through the tree and each handler can do something different and specific.

In the XAML for the parent window, we need to tell it that it can expect the event:

```
<pre class="prettyprint lang-xml">
<Window xmlns:WpfExample="clr-namespace:MyNamespace"  x:Class="MyNamespace.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="MainWindow" Height="350" Width="525"
        MyNamespace:ChildControlBase.MyCustom="HandleChildEvent">
```
The last line in this example is the important bit – it tells the window to listen out for a “MyCustom” event and when it gets one, send it our “HandleChildEvent” event handler. Our code behind looks like this:

```
<pre class="prettyprint lang-csharp">
public partial class MainWindow
{
    public MainWindow()
    {
        InitializeComponent();
    }
    
    private void HandleChildEvent(object sender, RoutedEventArgs e)
    {
        // Code to handle the event raised from the child
        // Use this line to stop the event bubbling further if you need to
        e.Handled = true;
    }
}
```
The HandleChildEvent method can take whatever action is necessary for the event, in the context of the parent window.

If we don’t want the event to continue bubbling up through the tree, we simply use e.Handled = true. I have put this in as an example, but as we are on the parent window, the event has nowhere further to bubble up to. This is a mechanism you could use to stop the event from propagating if you decide to fully handle it elsewhere.