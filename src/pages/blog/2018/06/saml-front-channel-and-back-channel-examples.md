---
layout: src/layouts/Default.astro
title: 'SAML front channel and back channel examples'
navMenu: false
pubDate: 2018-06-20T07:00:26+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SAML
---

:abbr[SAML]{title="Security Assertion Markup Language"} is a mechanism authenticating users and authorising them for a service in cases where the identify provider is external to the service. There are three parties involved:

- User (or User Agent, such as a web browser) – UA
- Service Provider – SP
- Identity Provider – IdP

The user agent interacts with both the Service Provider and an Identity Provider to negotiate access to a resource.

The basic mechanism is pretty simple; but it sometimes helps to overlay the sequence with some realistic resource addresses. Things make more sense with concrete examples.

## Front-channel SAML

Front-channel SAML is performed in full view of the user agent. The UA follows instructions to perform an exchange of information. It is the user agent that passes the data between the other parties, as shown below:

:::div{.inset}
:img{src="/img/2018/06/SAML-front-channel-overview.png" alt="SAML Front Channel Overview" loading="lazy"}
:::

The two unspecified parts of this diagram are the exact mechanisms for:

- Deciding which IdP to use. This could be as simple as the user selecting the logo of their preferred identity provider.
- The mechanism the IdP uses to authenticate the user. This can be username and password, bio-metric, two-factor, or whatever else the identity provider decides.

The two mechanisms for communication are HTTP redirects, and form POSTs. The HTTP redirect sends the user to the identity provider with a SAML request in the query string. The form POST returns them to the service provider with a SAML assertion. Once this process has completed successfully, there is a further HTTP redirect to send the user to the resource they originally requested.

Let’s re-paint the overview with some imaginary addresses:

:::div{.inset}
:img{src="/img/2018/06/SAML-front-channel-example.png" alt="SAML Front Channel Example" loading="lazy"}
:::

Although the contents of the SAML request and assertion form are omitted, this picture is a bit easier to follow.

## Back-channel SAML

The key difference with back-channel SAML is additional direct communication between the service provider and identity provider. Typically, the identity provider won’t send the full assertion to the user agent in the form. Instead, it supplies a reference to the assertion. The service provider will use this reference to request the assertion directly from the identity provider.

Because the back-channel can be secured, and because the assertion is not visible to the user agent, this makes things more secure.

:::div{.inset}
:img{src="/img/2018/06/SAML-back-channel-overview.png" alt="SAML Back Channel Overview" loading="lazy"}
:::

Let’s overlay the back-channel sequence with the sample addresses:

:::div{.inset}
:img{src="/img/2018/06/SAML-back-channel-example.png" alt="SAML Back Channel Example" loading="lazy"}
:::

## Options

There are several competing mechanisms that do *similar* things to this. Notably OAuth and OpenId. In many cases, all of these options can be used together, or combined!