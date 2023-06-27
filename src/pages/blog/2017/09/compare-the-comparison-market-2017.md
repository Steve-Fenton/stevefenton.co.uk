---
title: 'Compare the comparison market 2017'
navMenu: false
pubDate: 2017-09-03T18:14:24+01:00
authors:
    - steve-fenton
categories:
    - Other
tags:
    - Comparison
    - Insurance
---

So, I occasionally share my car insurance comparison shenanigans and it’s renewal time once again.

## Compare the Market

Once I logged in, it told me my renewal was coming up, and had automatically incremented things like “number of years you have held your license” and “number of years no claims bonus”. This was a graceful way to start off the process and earned Alexander some bonus points.

## Go Compare

Although many details were remembered, I had to manually increment all the things that are exactly one year out of date. A slight annoyance, especially as I wanted to be certain by double-checking the dates on my license.

## Direct Line

You can’t login until you select a product. Selecting a product takes you to a “selected product splash page” and you have to select “Login” again. Then you land in a new tab on a “Mixed Content Warning” web page, titled “QPM Login Page”. Then you close your browser window, because you don’t enter your security details on a page with mixed content warnings.

## Money Supermarket

I thought my connection had dropped, as the page took a whole minute, before Cloudflare stepped in to say:

```
What happened?

You've requested a page on a website (www.moneysupermarket.co.uk)
that is on the Cloudflare network. Cloudflare is currently unable
to resolve your requested domain (www.moneysupermarket.co.uk).
There are two potential causes of this...
```
A quick search led me to the `.com` domain. So I started afresh there. I did a quick Who Is check to confirm that Money Supermarket own both domains… so maybe they need to check their configuration.

Other than this slight domain name issue, the website was comparable to Compare the Market in terms of ease. Although I didn’t have a remembered quote to start from, it didn’t take long to check the details in.

There was something very janky about the results page, as scrolling down slightly caused a sticky header to pop in, causing a scroll position change… making the top result slide off view.

## Prices

Don’t take this as anything except an indication that you need to “compare the comparison market”… the cheapest site for you will almost certainly be different to the one I got the best price on.

Renewal Prices:

| Site                      | Cheapest Price |
|---------------------------|----------------|
| Money Supermarket         | £256 (-217)    |
| Go Compare                | £269 (-207)    |
| Compare the Market        | £273 (-203)    |
| Direct Line               | DNF (???)      |
| Renewal (Hastings Direct) | £476           |

Money Supermarket were the eventual winner, despite almost losing me due to domain name issues. The best for user experience was definitely Compare the Market. I’d be very happy to discover that the other sites worked that nicely next year.