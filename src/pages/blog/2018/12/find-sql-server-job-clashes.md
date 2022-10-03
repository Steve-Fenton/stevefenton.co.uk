---
layout: src/layouts/Default.astro
navMenu: false
title: 'Find SQL Server job clashes'
pubDate: 2018-12-27T20:00:43+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

If you are working on an older application that has a lot of logic inside of the SQL database in jobs, procedures, and functions – you may find that your job schedules cause a repeating wave of SQL compilation peaks. If you suspect jobs may be the cause, you can use a query to find SQL server job clashes.

![Repeating Wave of Peaks](/img/2018/12/five-minute-query-spike.png)

The query just looks into the job schedules to inspect the next run time to tell you *at the current moment* what the next clashes will be.

```
<pre class="prettyprint lang-sql">
SELECT 
    SCHED.next_run_date AS NextRunDate,
    SCHED.next_run_time AS NextRunTime,
    COUNT(JOB.job_id) AS JobCount
FROM
    msdb.dbo.sysjobs AS JOB
LEFT JOIN
    msdb.[dbo].[sysjobschedules] AS SCHED ON JOB.job_id = SCHED.job_id
WHERE
    JOB.[enabled] = 1
AND
    SCHED.next_run_date IS NOT NULL
AND
    SCHED.next_run_date > 0
GROUP BY
    SCHED.next_run_date,
    SCHED.next_run_time
HAVING COUNT(*) > 1
ORDER BY
    SCHED.next_run_date,
    SCHED.next_run_time
```
This will group the jobs by next run time and let you know how many are starting at once. It discards jobs without a next run time and only shows times where more than one job will start. This will allow you to consider replacing your 5, 10, 15, 30, 60 minute schedules with something else, for example a primes-based schedule using 7, 11, 17, 29, and 61 minute intervals.

For example, imagine you have the following jobs set up:

- 10:00 every five minutes
- 10:30 every fifteen minutes
- 11:00 every ten minutes

You will have clashed with up to three concurrent jobs and on many time slots before your lunch.

![Round Number Scheduling of Jobs](/img/2018/12/jobs-round-number-scheduling.png)

If you change the interval to 7, 17, and 11 minutes respectively you get only three clashes, and of only two concurrent jobs. Quite an improvement.

![Jobs With Prime Number Intervals](/img/2018/12/jobs-prime-number-interval.png)

If you need to go further in reducing clashes, you can calculate the start times to be aligned to the scale. This means you lose additional clashes caused by the round-number start times:

- 10:00 every seven minutes
- 10:34 every seventeen minutes
- 11:06 every eleven minutes

![Jobs With Prime Number Schedule and Interval](/img/2018/12/jobs-prime-number-schedule-and-interval.png)

If you are still having trouble, reduce the frequency by increasing the interval (rather than getting even more complicated with numbers!)

Your mileage will vary, because if your jobs run for a terribly long time, it makes it more likely jobs will overlap. You’ll need to add a bit of thinking based on your own context. If your jobs are reasonably fast running when they don’t clash, this works wonders.