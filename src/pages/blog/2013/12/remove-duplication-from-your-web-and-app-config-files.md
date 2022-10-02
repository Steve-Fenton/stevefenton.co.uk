---
layout: src/layouts/Default.astro
navMenu: false
title: 'Remove duplication from your web and app config files'
pubDate: 2013-12-06T09:49:15+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=475'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - xml
---

Ever inherited a .NET app that has the database connection string in 30 different app.config and web.config files? How about one that also had the connection string in the connections string config section as well as the app settings config section.

Well, even if it hasn’t been that bad for you – if you have your connection string in more than one place, it is probably worth fixing.

### Machine Config

The obvious choice would be to squirrel the connection string away in the machine.config file – not only does this mean it is in just one place, it also means each of your environments can be pre-set with the correct connection string and you’re unlikely to accidentally deploy the wrong value. This also solves the issue of having to create deployments that target the correct environment or having checklists on deploy night.

The problem is, some people really don’t like stuff being hidden in the machine.config. I think it is okay as long as everyone know that machine.config is how you roll – but others a really against it because they don’t think people will think of looking there (hey – if we all started using it, then we would all think of looking there right).

### Shared Config File

So here is a trick that will allow you to put the settings somewhere “more obvious” without duplicating it all over the show.

Start by creating a file in the root of your solution called “ConnectionString.config”. The contents of the file is just the connectionStrings config section.

```
<pre class="prettyprint lang-xml">
<?xml version="1.0"?>
<connectionStrings>
    <add name="YourConnectionString" 
         connectionString="Data Source=DBSERVER;Initial Catalog=SecretDataStore;integrated security=sspi"/>
</connectionStrings>
```

You can pop all your connection strings in this file.

To use connection strings in your app, you need to do something slightly different depending on whether it is a cool and progressive web app or not.

### Adding Shared Config to Web Projects

Because when you debug a web project, the root folder accesses the bin folder and when you actually run a web app the root folder accesses the bin folder – you don’t need to do much work to get the shared config in operation in your project.

To add the shared file:

1. Just right-click on the project and select **Add -&gt; Existing Item**
2. Browse up to the shared ConnectionString.config and then select **Add as Link**
3. Right-click on the newly added ConnectionString.config, go to **Properties** and set **Copy to Output Directory** to **Copy Always**

To use the shared file:

In your web.config file, replace the entire connectionStrings config section with a link to the shared file:

```
<pre class="prettyprint lang-xml"><connectionStrings configSource="bin\ConnectionString.config"/>
```

Whether you run in debug mode or in real life, the ConnectionString.config file will be picked up from the bin directory. You can now just edit the shared file to change all of your web projects in one hit.

### Adding Shared Config to Other Projects

There is a slight gotcha on other types of project. Firstly, when you debug, the path to the shared config file would be “bin/Debug/ConnectionString.config”, in release mode “bin/Debug/ConnectionString.config” and when deployed properly it would be “ConnectionString.config”.

To get around the variable path issue, you’ll need to follow some additional steps to add the shared file to your project. I have included the complete process below (rather than say “do what I said for web projects with some differences”, which would be annoying).

To add the shared file:

1. Just right-click on the project and select **Add -&gt; Existing Item**
2. Browse up to the shared ConnectionString.config and then select **Add as Link**
3. Right-click on the newly added ConnectionString.config, go to **Properties** and set **Copy to Output Directory** to **Copy Always**

To use the shared file:

In your app.config file, replace the entire connectionStrings config section with a link to the shared file:

```
<pre class="prettyprint lang-xml"><connectionStrings configSource="ConnectionString.config"/>
```

Note that we are saying that the ConnectionString.config file will always be in the root directory – this isn’t actually true when you are running the project in Visual Studio, so in order to make it true we need to copy the file.

To copy the file:

1. Right-click on the project and select **Properties**
2. In the **Build Events** tab, select **Edit Post-Build**
3. Add the following to the end of your post build events…

```
<pre class="prettyprint lang-powershell">
del /f /q "$(TargetDir)..\..\ConnectionString.config"
xcopy /f "$(TargetDir)\ConnectionString.config" "$(TargetDir)..\..\"
```

This will ensure the shared file will always be available in the same directory as the app.config file when running the project in Visual Studio (when you actually deploy the app / service it will be there by default).

So now you have a single file to change for all your projects.

### Warning

To get the most out of this, you will want to make sure the shared configuration is changed during the build process to point at the correct place. If you deploy five web projects, there will be five copies of the shared file in production that you’ll need to edit – so you’ll want to change the one file at build-time rather than N files after deployment.

If this poses a serious problem for some reason – go back and look at the machine.config technique instead!