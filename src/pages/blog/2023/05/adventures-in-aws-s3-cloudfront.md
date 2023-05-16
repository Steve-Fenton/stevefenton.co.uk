---
layout: src/layouts/Default.astro
title: 'Adventures in AWS with S3 static websites and Cloudfront'
navMenu: false
pubDate: 2023-05-16
keywords: cloud,aws,s3,static websites,cloudfront
description: Some field notes on running a static website on AWS S3 behind Cloudfront.
bannerImage:
    src: /img/topic/aws/aws-logo.jpg
    alt: The Amazon Web Services logo, aws with a smile arrow beneath
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - AWS
    - Cloudfront
---

Here are my field notes on hosting a static website on AWS, using S3 and Cloudfront.

## The whole landscape

Here's the setup, end to end.

The deployment pipeline...

- [Astro](https://astro.build) as the static site generator
- GitHub for the source code
- GitHub actions to build and test
- Octopus as the package source and deployment tool

The infrastructure...

There's a staging set up and a production set up of:

- AWS S3 bucket for all the files
- AWS S3 static website hosting enabled (bucket hosting)
- Cloudfront distribution
- Azure Front Door (because this microsite is part of a larger website and runs in a subfolder of the domain)

## S3 bucket

It's just a bucket filled with web pages and static resources used on the website.

The only configuration here is to enable static website hosting:

1. Navigate to S3
2. Select the S3 bucket
3. Open the **Properties** tab
4. Scroll down to **Static website hosting**
5. Hit **Edit**

Select the following settings:

- Static website hosting: Enable
- Hosting type: Host a static website
- Index document: index.html
- Hit **Save Changes**

The url for the site will now be shown in the **Static website hosting** properties panel. You can open this and see how things are looking.

The website won't be secure at this point. This is where Cloudfront comes in.

## Cloudfront

Cloudfront is going to perform a number of tasks.

- Secure the site with a certificate (absolutely required for Azure Front Door to front it, kinda expected by all your visitors anyhow)
- Cache stuff
- Fiddle with requests and responses

### Cloudfront behaviours

To edit the cache rules:

1. Open the Cloudfront distribution
2. Select the **Behaviors** tab
3. If there is no behavior listed, select **Create behavior**, otherwise select the behavior and hit **Edit**

Configure the behaviour, mostly the defaults are good:

- Compress objects automatically: Yes
- Cache policy: CachingOptimized (or in my case, I created a custom cache policy)
- Function associations: More on this later, but we're going to use these!
- Hit **Save changes**

## Cloudfront error pages

It's best to set up error pages here to handle things like 404 errors. You *can* set up error pages in S3, but doing it higher up the stack is better.

The simplest way to do this is to create an `/error/index.html` page (or several if you want to handle different errors with different messages) and then set it up in Cloudfront.

1. Open the Cloudfront distribution
2. Select the **Error pages** tab
3. Hit **Create custom error response**
4. HTTP error code: 404: Not Found
5. Error caching minimum TTL: 10
6. Customize error response: Yes
7. Response page path: `/error/`
8. HTTP Response code: 404 (maintain the correct status code)
9. Hit **Save changes**

## Cloudfront functions - Response Headers

If you run security scanning on your site, you'll probably get recommendations to adjust your headers.

1. Open Cloudfront Functions
2. Hit **Create function**
3. Name it "ResponseHeaders" 
4. In the **Build** tab, enter the function code, example below

```javascript
function handler(event) {
    var response = event.response;
    var headers = response.headers;

    // Set HTTP security headers
    headers['x-content-type-options'] = { value: 'nosniff'}; 
    headers['x-frame-options'] = {value: 'SAMEORIGIN'};
    headers['strict-transport-security'] = { value: 'max-age=63072000; preload' }
    headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' }

    // Return the response to viewers 
    return response;
}
```

Hit **Save changes**

You need to test your function before you publish it. To do this:

1. Open the **Test** tab
2. Event type: Viewer response
3. URL path: Enter any page on your site
4. Click **Save** to remember your test setup (thank me later)
5. Hit **Test function**
6. Scroll down to see the execution result, hopefully it's green text

The most common error at the test stage (other than your code being broken) is selecting the wrong event type. For this function, make sure you selected **Viewer response** (step 2 above).

You can now publish your function.

1. Open the **Publish** tab
2. Hit **Publish function**

You can publish the function each time you make a change. The same function can be used for many different Cloudfront distributions, so you don't need to create lots of copies.

See further down for associating functions to distributions.

## Cloudfront functions - Remove Trailing Slash

By default, AWS will force a trailing slash on your site. This is usually the right answer. If you are migrating a site that didn't have trailing slashes and want to keep it consistent, you'll need to create a function to help.

1. Open Cloudfront Functions
2. Hit **Create function**
3. Name it "RemoveTrailingSlash"
4. In the **Build** tab, enter the function code, example below

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    var params = '';
    if(('querystring' in request) && (request.querystring.length > 0)) {
        params = '?'+request.querystring;
    }
    
    if(uri.endsWith('/')) {
        if(uri !== '/') {
            var response = {
                statusCode: 301,
                statusDescription: 'Permanently moved',
                headers:
                { "location": { "value": `${uri.slice(0, -1) + params}` } } // remove trailing slash
            }
    
            return response;    
        }
    }
    //Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }

    return request;
}
```

Hit **Save changes**

:::div{.note}
This code was written by [Martin Hicks](https://github.com/hicksy) see the convo on [GitHub](https://github.com/sinovi/lambda-edge-remove-trailing-slash/issues/3).
:::

You need to test your function before you publish it. To do this:

1. Open the **Test** tab
2. Event type: Viewer request
3. URL path: Enter any page on your site
4. Click **Save** to remember your test setup (thank me later)
5. Hit **Test function**
6. Scroll down to see the execution result, hopefully it's green text

The most common error at the test stage is selecting the wrong event type. For this function, make sure you selected **Viewer request** (step 2 above).

You can now publish your function.

1. Open the **Publish** tab
2. Hit **Publish function**

## Cloudfront function associations

Function associations join up your functions to events on a distribution. You can link one function to many distributions.

1. Open Cloudfront functions
2. Select the function to associate
3. Open the **Publish** tab
4. Under the **Associated distributions** tab, choose **Add association**

Enter the following details:

- Distrubution: Select the distribution from the list
- Event type: Choose the correct event type - it's the one you tested
- Cache behavior: Choose from the list. This means the result is cached, just like you would cache a page or image (and therefore runs the function less often)
- Hit **Add association**

You can repeat this process for each distribution you want to link to the function.

After changing associations, I recommend running an invaliation...

## Cloudfront invalidations

When you change a function, association, or some other cached item, you'll need to invalidate the cache. You pay per invalidation (with a free allowance). The cheapest strategy is to invalidate everything in one pop, rather than specifically invalidating loads of individual items.

1. Open the Cloudfront distribution
2. Select the **Invalidations** tab
3. Hit **Create invalidation**
4. Enter the object path `/*` (everything)
5. Hit **Create invalidation**

You'll have a spinner running for a while until the invalidation is complete. Then you should be able to see your changes.

## Summary

This is the setup required to get things running in a sensible way on AWS using S3 and Cloudfront.