---
id: 1067
title: 'TransactionScope and WCF Services'
pubDate: '2009-11-26T22:18:51+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1067'
permalink: /2009/11/transactionscope-and-wcf-services/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - wcf
---

The problem I encountered was that, while I had started a TransactionScope in my calling method (and could even see a current transaction in my services) – an error in a second WCF service call was NOT rolling back the changes made in a previous WCF service call. The behaviour was as if each service had its own transaction, rather than joining the existing ambient transaction that I started in my client.

### Example

- I press a button on an .aspx web page
- I start a TransactionScope: `using (TransactionScope scope = new TransactionScope()) {`
- I call a service to update something on a database – this also contains a using statement for the transaction scope
- I call another service to update a different item somewhere else – this also contains a using statement for the transaction scope
- The second service errors for some reason

#### Expected

- The changes from both services are rolled back

#### Actual

- The first service call succeeds and the second service call rolls back

### Solution

In order to create an ambient transaction in your client and ensure that it is used by your WCF services, you need to make sure you’ve done the following…

#### Configure Your Binding

In your WCF service, you will need to make sure that your binding has transactionFlow set to true. To do this, create a binding configuration and refer to it on your endpoint:

```
<pre class="prettyprint lang-csharp">
<bindings>
    <wsHttpBinding>
        <binding name="wsHttpTransactional" transactionFlow="true" />
    </wsHttpBinding>
</bindings>
<endpoint address ="" 
          binding="wsHttpBinding" 
          bindingConfiguration="wsHttpTransactional" 
          contract="WcfServiceLibrary1.IService1">
```

#### Attribute Up Your Interface

You now need to add TransactionFlow attributes to your interface – so if it looks like this:

```
<pre class="prettyprint lang-csharp">
[OperationContract]
bool UpdateSomethingElse(string whatever);
```

You need to add this:

```
<pre class="prettyprint lang-csharp">
[OperationContract]
[TransactionFlow(TransactionFlowOption.Allowed)]
bool UpdateSomethingElse(string whatever);
```

#### Attribute Up Your Method

You can then add an OperationBehavior to your method to tell it to enlist in the transactionScope, so you find this:

```
<pre class="prettyprint lang-csharp">
public bool UpdateSomethingElse(string whatever) {
```

And you add an attribute like this:

```
<pre class="prettyprint lang-csharp">
[OperationBehavior(TransactionScopeRequired = true)]
public bool UpdateSomethingElse(string whatever) {
```

### Connection Strings

It is well mooted that you should adjust your connection strings to ensure safety in the event of a time out – all you have to do is add the following attribute to your connection:

```
<pre class="prettyprint lang-plain_text">
Transaction Binding=Explicit Unbind;
```

### Summary

Hopefully this article will help a few people who are getting unexpected results from their use of TransactionScope – please [contact me](https://www.stevefenton.co.uk/contact/) if you want to add anything!