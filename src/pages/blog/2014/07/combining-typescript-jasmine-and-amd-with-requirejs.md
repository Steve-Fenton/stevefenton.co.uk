---
title: 'Combining TypeScript, Jasmine, and AMD with RequireJS'
navMenu: false
pubDate: 2014-07-25T21:31:49+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - AMD
    - Jasmine
    - RequireJS
    - TypeScript
---

So TypeScript, Jasmine and RequireJS walk into a bar and the barman says “No specs found”. This isn’t funny. Especially when you are trying to get your tests running!

So here is how you get Jasmine 2.x working alongside your TypeScript external modules that you are loading using the AMD pattern, probably using RequireJS.

## The Short Version

If the short version loses you at any point, scroll down to find the long version, which makes less assumptions about what you already know.

The short version is that you find *boot.js*, which is the Jasmine source file that wires everything up for your test page and you find and comment out this line of code:

```typescript
window.onload = function() {
    if (currentWindowOnload) {
        currentWindowOnload();
    }
    htmlReporter.initialize();
    //env.execute();
};
```

Why do this? The problem is that the *window.onload* even will fire before you have managed to asynchronously load up all of your scripts. This means Jasmine will execute, and shortly after it has displayed the message “No specs found” you’ll register a whole bunch of specifications.

So by commenting out this line, you stop Jasmine from going off before you are ready.

Of course, you’ve actually stopped Jasmine from going off at all, so now it is your responsibility to add the following line of code within your TypeScript program… usually at the end of your *app.ts* file (or whatever file you have added to the data-main attribute when using RequireJS):

```typescript
// Hai Jasmine - ready to go!
jasmine.getEnv().execute();
```

This will then tell Jasmine you are ready and will execute your tests.

## The Long Version

If you got up and running with the short version, you may close your browser now! If not – here is a more step-by-step version that talks you through the whole set up, from start to finish.

If you are using Jasmine (version 2.x) everything starts with *SpecRunner.html*.

```html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Specifications</title>
    <link rel="shortcut icon" type="image/png" href="/Scripts/jasmine_favicon.png">
    <link rel="stylesheet" type="text/css" href="/Scripts/jasmine.css">
    <script src="/Scripts/jasmine.js"></script>
    <script src="/Scripts/jasmine-html.js"></script>
    <script src="/Scripts/boot.js"></script>
    <!-- Now your TypeScript program... -->
    <script src="/Scripts/require.js" data-main="app"></script>
</head>
<body>
</body>
</html>
```
#
As you can see, the Jasmine files (*jasmine.js*, *jasmine-html.js* and *boot.js*) are not loaded using AMD / RequireJS. The interesting bit of code is the final script tag, which points to RequireJS. The *data-main* attribute should be the name of your main specification file. In my case, *app.ts* contains the entry point for all of the specifications (although the specifications themselves are in other files, which *app.ts* includes).

There is one small tweak to be made to the *boot.js* file, which is to comment out the following line:

```javascript
window.onload = function() {
    if (currentWindowOnload) {
        currentWindowOnload();
    }
    htmlReporter.initialize();
    //env.execute();
};
```

If the *env.execute()* line of code is left in, Jasmine will run too early. This is because your modules will be loaded asynchronously and are likely to load after this line of code has executed. Only specifications registered before this line of code will run – and yours will be registered after this line when your script file eventually downloads and runs. So by commenting out this line, you give your specifications time to load and be registered.

To tell Jasmine when you are ready, you need to call this execute method later. For example, here is the call at the end of the *app.ts* file (my main file).

```typescript
import ajaxTests = require('./Tests/MyTests');

ajaxTests.run();

// Hai Jasmine - ready to go!
jasmine.getEnv().execute();
```

Let’s run through this file out loud in some patronising bullet points!

1. This file only runs once it has loaded asynchronously (RequireJS does that for us)
2. The first line of code is an import statement, no code after this line will run until this file is loaded (also asynchronous)
3. Once “MyTests” have loaded, the tests are run by calling *ajaxTests.run()* – this registers the tests with Jasmine
4. Finally, now all the tests are registered, we call Jasmine’s execute method (the one we removed from boot.js)

Inside of *MyTests.ts* I have simply arranged the usual Jasmine specification inside of a function named run, like this:

```typescript
import Ajax = require('../Ajax');
export var run = () => {
    describe('Ajax', () => {
        it('gets a 200 response to a httpGet to a good address', (done) => {
            var ok = (response: XMLHttpRequest) => {
                expect(response.status).toBe(200);
                expect(response.responseText).toBe("{ value: 'Some data from a text file.' }");
                done();
            };
            var fail = (response: XMLHttpRequest) => {
                expect(response.status).toBe(200);
                done();
            };
            Ajax.httpGet('/test.txt', ok, fail);
        });
        it('gets a 404 response to a httpGet to a bad address', (done) => {
            var ok = (response: XMLHttpRequest) => {
                expect(response.status).toBe(404);
                done();
            };
            var fail = (response: XMLHttpRequest) => {
                expect(response.status).toBe(404);
                done();
            };
            Ajax.httpGet('/badaddress.txt', ok, fail);
        });
    });
};
```

Once again, you’ll notice that I’m running some Ajax tests here, which are also asynchronous! I am using the Jasmine done method to ensure each test completes only when the request is complete.

So there we have it – a whole bunch of asynchrony, a combination of TypeScript, Jasmine, AMD (using RequireJS) and it all works. Cracking.