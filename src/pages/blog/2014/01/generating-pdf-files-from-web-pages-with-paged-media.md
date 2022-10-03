---
layout: src/layouts/Default.astro
navMenu: false
title: 'Generating PDF files from web pages with paged media'
pubDate: 2014-01-17T23:20:18+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=432'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'csharp'
    - css
    - pagedmedia
    - pdf
---

Having recently starting [adding CSS Paged Media to web pages](http://www.stevefenton.co.uk/Content/Blog/Date/201312/Blog/Printing-Web-Pages-With-The-Paged-Media-Module/), and [generating dynamic headers from page content](http://www.stevefenton.co.uk/Content/Blog/Date/201312/Blog/Using-CSS-Paged-Media-To-Add-Dynamic-Headers/) – I had a need to push the results of this to PDF. The use-case was two-fold, one was to generate a whole batch of PDFs to “print later” and the other was for sending the content for review, safe in the knowledge it would print correctly.

Having reviewed a very long list of free and paid HTML to PDF conversion tools I found one that really nails the CSS Paged Media Module, HTML5, CSS and images all in one go: [Prince (Print with CSS)](http://www.princexml.com/) – it actually supports paged media better than all the current web browsers. Good job.

So here is some example code for using it from .NET (although you can use whatever language suits you).

### Before You Code

Before you get started, you either need to install Prince on each machine – or make it a dependency. I made it a dependency and ensure that the Prince engine files end up in the bin folder.

### IPdfConverter Interface

First, I created an interface for PDF conversion. This allowed me to keep switching out the implementations for the various programs I was testing.

```
<pre class="prettyprint lang-csharp">
public interface IPdfConverter
{
    byte[] ConvertUrlToPdf(string url);
}
```
### Wrapper Class

Next up, a wrapper for Prince:

```
<pre class="prettyprint lang-csharp">public class PrincePdfConverter : IPdfConverter
{
    private readonly string baseUrl;
    private readonly string runnerPath;
    public PrincePdfConverter(string baseUrl, string runnerPath)
    {
        this.baseUrl = baseUrl;
        this.runnerPath = runnerPath;
    }
    public byte[] ConvertUrlToPdf(string url)
    {
        byte[] pdfBytes;
        using (var stream = new MemoryStream())
        {
            var pdfConverter = new Prince(runnerPath);
            pdfConverter.Convert(url, stream);
            pdfBytes = stream.ToArray();
        }
        return pdfBytes;
    }
}
```
### Using Prince To Convert HTML To PDF

And now you are ready to rock. Here is a sample MVC controller that converts a supplied URL to PDF and streams back the result (obviously you wouldn’t just accept any URL in the world, but for the purposes of the example it seemed pointless to show code that generates a URL). I have hard-coded a bunch of stuff you wouldn’t in the real world, like file names and such.

```
<pre class="prettyprint lang-csharp">
public class PdfController : Controller
{
    private const string PRINCE_RUNNER_PATH = "~/bin/prince/bin/prince.exe";
    public void Index(string url)
    {
        var pdfConverter = GetPdfConverter();
        var pdfBytes = pdfConverter.ConvertUrlToPdf(url);
        SendResponse(pdfBytes);        
    }
    private IPdfConverter GetPdfConverter()
    {
        var baseAddress = Request.Url.GetLeftPart(UriPartial.Authority);
        var runnerPath = Server.MapPath(PRINCE_RUNNER_PATH);
        return new PrincePdfConverter(baseAddress, runnerPath);
    }
    private static void SendResponse(byte[] pdfBytes)
    {
        System.Web.HttpResponse response = System.Web.HttpContext.Current.Response;
        response.Clear();
        response.AddHeader("Content-Type", "application/pdf");
        response.AddHeader("Content-Disposition", GetContentDispositionHeader(pdfBytes.Length));
        response.BinaryWrite(pdfBytes);
        response.End();
    }
   
    private static string GetContentDispositionHeader(int size)
    {
        return string.Format("inline; filename=Example.pdf; size={0}", size.ToString());
    }
}
```
### Summary

This is a pretty straightforward converter to use. It was definitely “as easy” if not easier than the other libraries I tried. Obviously, I would have loved to have found a free library that did everything that Prince does – but nothing came close in respect of the CSS Paged Media support. Not only does it handle the page breaks and continuation instructions well, it managed to beat all the browsers when it came to the headers and footers.

A few converters say they support paged media, but actually they only support page-breaks – not headers, footers and dynamic data.

A one server license is a few thousand dollars – but I reckon many businesses could justify the cost based on savings elsewhere. The ease of editing HTML documents rather than Word templates or XSLT for converting XML to print-outs is well worth it for the reports and documents I am currently writing.

As an additional warning for those looking at HTML to PDF converters, watch out for apparently commercial products that are actually just wrappers for [WKHTMLTOPDF](http://code.google.com/p/wkhtmltopdf/). I evaluated several offerings, including some quite expensive ones, that are clearly running WKHTMLTOPDF on the inside (which is a good converter, but that has very little support for paged media). Check your results against WKHTMLTOPDF before spending any money!