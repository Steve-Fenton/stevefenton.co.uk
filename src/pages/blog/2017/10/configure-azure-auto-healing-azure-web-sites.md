---
layout: src/layouts/Default.astro
title: 'Configure Azure Auto-Healing for your Azure Web Sites'
navMenu: false
pubDate: 2017-10-31T09:39:35+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Azure
    - Monitoring
    - Operations
---

While there a whole host of great ideas you can apply to [monitoring and alerting](/publications/web-ops-dashboards-monitoring-and-alerting/), one of the key reasons you spend time crafting your operations story is to avoid being interrupted during family time. So the AutoHeal feature for Azure Web Sites is your family-friendly helper that will take care of minor issues without human intervention.

AutoHeal connects a *trigger* to an *action* to automate recovery from application issues such as excess memory consumption, slow requests, or clusters of bad status codes. By leveraging AutoHeal, you buy yourself time to investigate and fix the underlying problem (that means you can’t just switch it on and pretend you have no problems!)

The official line on AutoHeal is…

> Auto heal is highly recommended for production applications that need to ensure high availability and resilience. Although auto heal is not an eventual fix for issues your application may encounter, it allows your application to quickly recover from unexpected issues whether they be platform or application and stay available for customers.
> 
> If auto heal is being triggerred repeatedly
> 
> - Re-examine the rule and ensure trigger values aren’t too aggressive
> - Investigate the cause for a proper fix.
> 
> <cite> – Microsoft Azure Portal Robot</cite>

You can enable auto-healing based on a number of factors – and it is as simple as adding a little configuration to your application:

```xml
<system.webServer>
    <monitoring>
        <triggers>
            <!-- The cool stuff happens here! -->
        </triggers>
        <actions value="..."/>
    </monitoring>
</system.webServer>
```

## Invalid child element

The `monitoring` element is only really applicable once your application is on Azure, so you may see the error `'system.webServer' has invalid child element 'monitoring'.` when you are working locally on this configuration. A common method for this is to add the configuration as a transformation in a separate file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration xmlns:xdt="http://schemas.microsoft.com/XML-Document-Transform">
    <system.webServer>
        <monitoring xdt:Transform="Insert">
            <triggers>
                <!-- The cool stuff happens here! -->
            </triggers>
           <actions value="..."/>
        </monitoring>
    </system.webServer>
</configuration>
```

## Auto-healing triggers

You can trigger auto-healing in a number of different scenarios, based on:

- The number of requests
- The number of slow requests
- The number of requests matching an HTTP status code, or sub-status code
- The memory usage of a worker process

TO implement this effectively, you’ll need to understand what normal looks like, but the goal is to eliminate out-of-hours emergencies over time, so overshoot at first, and then gradually bring in the numbers until the phone stops ringing. It may be tempting to just get auto-healing to step in at the drop of a hat, but you don’t want to end up in a situation where you are automatically restarting your application every ten minutes due to false alarms.

Here are the standard examples for you to take a look at…

```xml
<system.webServer>
    <monitoring>
        <triggers>
            <!-- Triggers when you have "count" number of requests within "timeInterval" amount of time -->
            <requests count="1000" timeInterval="00:10:00"/>

            <!-- Triggers when you have "count" number of requests that take "timeTaken" within "timeInterval" amount of time -->
            <slowRequests timeTaken="00:00:45" count="20" timeInterval="00:02:00" />

            <!-- Triggers when your worker process reaches "privateBytesInKB" kilobytes of private set -->
            <memory privateBytesInKB="800000"/>

            <!-- Triggers when you have "count" responses matching the configured status within "timeInterval" amount of time -->
            <statusCode>
                <add statusCode="500" subStatusCode="100" win32StatusCode="0" count="10" timeInterval="00:00:30"/>
            </statusCode>
        </triggers>

        <!-- Performs an overlapping recycle of the worker process when a trigger fires -->
        <actions value="Recycle"/>
    </monitoring>
</system.webServer>
```

## <del>Kudu</del>

<del>You can also set up auto-healing in Kudu, by navigating to Kudu -> Tools -> Support, selecting the application you want to configure, and opening the Mitigate tab:</del>

## <del>Diagnostic Tools</del>

<del>The auto-heal options have now moved into the main Azure portal. Navigate to the app service and select “Diagnose and solve problems”. This will bring up several options, but auto-heal is found under Diagnostic Tools > Auto Healing. The new UI features a wizard for setting up the auto-healing conditions. It also allows you to see the configuration in one view, so you don’t need to skip between the trigger and action tabs.</del>

## Diagnose and solve problems

AutoHeal keeps on moving around, but Sebastian Inones has tipped me off to its latest location, which is still within Diagnostic Tools, but organised slightly differently due to the expansion of the available tools…

1. Open your App Service in the Azure Portal
2. Select the Diagnose and solve problems blade
3. Choose the Diagnostic Tools box, which will open a little tab
4. From the button groups, pick AutoHeal from the Proactive Tools group
5. You’ll now have an open “Mitigation” tab with several AutoHeal options

:::div{.inset}
:img{src="/img/2017/10/azure-app-service-diagnostic-tools.jpg" alt="Azure App Service Diagnostic Tools" loading="lazy"}
:::

:img{src="/img/2017/10/azure-app-service-diagnostic-tools-auto-heal-link.jpg" alt="AutoHeal Link in Diagnostic Tools" loading="lazy"}

The mitigation tab lets you recover from unexpected behavior. You set a trigger (request count, slow requests, memory limit) and pair it with an action (restart the process, log an event). The pairing will keep the lights on for you while you investigate the route cause of your instability. It’s a kind of really good sticking plaster for an ill-behaved application.

By default, proactive AutoHeal will be enabled for your App Service. It will watch out for high memory usage or slow requests and will restart your process for you.

The most important part of AutoHeal is checking whether you have a problem that you need to resolve… and that’s where the AutoHeal history comes in. You can check the history of interventions in this view.

:::div{.inset}
:img{src="/img/2017/10/azure-autoheal-history.jpg" alt="Azure AutoHeal History" loading="lazy"}
:::

AutoHeal shouldn’t be used as a permanent replacement for working code!

I’ll try and update things when it moves again :)