---
title: TransactionScope and WCF Services
navMenu: false
pubDate: 2009-11-26T22:18:51+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - WCF
---

The problem I encountered was that, while I had started a TransactionScope in my calling method (and could even see a current transaction in my services) – an error in a second WCF service call was NOT rolling back the changes made in a previous WCF service call. The behaviour was as if each service had its own transaction, rather than joining the existing ambient transaction that I started in my client.

## Example

- I press a button on an .aspx web page
- I start a TransactionScope: `using (TransactionScope scope = new TransactionScope()) {`
- I call a service to update something on a database – this also contains a using statement for the transaction scope
- I call another service to update a different item somewhere else – this also contains a using statement for the transaction scope
- The second service errors for some reason

### Expected

- The changes from both services are rolled back

### Actual

- The first service call succeeds and the second service call rolls back

## Solution

In order to create an ambient transaction in your client and ensure that it is used by your WCF services, you need to make sure you've done the following…

### Configure Your Binding

In your WCF service, you will need to make sure that your binding has transactionFlow set to true. To do this, create a binding configuration and refer to it on your endpoint:

```xml
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

### Attribute Up Your Interface

You now need to add TransactionFlow attributes to your interface – so if it looks like this:

```csharp
[OperationContract]
bool UpdateSomethingElse(string whatever);
```

You need to add this:

```csharp
[OperationContract]
[TransactionFlow(TransactionFlowOption.Allowed)]
bool UpdateSomethingElse(string whatever);
```

### Attribute Up Your Method

You can then add an OperationBehavior to your method to tell it to enlist in the transactionScope, so you find this:

```csharp
public bool UpdateSomethingElse(string whatever) {
```

And you add an attribute like this:

```csharp
[OperationBehavior(TransactionScopeRequired = true)]
public bool UpdateSomethingElse(string whatever) {
```

## Connection Strings

It is well mooted that you should adjust your connection strings to ensure safety in the event of a time out – all you have to do is add the following attribute to your connection:

```xml
Transaction Binding=Explicit Unbind;
```

## Summary

Hopefully this article will help a few people who are getting unexpected results from their use of TransactionScope – please [contact me](/contact/) if you want to add anything!
