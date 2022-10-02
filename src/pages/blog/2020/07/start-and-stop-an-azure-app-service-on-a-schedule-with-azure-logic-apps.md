---
layout: src/layouts/Default.astro
navMenu: false
title: 'Start and stop an Azure App Service on a schedule with Azure Logic Apps'
pubDate: 2020-07-22T19:00:05+01:00
author:
    - steve-fenton
categories:
    - Azure
tags:
    - 'azure app service'
    - 'logic apps'
---

Although starting and stopping a web app doesn’t in itself save you a great deal of cash, in situations where you have Web Jobs running and a serverless database, you can effectively run a “business hours” app at a lower cost if you stop it outside of business hours.

### Start an App Service each week day

To start our App Service, we’ll create an Azure Logic App with a Recurrence scheduler and a Start Web App step.

Let’s add a logic app called “ServiceStartScheduler”.

To trigger the logic app, add a Recurrence trigger. This can be a bit confusing as the only visible options when you start are “Interval” and “Frequency”. We want to trigger our task at a set time each week day, which we will get to shortly. For now, select an interval of 1 and a frequency of “Week”.

[![Recurrence trigger with a 1 week frequency](https://www.stevefenton.co.uk/wp-content/uploads/2020/07/azure-logic-app-step-001.jpg)](https://www.stevefenton.co.uk/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/azure-logic-app-step-001/)

To change this recurrence trigger to fire on specific days at a selected time, use the “Add new parameter” section to add the items “On these days”, “At these hours”, and “At these minutes”.

[![Recurrence trigger with new parameters selected](https://www.stevefenton.co.uk/wp-content/uploads/2020/07/azure-logic-app-step-002.jpg)](https://www.stevefenton.co.uk/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/azure-logic-app-step-002/)

You can now fill in the parameters to set your schedule. You can set it to run on certain days and, in our case, set a specific single time to trigger the action. It is possible to set the task to run multiple times on the selected days, but that’s probably overkill for what we’re doing here.

[![A recurrence trigger for each weekday at 7 AM](https://www.stevefenton.co.uk/wp-content/uploads/2020/07/azure-logic-app-step-003.jpg)](https://www.stevefenton.co.uk/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/azure-logic-app-step-003/)

Now it’s time to add a new step. Search for “Azure App Service” and select the “Start Web App” action.

[![Start Azure App Service Action](https://www.stevefenton.co.uk/wp-content/uploads/2020/07/azure-logic-app-step-004.jpg)](https://www.stevefenton.co.uk/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/azure-logic-app-step-004/)

You might be prompted to sign in for the next step, once you’ve done that use the lists to select the specific App Service you want to start.

[![Select the app service to start](https://www.stevefenton.co.uk/wp-content/uploads/2020/07/azure-logic-app-step-005.jpg)](https://www.stevefenton.co.uk/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/azure-logic-app-step-005/)

Now save the logic app and you are done with the “Start Azure App Service” logic app.

### Stop an App Service Each week day

To stop our App Service, we can simply create an Azure Logic App with a Recurrence scheduler and a Stop Web App Service step.

What’s easier, though, is to clone the one we just made and tweak it. If you view “ServiceStartScheduler” and hit “Clone”, you can enter a new name for a “ServiceStopScheduler”.

Once the operation is complete, visit the new resource and edit it.

Adjust the schedule so it runs at 17:00 each week day.

Delete the “Start web app” step and replace it with a “Stop web app” step instead.

### Testing the Logic App

You don’t have to wait a whole day to test your logic app. Open the “ServiceStopScheduler” and hit “Run” to trigger the task immediately.

[![Run Logic App](https://www.stevefenton.co.uk/wp-content/uploads/2020/07/azure-logic-app-testing.jpg)](https://www.stevefenton.co.uk/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/azure-logic-app-testing/)

You can immediately confirm that the app has in fact stopped by visiting it.

[![Stopped App](https://www.stevefenton.co.uk/wp-content/uploads/2020/07/azure-logic-app-stopped.jpg)](https://www.stevefenton.co.uk/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/azure-logic-app-stopped/)

You can now repeat the process to test the “ServiceStartScheduler”. The app should now be running.

The logic app keeps a history of runs, so you can check in on it to make sure your schedule is working as expected.