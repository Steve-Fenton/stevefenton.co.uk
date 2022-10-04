---
layout: src/layouts/Default.astro
title: 'Clean out old IIS log files'
navMenu: false
pubDate: 2015-07-07T21:00:34+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - IIS
    - VBScript
---

IIS log files are a blessing and a curse. When you are investigating something on your server, they are great. At all other times they are just eating your disk space.

What is needed is a way to bin-off the old log files to keep the disk clear.

Here is a quick VBScript file that does the job:

```vb
iisFolderPath = "E:\IIS-Logs"
maxAgeInDays = 90

Wscript.Echo "Starting..."

Set fileSystem = CreateObject("Scripting.FileSystemObject")
Set iisFolder = fileSystem.GetFolder(iisFolderPath)
For Each currentFolders in iisFolder.SubFolders
    Set currentFolder = fileSystem.GetFolder(currentFolders.Path)
    Set currentFiles = currentFolder.Files
    For Each currentFile in currentFiles
        ageInDays = now-currentFile.DateCreated
        if ageInDays > (maxAgeInDays + 1)  then
            Wscript.Echo "Deleting " & currentFile.Name
            fileSystem.deletefile currentFile, True
        end if
    Next
Next
```

You can call this from the command line using the following command:

```powershell
cscript.exe CleanIISLogs.vbs
```

You can also automate this process using Task Scheduler. For the action, enter the following information (assuming you have saved the VBScript file as “E:\IIS-Logs-Cleaner\CleanIISLogs.vbs”):

- Action: Start a program
- Program/script: C:\\Windows\\System32\\CScript.exe
- Add arguments (optional): //Nologo //B CleanIISLogs.vbs
- Start in: E:\\IIS-Logs-Cleaner

And now you’ll have just 90 days of logs, rather than all of them forever!