---
layout: src/layouts/Default.astro
title: Easy API testing with REST Client extension for Visual Studio Code
navMenu: false
pubDate: 2020-03-16T19:02:17+00:00
authors:
    - steve-fenton
bannerImage:
    src: /i/x/2020/03/vscode-rest-client.jpg
    alt: The REST Client extension
categories:
    - Programming
tags:
    - 'api testing'
    - rest
    - restclient
    - testing
---

Visual Studio Code is becoming my go-to tool for automating stuff. It’s lightweight, it’s a joy to use, and it seems to be able to do pretty much everything ever thanks to a vibrant plugin marketplace. If you test APIs, you might be using an API testing tool of some kind, such as Postman. With Visual Studio Code, though, you can do some really nice API testing with simple text files using the REST Client extension.

Once you install the [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), you just open a file (you can call it `sample.http`) and type a simple request:

```
GET https://www.example.com/ HTTP 1.1
```
The extension will add a “Send Request” option above the request. When you click this, it will send the request and show you the response in another editor pane.

:img{src="/img/2020/03/vscode-rest-client.jpg" alt="VSCode REST Client" loading="lazy"}

This is super-simple. The file is readable and can easily be shared with your team. You can also save the full response, or the response body into a file.

## More complex example

Let’s look at a more complex example so we can see variables, extracting variables from the response, and chained requests.

Variables can be declared using `@variable = value`. You can define these and re-use them throughout your file.

You can also pull values from the responses to store in a variable, as long as you name the request. You name the request using the special comment `# @name = myrequest` before the request. You can then use this name to read back values, for example `@token = {{myrequest.response.body.access_token}}`.

Finally, you can chain requests by separating them with `###`.

Let’s put it all together in order to get an auth token from an API and use it to query some values.

```
@user = SuperTed
@password = SecretMagicWord
@pageSize = 10

# @name login
POST https://www.example.com/api/cosmicdust/oauth/token HTTP/1.1
content-type: application/x-www-form-urlencoded
Authorization: Basic apiuser:apipassword

grant_type=password
&username={{user}}
&password={{password}}

@token = {{login.response.body.access_token}}

###

GET https://www.example.com/api/cosmicdust/episodes?limit={{pageSize}}&page=1 HTTP/1.1
Authorization: Bearer {{token}}
```

We start off creating some variables for the values that will change frequently. That way they are at the top of the file and we won’t accidentally ruin a request with a bad edit.

Then we name our login request, using `# @name login`.

We make our POST to the login API, padding content-type and authorization headers. The body of the request follows (and should match the content type you said you would give).

Then we pull the access token out of the response and store it in a variable.

The `###` separates our requests, then we make the next request using the token we kept hold of. The UI will underline this when you haven’t yet obtained an access token to remind you to get it first.

## Summary

The best thing about the REST Client extension is that you can easily see all of the request configuration and you can share it (without the sensitive parts) easily with your team, for example via source control.

Go and [grab the extension from the marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).