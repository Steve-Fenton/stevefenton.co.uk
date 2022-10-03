---
layout: src/layouts/Default.astro
navMenu: false
title: 'Custom output from TypeSpec'
pubDate: 2015-12-08T06:00:56+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - BDD
    - TypeScript
    - TypeSpec
---

In TypeSpec, events are raised during a test run that can be intercepted by a test reporter.

TypeSpec has a built-in test reporter that logs a whole bunch of information to the console. It also has a test reporter for TAP output. When these options don’t offer what you need, you can write your own custom test reporter.

The example custom test reporter below places the output into an HTML page, logs informational items to the console, and raises an alert when the run has completed. You can extend the TestReporter class and override as many of the four methods as you like.

```
<pre class="prettyprint lang-typescript">import {TestReporter} from './TypeSpec/TypeSpec';

export class CustomTestReporter extends TestReporter {
    summary(featureTitle: string, scenarioTitle: string, isSuccess: boolean) {
        var div = document.createElement('li');
        div.className = (isSuccess ? 'good' : 'bad');
        div.innerHTML = this.escape((isSuccess ? '✔' : '✘') + ' ' + featureTitle + '. ' + scenarioTitle + '.');
        document.getElementById('results').appendChild(div);
    }

    error(featureTitle: string, condition: string, error: Error) {
        var div = document.createElement('div');
        div.innerHTML = '<h2>' + featureTitle + '</h2><blockquote>' + this.escape(condition) + '</blockquote><pre class="bad">' + this.escape(error.message) + '&gt;/pre>';
        document.getElementById('errors').appendChild(div);
    }

    information(message: string) {
        console.log(message);
    }

    complete() {
        alert('Run has finished');
    }
}
```
To use the custom test reporter, pass it in when you instantiate the SpecRunner.

```
<pre class="prettyprint lang-typescript">var runner = new SpecRunner(new CustomTestReporter());
```
The result of this custom test reporter is shown below:

![TypeSpec Browser Ouput](/img/2015/11/typespec-browser-output.png)