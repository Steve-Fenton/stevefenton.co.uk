---
layout: src/layouts/Default.astro
title: 'X509 certificates on Windows Server 2003'
navMenu: false
pubDate: 2011-01-14T19:59:16+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - IIS
---

This issue originally came up some time between 2004 and 2006 while I was working on a web portal for fund and share trading – but recently popped up its head again, which made me decide to write down the answer properly in case other people stumble across this issue with certificates and private keys.

If you have ever used X509 certificates on Windows Server 2003, you will already know about the additional security that was added to certificates in the certificate store. On previous versions of Windows Server, the Network Service had implicit permission to access the private key of certificates in the store, but Windows Server 2003 contained a change that removed this permission.

If you have some .NET code that needs the private key, you will need to grant access to the Network Service if you want to be able to retrieve it, otherwise you’ll be denied with a `System.Security.Cryptography.CryptographicException` error such as “The handle is invalid” or “Access is denied”.

The good news is that if you like a bit of command line prompt-age, you can download a command utility from Microsoft that will tell you what accounts have access to the private key of a given certificate and will also allow you to grant permission to Network Service.

The tool is rather snappily titled the Windows HTTP Services Certificate Configuration Tool (WinHttpCertCfg.exe) and it can be [downloaded from the Microsoft Downloads Site](http://www.microsoft.com/downloads/en/details.aspx?familyid=c42e27ac-3409-40e9-8667-c748e422833f&displaylang=en).

## View certificate permissions

The following command will list all accounts with access to the private key.

```powershell
WinHttpCertCfg.exe -l -c LOCAL_MACHINE\MY -s "IssuedToName"
```

## Grant access to “Network Service”

The following command will grant permission for Network Service to access the private key of the certificate. Even though you’ll see the user with a space, be careful not to place a space inbetween Network and Service.

```powershell
WinHttpCertCfg.exe -g -c LOCAL_MACHINE\MY -s "IssuedToName" -a "NetworkService"
```

There are some additional notes on [WinHttpCertCfg usage on MSDN](http://msdn.microsoft.com/en-us/library/aa384088%28v=vs.85%29.aspx).