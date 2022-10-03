---
layout: src/layouts/Default.astro
navMenu: false
title: 'Automating web login with HttpWebRequest'
pubDate: 2012-10-19T23:26:12+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=710'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - C-Sharp
---

If you have used an HttpWebRequest to grab a page you’ll find that it is reasonably easy to do – but if you use it to perform an automated login to a website, there are a couple of things you may trip up on.

### Proxy says no

If you get an HTTP 407 telling you that your proxy says no, you’ll need to add a proxy to the request. In most cases, you can do this using default values. Alternatively, you’ll need to set up credentials on your proxy for your application.

```
<pre class="prettyprint lang-xml">
<system.net>
    <defaultProxy useDefaultCredentials="true"/>
</system.net>
```
### Where are my cookies?

When you perform a login, the request – response flow is normally like this.

1. POST login form
2. HTTP 302 response
3. GET location from 302 response
4. HTTP 200 response

When automating a login, this causes a problem, because you probably want to grab hold of the cookies sent in step 2 (the first response) – but you’ll find that the response stream is the one from step 4 (the second response).

You can stop the request from automatically following the redirection and get hold of the first response (step 2) by switching off automatic redirections.

```
<pre class="prettyprint lang-csharp">
httpWebRequest.AllowAutoRedirect = false;
```
### Keeping hold of cookies

Once you get the response, you’ll need to squirrel the cookies away in a cookie container and then add that cookie container to the subsequent requests, so your login cookies get passed to the server.

Here is a full example where the Login method returns the cookie container to be used on subsequent requests.

I have written this as a mega-method for the purposes of the example – you could easily chop this up to make it re-usable and more readable.

```
<pre class="prettyprint lang-csharp">
protected static CookieContainer Login()
{
    string userName = "my.test.user.name";
    string password = "my.test.password";

    ASCIIEncoding encoding = new ASCIIEncoding();
    string postData = "Username=" + userName + "&Password=" + password;
    byte[] postDataBytes = encoding.GetBytes(postData);

    HttpWebRequest httpWebRequest = (HttpWebRequest) WebRequest.Create("http://localhost/Login/");

    httpWebRequest.Method = "POST";
    httpWebRequest.ContentType = "application/x-www-form-urlencoded";
    httpWebRequest.ContentLength = postDataBytes.Length;
    httpWebRequest.AllowAutoRedirect = false;

    using (var stream = httpWebRequest.GetRequestStream())
    {
        stream.Write(postDataBytes, 0, postDataBytes.Length);
        stream.Close();
    }

    var cookieContainer = new CookieContainer();

    using (var httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse())
    {
        using (var streamReader = new StreamReader(httpWebResponse.GetResponseStream()))
        {
            foreach (Cookie cookie in httpWebResponse.Cookies)
            {
                cookieContainer.Add(cookie);
            }
        }
    }

    return cookieContainer;
}
```