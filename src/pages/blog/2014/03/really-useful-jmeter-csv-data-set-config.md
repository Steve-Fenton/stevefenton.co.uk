---
layout: src/layouts/Default.astro
title: 'Really useful JMeter CSV data set config'
navMenu: false
pubDate: 2014-03-14T22:33:06+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - csv
    - JMeter
---

I wrote an article recently about the [parameterized Controller plugin](/blog/2014/03/blog/really-useful-jmeter-plugins-parameterized-controller/) for JMeter. Today I’m going to present an even more flexible way to run different sets of data through the same test.

The JMeter CSV Data Set Config node allows you to attach a set of data to a thread group or controller in order for different parameters to be used for each thread or in each iteration of a loop.

For example, if you set it up with sequential numbers starting from one, you would see the first thread uses 1, the second thread 2, the third 3 and so on. If you also had loops configured on the thread group, they would also cause the next number to be picked out.

To use the CSV Data Set Config node, you’ll need some data. Here is an example of some data. For example in *ApiCrawler\_Scripts.csv*:

```
Age,Language,Cash
24,en-gb,200.34
36,fr,123.30
52,en-us,213.20
```

The first row contains the column titles, then each row is a set of data. It is important to note that if you are using standard CSV format you need to make sure you don’t add spaces.

Now you can add your CSV Data Set Config element.

:::div{.inset}
:img{src="/img/2015/07/jmeter-csv-data-set.png" alt="JMeter CSV Data Set" loading="lazy"}
:::

The filename is the path to the CSV file – in this case it is in the same folder as the JMX file. All of the other fields have been left at their default values – the “Recycle” option means if you loop many times and it runs out of rows it will jump to the top and carry on – you can opt to stop threads when the data runs out if this suits your purpose. Because the variable names are in the first line of the file, we leave the variable names field blank.

Any variables obtained from the CSV file act just like user variables. You can use them wherever you like using the normal dollar-with-curly-braces syntax, for example:

```
Age is ${Age}
${Language}
${Cash}
```