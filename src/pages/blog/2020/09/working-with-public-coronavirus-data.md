---
layout: src/layouts/Default.astro
navMenu: false
title: 'Working with public Coronavirus data'
pubDate: 2020-09-21T10:14:50+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2020/09/prediction-vs-recorded-cases.png
categories:
    - Opinion
tags:
    - data
---

The UK Government provides public datasets that can be used by the media or the public. One such dataset contains [information collected for the Coronavirus pandemic](https://coronavirus.data.gov.uk/) and its impact on people living and working in the UK. The problem with this dataset, though, is that we weren’t able to record the data until *after* the pandemic had got into full swing. Some examples of factors that defeat those trying to understand the data are below…

There was no actual testing system in place in March, which means cases being under-reported until a fully functional testing system was put in place. Even when the testing system was up and running, it reached capactity in some areas in September 2020, which will mean under-reporting of cases mid-way through the data set. In between, when there was a fully working test system, we would have been receiving reasonable data (the testing process itself is not 100% accurate, but we can expect the numbers to provide a good indication of the state of affairs when the system is in place and working).

Cases has been the go-to metric for reporting on Coronavirus, but I think this could be a mistake, given the massive problems with the collection of the data for cases. With this in mind, I have examined the other data that is available and made an effort to construct a model based on a more reliable measurement for how the situation has developed. A reliable metric needs to be one that is likely to have reported reasonable numbers throughout the March – September 2020 date range. One that is not affected by time slices with no testing, or limited testing. From this, we can examine the relationship between cases and our new metric to see if it provides a model for predicting the number cases during the periods it couldn’t be collected.

### Headline numbers

Approximately 7% of cases result in a hospital admission.

There were 8x more cases at the peak in March 2020 than were recorded.

The actual number of cases in March 2020 based on the predictive model is ~50,000 cases (the number recorded at the time was ~6,000).

### Stable metric – hospital admissions

The measurement I have selected is hospital admissions. This metric is not dependent on self-reporting or the availability of testing. We can theorise that there is a strong relationship between the number of cases and the number of patients admitted to hospital. Using the data from the public dataset, we can construct the following chart.

[![Original Coronavirus Data](/img/2020/09/original-coronavirus-data.jpg)](/2020/09/working-with-public-coronavirus-data/original-coronavirus-data/)

The main suspect area in this cart appears on the left-hand side, where the number of hospital admissions seems high compared to the number of cases. There is a secondary suspect area on the right, where the media reported that the availability of tests was limited.

### Building a model

If we take the data “in the middle”, where we know there was a testing system in place (but before the tests started to run out), we can create the following chart based on a relationship between hospital admissions and cases.

[![Coronavirus Adjusted Model](/img/2020/09/coronavirus-adjusted-cases-model.jpg)](/2020/09/working-with-public-coronavirus-data/coronavirus-adjusted-cases-model/)

The model suggests that the number of cases during the peak of the pandemic may have been in the region of 50,000 cases per day. This is significantly higher – in fact, so much higher we need to remain sceptical about the model. Let’s test the model on recent numbers.

[![Model Prediction August/September](/img/2020/09/coronavirus-predicted-numbers.jpg)](/2020/09/working-with-public-coronavirus-data/coronavirus-predicted-numbers/)

And now lets look at the reported numbers for the same period.

[![Coronavirus Reported Number August/September](/img/2020/09/coronavirus-actual-numbers.jpg)](/2020/09/working-with-public-coronavirus-data/coronavirus-actual-numbers/)

The model isn’t too far out from the reported numbers. The reality is likely to be in the same zone – in all probability, higher than being reported of the past week by some fifteen to twenty-five percent.

### Early case Reporting likely to be wrong

Based on these numbers, the current number of cases isn’t as high in relative terms as it appears in official charts. That’s not to say the numbers are not concerning as they are going up, which we know is not a linear process. The under-reporting in March/April is likely to have resulted in a big hole in the cases dataset. That means our understanding of the spread of Coronavirus, as based on the early data, is likely to be wrong. What we can do is track a more reliable metric, although we also need to understand that they may suffer from more lag than cases (cases are likely to be reported closer to an individual first being ill, with hospitalisation happening days later).

The model that we have scratched together might not be perfect, what we can infer is that the cases were massively under-reported in March… how wide the “error bar” needs to be is unclear as much of the reporting of ratios is based on the same data we are questioning in this article. We are also working our way from quite a small number (250 a day in a population of 60 million), which means being one-or-two out at this level makes a big difference to the number of cases we can infer.

In the US, the case rates were 5x the hospitalisation numbers. The model in this article finds a somewhat larger gap (more like 14x) – but please remember this is just one way to examine the relationship between the numbers. The relationship we are basing this on seems a likely one, but that’s not proven by the above analysis. It is, of course, possible that the number of cases in the US is being under-reported.

And finally, please don’t walk away from this post thinking “oh well, that’s okay then!” The ability of the epidemic to spread will take us by surprise if we don’t keep a careful watch on the spread of the virus. In the UK the rates are doubling each week, which means the graph will “hockey stick” upwards if we can’t get things under control fast. If you can stay away from other people, limit that contact, and stop the spread – you are going to save real lives.

### Updates

Here is the hospital admissions data up to 29th December 2020. This is the data being used to refine the model and arrive and the prediction of cases being approximately 14x the number of admissions.

[![Recorded Hospital Admissions](/img/2020/09/recorded-hospital-admissions.png)](/2020/09/working-with-public-coronavirus-data/recorded-hospital-admissions/)

I have updated the model and predictions as of 29th December 2020 to fine tune the multiplier, which is settling neatly around the number of cases being 14x the number of hospital admissions. Or to put it another way, around 7% of cases result in hospitalisation. The distribution of actual hospitalisation rates per day shows a high concentration at 6% and 7%.

[![Distribution of actual hospital admissions as a % of cases](/img/2020/09/hospital-admission-percentage-of-cases-distribution.png)](/2020/09/working-with-public-coronavirus-data/hospital-admission-percentage-of-cases-distribution/)

Based on the 14x cases to admissions, we can see how this compares to the actual numbers. As you’d expect, hospital admissions are a lagging indicator, as people tend to become a case some days before they are admitted to hospital. The right-hand of this chart shows the recent numbers.

We can then look back to the previous periods to predict how many cases there were during the first peak, even though it wasn’t possibly to measure the number of cases at the time. Perhaps we should call this “predicted vs recorded” as the recorded numbers are less likely to be the *actual* numbers than the predicted ones.

[![Predicted Cases vs Recorded Cases Comparison](/img/2020/09/prediction-vs-recorded-cases.png)](/2020/09/working-with-public-coronavirus-data/prediction-vs-recorded-cases/)

We can revisit this 14x multiplier with new data as it emerges to confirm, adjust, or destroy the model. It looks like the uppermost spike was around 50,000 cases per day.