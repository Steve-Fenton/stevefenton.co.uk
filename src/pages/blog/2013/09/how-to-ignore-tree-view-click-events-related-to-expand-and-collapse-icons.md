---
layout: src/layouts/Default.astro
title: 'How to ignore tree view click events related to expand and collapse icons'
navMenu: false
pubDate: 2013-09-02T11:13:02+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
---

The official documentation for the System.Windows.Forms.TreeView NodeMouseClick event reliably confirms that:

> This event occurs when the user clicks any part of a tree node with the mouse, including the plus sign (<span class="label">+</span>) or minus sign (<span class="label">–</span>) that indicates whether the node is collapsed or expanded. <cite>[MSDN TreeView.NodeMouseClick Event](http://msdn.microsoft.com/en-us/library/system.windows.forms.treeview.nodemouseclick.aspx)</cite>

This can be a real pain if you aren’t interested in triggering your click event when your user is expanding or collapsing. With no built-in way to ignore expand and collapse events that raise these pesky unwanted NodeMouseClick events, your only option is to work around it using:

```csharp
private bool IsExpanding = false;

private void Tree_BeforeExpand(object sender, System.Windows.Forms.TreeViewCancelEventArgs e)
{
     IsExpanding = true;
}

private void Tree_AfterExpand(object sender, System.Windows.Forms.TreeViewEventArgs e)
{
     IsExpanding = false;
}

private void Tree_NodeMouseClick(object sender, System.Windows.Forms.TreeNodeMouseClickEventArgs e)
{
    if (IsExpanding)
    {
        return;
    }
    // ...
}
```

If you know a more graceful way, [I’d love to hear it](/contact/)!

## hit.Location

Terry Liu has sent me a more graceful way to handle this, which doesn’t require the use of the expanding event listeners.

Here’s an example in Visual Basic .NET. It looks out for interactions with the plus/minus icon, which you you can then ignore.

```vb
Dim hit As TreeViewHitTestInfo = TreeView1.HitTest(e.Location)
If hit.Location = TreeViewHitTestLocations.PlusMinus Then Return
```