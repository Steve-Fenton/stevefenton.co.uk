---
layout: src/layouts/Default.astro
navMenu: false
title: 'Monitor replication with DataDog and DogStatsd'
pubDate: 2016-03-08T06:00:47+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - 'c#'
    - datadog
    - monitoring
---

![DataDog Replication Monitoring](https://www.stevefenton.co.uk/wp-content/uploads/2016/03/datadog-replication.png)Although [DataDog](https://www.datadoghq.com/) comes with a healthy selection of integrations, there is always going to be something custom that you want to monitor. This is why [DogStatsd](http://docs.datadoghq.com/guides/dogstatsd/) has been made available.

> DogStatsd is a small server that aggregates your custom app metrics.

Let’s look at monitoring SQL Server Replication using DogStatsd and C#.

DogStatsd runs on port 8125 by default, although you can change this if you would like to. You will be collecting metrics from the same box, so you don’t need to let anyone external see this port. You can configure the port in your datadog.conf file:

```
<pre class="prettyprint lang-yaml"># ========================================================================== #
# DogStatsd configuration                                                    #
# ========================================================================== #

dogstatsd_port : 8125
```
It is best to run DataDog locally (pointing at a development organisation) to develop against the DogStatsd API.

Next, start up a Windows Service project and add the [C# client library for DogStatsd using NuGet](https://www.nuget.org/packages/DogStatsD-CSharp-Client/), which is [also available on GitHub](https://github.com/DataDog/dogstatsd-csharp-client).

Everything in this library is static, so you need to make sure you configure it before you use it. The prefix in the configuration shown below will group your custom stats – this is usually an indication of the kind of metrics you are collecting, for example “iis” in “iis.net.num\_connections”. You might choose to use your organisation name for custom metrics you create.

```
<pre class="prettyprint lang-csharp">var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
    Prefix = "sqlservercustom"
};

DogStatsd.Configure(dogstatsdConfig);
```
Now we can run the replication monitoring stored procedure to get hold of the interesting numbers. The query to run is:

```
<pre class="prettyprint lang-sql">USE distribution

EXEC sp_replmonitorhelppublication
```
The information I am interested in here includes…

- The number of subscribers
- The time since the last distribution sync
- The replication statuc
- The replication warning status

I will turn each of these values into a “gauge”. The gauge metric type keeps tabs on a value over time, for example “how much coffee is in my cup” would collect the current amount of coffee each time the metric is collected. This is perfect for keeping tabs on the current number of replication subscribers over time, for example. Using a gauge is as simple as supplying a name and a value. All values are essentially doubles as far as the metrics are concerned:

```
<pre class="prettyprint lang-csharp">DogStatsd.Gauge("somename.here", 1);
```
So here is the code for sending the stats to DogStatsd, which is called using a timer in the Windows Service.

```
<pre class="prettyprint lang-csharp">const string query = @"
USE distribution

EXEC sp_replmonitorhelppublication";

using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["MyReplicationPublisher"].ConnectionString))
using (SqlCommand command = new SqlCommand(query, connection))
{
    bool publicationFound = false;

    connection.Open();

    var reader = command.ExecuteReader();

    if (reader.HasRows)
    {
        var publication = "PublicationName";

        while (reader.Read())
        {
            if (reader.GetString(reader.GetOrdinal("publication")) == publication)
            {
                publicationFound = true;

                int subscriptionCount = GetIntFromReader(reader, "subscriptioncount");
                DogStatsd.Gauge("replication.subcribers", subscriptionCount);

                double timeSinceDistributionSync = (DateTime.UtcNow - GetDateFromReader(reader, "last_distsync")).TotalSeconds;
                DogStatsd.Gauge("replication.time_since_dist_sync", timeSinceDistributionSync);

                int status = GetIntFromReader(reader, "status");
                DogStatsd.Gauge("replication.status", status);

                int warning = GetIntFromReader(reader, "warning");
                DogStatsd.Gauge("replication.warning", warning);
            }
        }
    }

    connection.Close();

    if (!publicationFound)
    {
        MessageLogger.LogWarning("Monitoring asked to monitor replication, but publication not found.");
        DogStatsd.Gauge("replication.subcribers", 0);
        DogStatsd.Gauge("replication.status", 6);
    }
}
```
In this code, if I get no stats back it means replication has been accidentally switched off – or “disaster”. I am setting the subscribers to zero and the status to 6 (error) in this case. In all other cases, I’m reporting back the numbers for the subscription.

I am using a couple of hard-coded values and a some little helper methods in the example above for brevity, the helper methods are shown below for completeness – but you can do better than this in production code!

```
<pre class="prettyprint lang-csharp">private int GetIntFromReader(IDataReader reader, string key)
{
    var ordinal = reader.GetOrdinal(key);

    if (reader.IsDBNull(ordinal))
    {
        return 0;
    }

    return reader.GetInt32(ordinal);
}


private DateTime GetDateFromReader(IDataReader reader, string key)
{
    var ordinal = reader.GetOrdinal(key);

    if (reader.IsDBNull(ordinal))
    {
        return DateTime.MinValue;
    }

    return reader.GetDateTime(ordinal);
}
```
I can add monitors in DataDog to catch when the replication status goes above 4, or when warnings go above zero, or if the number of subscribers drops, or if the distribution sync time goes outside of 60 seconds.