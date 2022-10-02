---
layout: src/layouts/Default.astro
navMenu: false
title: 'Twilio SendSmsMessage returns null'
pubDate: 2013-12-09T09:45:51+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=470'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - twilio
---

[![Twilio Message](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/twilio.jpg)Sending your first Twilio text message](https://www.twilio.com/docs/api/rest/sending-messages) is actually pretty simple! The sign up process takes around 105 seconds from start to finish and there are helper-libraries and code samples for pretty much all the popular languages you’re likely to be using.

There is only one issue I came across while using the official .NET Twilio library (available via NuGet) that had insufficient information while I was attempting to send my first message and I thought I’d share as information out there is pretty sketchy.

If you get any errors while talking to the Twilio API, you’ll get the details in the RestException property of the Twilio response message. These are well documented and pretty simple to fix.

The problem is when the response is null.

Here is my entire test console application, which uses “System” and “Twilio”…

```
<pre class="prettyprint lang-csharp">
static void Main(string[] args)
{
    // https://www.twilio.com/docs/api/rest/sending-messages
    string accountSid = "From Your Twilio Account";
    string authToken = "From Your Twilio Account";
    var twilio = new TwilioRestClient(accountSid, authToken);
    var message = twilio.SendMessage(
        "Your Twilio Number",
        "Destination Number",
        "Hello Twilio");
    if (message == null)
    {
        Console.WriteLine("Message is null");
    }
    else
    {
        Console.WriteLine("Message sent: " + message.Sid);
    }
    Console.ReadLine();
}
```
So what do you do when the message is null? It could be for a whole bunch of reasons – so how do you narrow it down.

The answer is [Fiddler](http://fiddler2.com/). Open Fiddler, re-run the application and before you know if you’ve got your problem right in front of you. In my case it was a 407 – Proxy Authentication Required, but it might be something else in your case.

Once you know the real problem, it should be reasonably simple to search for the solution.