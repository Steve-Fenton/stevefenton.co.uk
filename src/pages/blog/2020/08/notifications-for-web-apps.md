---
layout: src/layouts/Default.astro
title: Notifications for web apps
navMenu: false
pubDate: 2020-08-05T06:00:10+01:00
authors:
    - steve-fenton
image: /wp-content/uploads/2020/08/web-notification.jpg
categories:
    - Programming
tags:
    - javascript
---

Although it has been abused with an enthusiasm that borders on the insane, there are good reasons to use the [Notifications API](https://notifications.spec.whatwg.org/) in your web apps. For example, you write a mail client that allows the user to request notifications for key contacts… if they are browsing your web-based app, they should get notifications.

To pop a notification, we need to do two things. First, we ask permissions. Second, if we have permission we show a message.

In my opinion, the best time to ask permission is when you want to pop the first message. When you ask way in advance, it feels creepy. For example, when I browse an article on your blog and I get asked for permission to pop notifications as soon as the page loads; that’s creepy.

So, we’ll call out to a `tryNotify` function when we want to pop a notification and it will handle getting permission if it needs to. If it has the green light, it will call the `showNotification` function.

The key components within the function are:

1. Checking that the browser supports `Notification` as a feature
2. Using `Notification.permission` to see if permission has been `'granted'` (it can also be default, which means not yet set, or rejected)
3. Calling `Notification.requestPermission()` to ask nicely for the user’s go-ahead
4. Creating a `new Notification` to show the message… we can use this handle to add click events or track the status of the notification later

Here is a hastily written example that works. You can make this cleaner, but I’ve optimised for comprehension within a blog post where you won’t be navigating easily between lots of functions if I split it up.

```javascript
// This is the function you call when you want to notify a user
function tryNotify(title, message, link) {

    // Does the notification feature exist?
    if (window.Notification) {

        // If we have permission, let's just show the notification
        if (Notification.permission === 'granted') {
            showNotification(title, message, link);
            return;
        }

        // If the permissions haven't yet been set, let's ask for the user's consent
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(function (permission) {
                if (permission === 'granted') {
                    showNotification(title, message, link);
                } else {
                    console.log('Notifications have been rejected!', title, message, link);
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

// This function should only be called by the tryNotify function
function showNotification(title, message, link) {

    // Create the notification with a title, body, and icon
    // The options object with body and icon is optional, but recommended (by me)
    const notify = new Notification(title, {
        body: message,
        icon: 'path-to-icon.png'
    });

    // What to do if the user clicks the notification
    if (link) {
        notify.onclick = function () {
            window.open(link, '_blank');
        }
    }
}
```

:img{src="/img/2020/08/web-notification.jpg" alt="Web Notification" loading="lazy"}

The notifications feature is [reasonably well supported](https://caniuse.com/#feat=notifications) on desktop and even has some support on mobile. In any case, you should be design robustly as if it’s not there in case either (a) you don’t have the user’s consent for notifications, or (b) they have disabled notifications at the operating system level (i.e. you can disable all notifications on Windows).