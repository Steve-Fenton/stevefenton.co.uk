---
layout: src/layouts/Default.astro
navMenu: false
title: 'Web farm cookie encryption in ASP.NET'
pubDate: 2016-02-24T10:56:23+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Cookies
    - Encryption
---

If you want to secure a cookie, you need look no further than the System.Web.Security MachineKey class. Using this class, you can protect and unprotect text quite simply. If you are running without load-balancing, you can skip to the wrapper methods at the bottom of the article, which give you methods for protecting and unprotecting strings.

The problem is, the machine key is likely to be different on each of your machines (incredibly likely). So if you want to use this technique across a web farm, with sticky sessions switched off (of course), you’ll need to be able to encrypt a value on one machine and decrypt it on another.

So we need to generate a machine key to share amongst all these machines. Here is a little method that does this using the RNGCryptServiceProvider…

```
<pre class="prettyprint lang-csharp">using System;
using System.Text;
using System.Security.Cryptography;
```
```
<pre class="prettyprint lang-csharp">private static string GetKey(int keyLength)
{
    var buffer = new byte[keyLength / 2];
    using (var cryptoService = new RNGCryptoServiceProvider())
    {
        cryptoService.GetBytes(buffer);
    }

    StringBuilder keyBuilder = new StringBuilder(keyLength);

    for (int i = 0; i < buffer.Length; i++)
    {
        keyBuilder.Append(string.Format("{0:X2}", buffer[i]));
    }

    var result = keyBuilder.ToString();
    return result;
}
```
Using the above method, you can generate an SHA1 key and an AES key to use as your shared machine key. Here is a simple console app that does just that:

```
<pre class="prettyprint lang-csharp">static void Main()
{
    var sha1Key = GetKey(128);
    var aesKey = GetKey(64);

    Console.WriteLine(sha1Key);
    Console.WriteLine();
    Console.WriteLine(aesKey);

    Console.ReadLine();
}
```
You can then pop these two keys in your web.config file, in the spaces indicated in this code snippet.

```
<pre class="prettyprint lang-xml"><system.web>
    <machineKey
      validationKey="SHA1-KEY-GOES-HERE"
      decryptionKey="AES-KEY-GOES-HERE"
      validation="SHA1" decryption="AES"
    />
    <!-- ... -->
</system.web>
```
If you are using this for values stored long-term, make doubly sure that you have these backed up somewhere safe, otherwise you won’t be able to decrypt your data later on if you lose your keys.

The final piece of the puzzle is a couple of wrapper methods that expose the MachineKey Protect and Unprotect methods to use with strings.

```
<pre class="prettyprint lang-csharp">private static string Protect(string text, string purpose)
{
    if (string.IsNullOrEmpty(text))
    {
        return null;
    }

    byte[] unprotectedValue = Encoding.UTF8.GetBytes(text);
    byte[] protectedValue = MachineKey.Protect(unprotectedValue, purpose);
    return HttpServerUtility.UrlTokenEncode(protectedValue);
}

private static string Unprotect(string text, string purpose)
{
    if (string.IsNullOrEmpty(text))
    {
        return null;
    }

    byte[] unprotectedValue = HttpServerUtility.UrlTokenDecode(text);
    byte[] protectedValue = MachineKey.Unprotect(unprotectedValue, purpose);
    return Encoding.UTF8.GetString(protectedValue);
}
```