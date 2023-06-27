---
title: 'Adding TypeScript to an Existing Visual Studio project'
navMenu: false
pubDate: 2012-10-04T23:36:32+01:00
authors:
    - steve-fenton
categories:
    - Programming
    - 'Visual Studio'
tags:
    - TypeScript
---

Quick Update! As of 2017, the best way of adding TypeScript to any project (in any development environment) is to add a `.tsconfig` file – if you add one to a Visual Studio project, it will override the project settings anyway. You can do lots more with a `.tsconfig` file and it works with task runners too. Right, here’s the long answer that applied back in 2012.

The chances are that if you are going to use TypeScript, you’ll want to add it to an existing project. The great news is that it is really simple to do.

## The New Way

As of December 2013 things are a bit different than when I first wrote this article.

If you are using Visual Studio 2013 and you have the [TypeScript Visual Studio Extension](https://www.typescriptlang.org/) installed, you’ll get the following message as soon as you add a TypeScript file to your project…

:::div{.inset}
:img{src="/img/2015/07/typescript-configured.png" alt="TypeScript Configured" loading="lazy"}
:::

If you don’t get this message, you’ll find that there are just a couple of lines you need to add to your project file:

```xml
<ItemGroup>
    <TypeScriptCompile Include="Scripts\app.ts" />
  </ItemGroup>
  <Import Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets" 
          Condition="Exists('$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets')" />
```

If you aren’t using all the new funky stuff – there is still “the old way”, as described below:

## The Old Way

This method applied when I wrote this article back in the distant past… If you’re using some old bits and pieces you found lying around it may still be useful – but read The New Way above for the correct way to do things as of December 2013!

There are two simple steps. You have probably already performed the first step and [downloaded the TypeScript for Visual Studio extension](https://www.typescriptlang.org/) – so let’s skip on to the second step – adding the build event to your project

The second step (and this is my second solution to this problem as the pre-build event could sometimes be troublesome) is to add the following sections to your project file. You will need to select “Unload project file” from the project context menu to edit the project within Visual Studio – or you can just hack it in Notepad!

```xml
  <ItemGroup>
    <AvailableItemName Include="TypeScriptCompile" />
  </ItemGroup>
  <ItemGroup>
    <TypeScriptCompile Include="$(ProjectDir)\**\*.ts" />
  </ItemGroup>
  <Target Name="BeforeBuild">
    <Exec Command=""$(PROGRAMFILES)\Microsoft SDKs\TypeScript\0.8.0.0\tsc" @(TypeScriptCompile ->'"%(fullpath)"', ' ')" />
  </Target>
```

This will compile all your .ts TypeScript files into .js JavaScript files.