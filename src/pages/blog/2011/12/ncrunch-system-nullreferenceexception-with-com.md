---
layout: src/layouts/Default.astro
navMenu: false
title: 'NCrunch system NullReferenceException with COM'
pubDate: 2011-12-09T17:12:20+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=877'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - ncrunch
---

If you are using [NCrunch awesomeness in Visual Studio](https://www.stevefenton.co.uk/2011/12/Some-Handy-NCrunch-Tips/), you may come across this slight bug. It is most likely to appear if you reference a COM component in your project:

```
<pre class="prettyprint">
(0): System.NullReferenceException: Object reference not set to an instance of an object.
 at Mono.Cecil.Cil.CodeReader.MoveTo(Int32 rva)
 at Mono.Cecil.Cil.CodeReader.ReadMethodBody()
 at Mono.Cecil.Cil.CodeReader.ReadMethodBody(MethodDefinition method)
 at Mono.Cecil.MethodDefinition.&lt;get_Body&gt;b__2(MethodDefinition method, MetadataReader reader)
 at Mono.Cecil.ModuleDefinition.Read[TItem,TRet](TItem item, Func`3 read)
 at Mono.Cecil.MethodDefinition.get_Body()
 at nCrunch.Compiler.ILManipulator.#=qVgZeh_Xo4G8OazbHXUj$HZZ4k875wM5nD3bVlbELkuc=(Collection`1 #=qK_nsQKpybmFcinz5j6S1wg==)
 at nCrunch.Compiler.ILManipulator.#=qDMRbu14rmiUliyk77s6YE39JKJojc8PFBwrtQadFj6E=(IEnumerable`1 #=qhgNHocq3EmkOJuAn3tZE7g==)
 at nCrunch.Compiler.ILManipulator.ProcessAssembly(String compiledAssemblyFilePath, Boolean instrumentAssembly, IList`1 referencedAssemblies)
 at nCrunch.Compiler.RemoteBuildRunner.#=qfsCVCP9z8p8itsPjdEucb21b3UdedVHBi8gsF76Ddpw=(ComponentBuildParameters #=qmkOUo_qPadDv2Jh_RvEeFw==, String #=qeQVxsYosAYGxzPuSRqwCgvxMKp_7oVPJk1lA2naHni0=, BuildOutput #=qRILTPHYyuGtBH_NyMhcqkQ==, String #=qp67sU93pGbLGBgppbDFZXbOOMHNfqroD4Dqku1U_cUI=)
 at nCrunch.Compiler.RemoteBuildRunner.Build(ComponentBuildParameters parameters)
```
Don’t panic – there is a work around for this. Open NCrunch configuration and find the project that fails with this error and change the setting “InstrumentAssembly” to false. It is the NCrunch instrumentation that has a problem, so this will allow the project to build and for the tests to run.

![NCrunch](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/NCrunchInstrumentationSetting.jpg)