---
layout: src/layouts/Default.astro
navMenu: false
title: 'SAML front channel and back channel examples'
pubDate: 2018-06-20T07:00:26+01:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";N;s:10:"author_url";N;s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";N;s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";N;}'
categories:
    - Programming
tags:
    - SAML
---

<abbr title="Security Assertion Markup Language">SAML</abbr> is a mechanism authenticating users and authorising them for a service in cases where the identify provider is external to the service. There are three parties involved:

- User (or User Agent, such as a web browser) – UA
- Service Provider – SP
- Identity Provider – IdP

The user agent interacts with both the Service Provider and an Identity Provider to negotiate access to a resource.

The basic mechanism is pretty simple; but it sometimes helps to overlay the sequence with some realistic resource addresses. Things make more sense with concrete examples.

### Front-channel SAML

Front-channel SAML is performed in full view of the user agent. The UA follows instructions to perform an exchange of information. It is the user agent that passes the data between the other parties, as shown below:

![SAML Front Channel Overview](/img/2018/06/SAML-front-channel-overview.png)

The two unspecified parts of this diagram are the exact mechanisms for:

- Deciding which IdP to use. This could be as simple as the user selecting the logo of their preferred identity provider.
- The mechanism the IdP uses to authenticate the user. This can be username and password, bio-metric, two-factor, or whatever else the identity provider decides.

The two mechanisms for communication are HTTP redirects, and form POSTs. The HTTP redirect sends the user to the identity provider with a SAML request in the query string. The form POST returns them to the service provider with a SAML assertion. Once this process has completed successfully, there is a further HTTP redirect to send the user to the resource they originally requested.

Let’s re-paint the overview with some imaginary addresses:

![SAML Front Channel Example](/img/2018/06/SAML-front-channel-example.png)

Although the contents of the SAML request and assertion form are omitted, this picture is a bit easier to follow.

### Back-channel SAML

The key difference with back-channel SAML is additional direct communication between the service provider and identity provider. Typically, the identity provider won’t send the full assertion to the user agent in the form. Instead, it supplies a reference to the assertion. The service provider will use this reference to request the assertion directly from the identity provider.

Because the back-channel can be secured, and because the assertion is not visible to the user agent, this makes things more secure.

![SAML Back Channel Overview](/img/2018/06/SAML-back-channel-overview.png)

Let’s overlay the back-channel sequence with the sample addresses:

![SAML Back Channel Example](/img/2018/06/SAML-back-channel-example.png)

### Options

There are several competing mechanisms that do *similar* things to this. Notably OAuth and OpenId. In many cases, all of these options can be used together, or combined!