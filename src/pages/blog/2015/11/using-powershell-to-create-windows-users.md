---
layout: src/layouts/Default.astro
title: 'Using PowerShell to create Windows users'
navMenu: false
pubDate: 2015-11-27T06:30:58+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - 'Octopus Deploy'
    - PowerShell
---

Due to replication needing a few Windows users scattered about the place, I needed to write a PowerShell script to create the users as part of the Octopus Deploy automated deployment.

For completeness, I have added some users to this script, but you can use “Sensitive” variables in Octopus Deploy to hide away important information such as passwords.

```powershell
$computer = [ADSI]"WinNT://$Env:COMPUTERNAME,Computer"

$users = @(
    [pscustomobject]@{  Name="repl_distribution";   Description="Replication Distribution User";	Password="!" },
    [pscustomobject]@{  Name="repl_logreader";      Description="Replication Log Reader User";		Password="!" },
    [pscustomobject]@{  Name="repl_merge";          Description="Replication Merge User";		Password="!" },
    [pscustomobject]@{  Name="repl_snapshot";       Description="Replication Snapshot User";		Password="!" }
)

$accounts = $computer.Children | Where-Object {$_.SchemaClassName -eq 'user'}  | ForEach-Object {
    $_.name[0].tostring()
}

Foreach ($user in $users) {
    Write-Output "Creating User: $($user.Name)"

    if ($accounts -NotContains $user.Name) {
        $newUser = $computer.Create("User", $user.Name)
        $newUser.SetPassword($user.Password)
        $newUser.SetInfo()
        $newUser.FullName = $user.Description
        $newUser.SetInfo()
        $newUser.UserFlags = 64 + 65536 # ADS_UF_PASSWD_CANT_CHANGE + ADS_UF_DONT_EXPIRE_PASSWD
        $newUser.SetInfo()
    }
}
```

And in case you are interested, this is the full script for setting up replication users and allowing them access to the replication folder.

```powershell
Write-Host "Replication Set-Up Started."

$computer = [ADSI]"WinNT://$Env:COMPUTERNAME,Computer"

# You can add this as an Octopus Variable, rather than Hard Coding it here...
$SqlDataPath = "C:\Temp\SQL PATH"

$replFolder = Join-Path $SqlDataPath "repldata"

# Create the folder
Write-Output "Creating Path: $replFolder"
New-Item -ItemType Directory -Force -Path $replFolder

# Share the folder
Write-Output "Sharing Path: $replFolder"
$shares = [WMICLASS]"WIN32_Share"
$result = $shares.Create($replFolder, "repldata", 0)
If ($result.ReturnValue -eq 0 -or $result.ReturnValue -eq 22) {
    Write-Output "Share Result $($result.ReturnValue)"
} Else {
    throw "Failed to create share ReturnValue: " + $result.ReturnValue
}

# Create list of users
$users = @(
    [pscustomobject]@{  Name="repl_distribution";   Description="Replication Distribution User";	Password="!" },
    [pscustomobject]@{  Name="repl_logreader";      Description="Replication Log Reader User";		Password="!" },
    [pscustomobject]@{  Name="repl_merge";          Description="Replication Merge User";		Password="!" },
    [pscustomobject]@{  Name="repl_snapshot";       Description="Replication Snapshot User";		Password="!" }
)

# Get list of local accounts
$accounts = $computer.Children | Where-Object {$_.SchemaClassName -eq 'user'}  | ForEach-Object {
    $_.name[0].tostring()
}

# Get access control list for folder
$accessControlList = Get-Acl $replFolder

# Add users if they don't exist
Foreach ($user in $users) {
    Write-Output "Creating User: $($user.Name)"

    if ($accounts -NotContains $user.Name) {
        $newUser = $computer.Create("User", $user.Name)
        $newUser.SetPassword($user.Password)
        $newUser.SetInfo()
        $newUser.FullName = $user.Description
        $newUser.SetInfo()
        $newUser.UserFlags = 64 + 65536 # ADS_UF_PASSWD_CANT_CHANGE + ADS_UF_DONT_EXPIRE_PASSWD
        $newUser.SetInfo()
    }
    
    # Add an access rule for this user
    Write-Output "Adding Access Control For: $replFolder $($user.Name)"
    $accessRule = New-Object system.security.accesscontrol.filesystemaccessrule($user.Name, "FullControl", "ContainerInherit, ObjectInherit", "None", "Allow")
    $accessControlList.SetAccessRule($accessRule)
}

# Save access control list for folder
Write-Output "Saving Folder Permissions For: $replFolder"
Set-Acl $replFolder $accessControlList

Write-Output "Replication Set-Up Complete."
```