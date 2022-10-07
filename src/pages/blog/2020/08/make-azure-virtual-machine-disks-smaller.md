---
layout: src/layouts/Default.astro
title: Make Azure Virtual Machine disks smaller
navMenu: false
pubDate: 2020-08-19T21:00:47+01:00
authors:
    - steve-fenton
categories:
    - Azure
tags:
    - Disks
    - SQL
    - 'Virtual Machine'
---

Making a disk larger on Azure is a simple process in the Azure portal. You just stop the machine, edit the disk, enter a new size and hit “Save”. When you try to make a disk smaller, though, you’ll be told “new disk size should be greater than 1024 GiB. Disks can only be resized to a larger size”. Whoops… I created the VM with a pair of one terabyte disks and I’m using about 300MB on each one. Let’s make these Azure Virtual Machine disks smaller by replacing them with two new disks.

For illustrative purposes, we’ll follow my use-case, which is an Azure <abbr title="Virtual Machine">VM</abbr> that I set up to try out an idea. It is a VM with a SQL database, which is neat way to create a single machine to run a web app, command line app, and database for prototyping. In my case, I didn’t notice that I was adding 2x premium SSDs that were each 1,204 GiB. This is about £6.50 per day of storage. Yikes.

The problem is that you can’t reduce disk size in the Azure portal, compounded by a SQL server instance that is depending on those two disks.

**Please note** that as this article contains stuff that can result in losing data, it comes with no warranty. You are responsible for your data so make sure you have a recovery scenario if something goes wrong. We are in territory where we *will* be deleting entire disks, so you need to make sure it’s the right ones and that if it all goes horribly wrong you can get your data back.

## The Resulting Cost Saving

The chart below shows three zones. Zone A was using serverless SQL, which is super-easy to use but a bit pricey for the amount of reads and writes I was using. Zone B is when I switched to VMs, but accidentally added massive disks. Zone C is the cost saving when I made the disks “the right size”.

:::div{.inset}
:img{src="/img/2020/08/azure-cost-saving.png" alt="Azure Cost Tracking and Saving" loading="lazy"}
:::

## Checklist

Here is a checklist of the steps, each of which is described below.

1. Check starting point (note disk drive letters)
2. Backup database(s)
3. Stop Virtual Machine
4. Add new (smaller) disks
5. Start Virtual Machine
6. Remote onto Virtual Machine
7. Intialize disks in Disk Manager
8. Run the allocation wizard and assign drive letters
9. Copy the data to the new disks
10. Stop Virtual Machine
11. Remove old disks from Virtual Machine
12. Start Virtual Machine
13. Stop SQL Server
14. Change disk drive letters to match the old ones
15. Start SQL Server
16. Check the database
17. Delete the old managed disks

## Starting point

We are starting with two disks. `F:\` contains SQL data and `G:\` contains SQL logs.

We don’t want to lose all the data, so we start by backing up the database in case something goes horribly wrong. We can then stop the virtual machine using the Azure portal.

Our end goal is to have two much smaller disks (and probably just standard SSD rather than premium ones) in place of these massive ones.

## Add Two New Disks

These steps can be repeated for each disk. You can only do this when the Virtual Machine is both “stopped” and “deallocated”. When you click “Stop” in the Azure portal, it will cycle through a number of states, so you need to wait for “Stopped (deallocated)” before you proceed.

Navigate to “Disks” and add a new one. As all the existing disks are in use, you’ll be told there are no managed disks available; so just create a new one.

:::div{.inset}
:img{src="/img/2020/08/add-data-disk.jpg" alt="Add Data Disk" loading="lazy"}
:::

Pay attention on the next screen as this is where we choose the disk size and tier. The defaults look like what I have already, which explains why I ended up with massive disks. This is not a live platform, so let’s just have some 16 GiB standard SSDs.

:::div{.inset}
:img{src="/img/2020/08/create-managed-disk.jpg" alt="Create Managed Disk" loading="lazy"}
:::

Choose the tier first, then the size:

:::div{.inset}
:img{src="/img/2020/08/select-disk-size.jpg" alt="Select Disk Size" loading="lazy"}
:::

Now we can restart the VM.

## Initialise disks in Disk Management

Open up a session on the Virtual Machine and go to Start > Computer Management and run it as an administrator.

:::div{.inset}
:img{src="/img/2020/08/run-computer-management-as-administrator.jpg" alt="Open Computer Management" loading="lazy"}
:::

Then select the disk management section. It will prompt you to initialize the disks.

:::div{.inset}
:img{src="/img/2020/08/initialize-disks-in-disk-management.jpg" alt="Initialize Disks" loading="lazy"}
:::

The two disks will be listed with all 16 GB “Unallocated”, so we can right click and choose “New Simple Volume…” to complete the allocation wizard.

:::div{.inset}
:img{src="/img/2020/08/initialize-disks-new-simple-volume.jpg" alt="Start Allocation Wizard" loading="lazy"}
:::

During this process, make a note of the disk drive letters you assign as we will need these shortly.

:::div{.inset}
:img{src="/img/2020/08/initialize-disks-visible-disks.jpg" alt="Visible Disks" loading="lazy"}
:::

## Copy data

We now have replacement drives available, but they are empty. We have to move all the data from `F:\` to `J:\` and from `G:\` to `K:\`. We can do that by stopping SQL Server and running RoboCopy… all in a command terminal.

Stop SQL Server

```cmd
net stop MSSQLSERVER
```

Copy the data disk

```cmd
robocopy F:\ J:\ *.* /j /e /sec /Xd "System Volume Information" "$RECYCLE.BIN" /Xo
```

Copy the log disk

```cmd
robocopy G:\ K:\ *.* /j /e /sec /Xd "System Volume Information" "$RECYCLE.BIN" /Xo
```

We can now head back to the Azure portal to stop the VM once again.

## Remove old disks from the VM

Once the VM is “Stopped (deallocated)” we can remove the two old managed disks. We won’t delete them just yet, we just want them off the VM so we can grab the drive letters for our new disks.

Head to “Disks” and edit the list to “Detach” the old big disks.

Now we start the VM once again.

## Give the new disks the correct letters

Now we start another remote desktop session on the Virtual Machine and stop SQL server

```cmd
net stop MSSQLSERVER
```

We can now return to Computer Management > Disk Management and give the new disks the old drive letters. Select the disk and choose “Change drive letter and paths”.

:::div{.inset}
:img{src="/img/2020/08/change-drive-letter-and-paths.jpg" alt="Change Drive Letter" loading="lazy"}
:::

Then select the “Change” button.

:::div{.inset}
:img{src="/img/2020/08/change-drive-letter-and-paths-change.jpg" alt="Change Letter" loading="lazy"}
:::

In “Assign the following drive letter” carefully choose the correct letter, so SQL Server will find the data files and the log files in the correct place when we start it.

Repeat this for each disk, then re-start SQL Server.

```cmd
net start MSSQLSERVER
```

You can now check your database is up and running before deleting the old disks entirely in the Azure Portal.

The disks will still be listed in your resource list, but are “Unattached”.