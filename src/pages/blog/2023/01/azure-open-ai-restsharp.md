---
layout: src/layouts/Default.astro
title: Calling Azure Open AI with RestSharp
navMenu: false
pubDate: 2023-01-28
keywords: azure,open ai, restsharp
description: Find out how to call Azure Open API's REST endpoint using RestSharp.
bannerImage:
    src: /img/topic/open-ai.png
    alt: The Open AI logo
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
---

If you are an Azure customer, you'll soon be treated to an Open AI service on Azure that is built for scale. This post shows you how to call Azure Open AI using its REST endpoint. I'm using RestSharp, which supplies a friendly set of classes that are easier to use than the lower-level HTTP classes in .NET.

## Request Class

First of all, we'll add a simple request class that we'll use to tailor the request. The two properties that are most useful initially are:

- Prompt: the text where we specify what we want
- MaxTokens: a limit to the length of the response

The reason we set the length in tokens is that we need to keep the whole request within our request token limit, which includes our prompt and the response. You can ask for multiple responses, it just uses more tokens. Tokens are basically story points for APIs (as in, they kinda represent how hard you are asking the machine to work, but not really).

```csharp
using System.Text.Json.Serialization;

namespace FentonOpenAI;

public class OpenAIRequest
{
    public OpenAIRequest(int maxTokens, string prompt)
    {
        MaxTokens = maxTokens;
        Prompt = prompt;
    }

    [JsonPropertyName("prompt")]
    public string Prompt { get; set; }

    [JsonPropertyName("max_tokens")]
    public int MaxTokens { get; set; } = 16;

    [JsonPropertyName("temperature")]
    public decimal Temperature { get; set; } = 1.0M;
}
```

## Response class

The response class (actually two classes) just represents what you'll get back from the API call. The interesting bit is the `Text` stored in the `Choices` part of the response.

```csharp
using System.Text.Json.Serialization;

namespace FentonOpenAI;

public class OpenAIResponse
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("object")]
    public string Object { get; set; }

    [JsonPropertyName("created")]
    public int Created { get; set; }

    [JsonPropertyName("model")]
    public string Model { get; set; }

    [JsonPropertyName("choices")]
    public List<Choice> Choices { get; set; }
}

public class Choice
{
    [JsonPropertyName("text")]
    public string Text { get; set; }

    [JsonPropertyName("index")]
    public int Index { get; set; }

    [JsonPropertyName("logprobs")]
    public object LogProbs { get; set; }

    [JsonPropertyName("finish_reason")]
    public string FinishReason { get; set; }
}
```

## Calling the Open AI API with RestSharp

Now we have some classes to handle our JSON request and response, we're ready to go. You'll need to install RestSharp using NuGet for this code to work.

### Usings and properties

```csharp
using FentonOpenAI;
using RestSharp;

string API_KEY = "";
string YOUR_RESOURCE_NAME = "";
string DEPLOYMENT_ID = "";
string API_VERSION = "2022-12-01";
```

You'll need to enter some information from the Azure portal in the above code:

- `YOUR_RESOURCE_NAME` you can find this in Cognitive Services > Azure Open AI, listed under the "Name" column.
- `DEPLOYMENT_ID` if you click on the name from the above step, and then look for "Model Deployments", you should see the "Model Deployment Name" listed.
- `API_KEY` right above "Model Deployments" in the portal, there's an entry for "Keys and Endpoint". Click on that and grab one of the keys.

If you don't have a deployment, add a `text-davinci-003` model to play along with this example.

Keep you keys safe and don't check them into source control!

### Getting text from Open AI

Here's the RestSharp code to call the API. You'll see the properties getting used to create the endpoint address and add the API key.

On the first line, we create the `OpenAIRequest` and ask for a 150-word version of "Summarise DevOps".

```csharp
OpenAIRequest prompt = new(150, "Summarise DevOps");

RestRequest request = new RestRequest($"/openai/deployments/{DEPLOYMENT_ID}/completions", Method.Post)
    .AddQueryParameter("api-version", API_VERSION)
    .AddJsonBody(prompt);

request.AddHeader("Content-Type", "application/json");
request.AddHeader("Accept", "application/json");
request.AddHeader("api-key", API_KEY);

RestClient client = new($"https://{YOUR_RESOURCE_NAME}.openai.azure.com");

var response = await client.PostAsync<OpenAIResponse>(request);

Console.WriteLine(response?.Choices[0].Text);

Console.ReadKey();
```

The output from this call is this 71-word description of DevOps, which is not unlike a description you would get if you asked a random person at a conference.

```
DevOps is a software development methodology that emphasizes collaboration between development and operations teams. It is used to reduce development and deployment timeframes, facilitate faster troubleshooting, and improve the overall quality of software. It is a combination of practices, tools and philosophies that facilitate the rapid delivery of high quality, reliable and efficient IT services. DevOps focuses on automation, rapid feedback loops, continuous integration, Infrastructure as Code, and shorter release cycles.
```

But what if we wanted a version to share with our kids, so they can take inspiration and have better collaboration between book monitors and prefects? We can adjust our prompt for that.

```csharp
OpenAIRequest prompt = new(150, "Summarise DevOps for a child");
```

Now we get a totally different response, tailored for children.

```
DevOps is a way of working that helps teams make sure software products are delivered quickly and with high quality. It involves closely collaborating between two teams: developers and operations. Developers create and update the software, and operations make sure the software is deployed and runs efficiently. DevOps encourages people to use automation tools and good processes to help collaborate quickly and efficiently.
```

I asked Open AI to "summarise DevOps for a Scrum Master" and I got the same output (you can steal that joke and insert whatever job title you like... it pretty much works for all of 'em). Seriously though, this is what I actually got back:

```
DevOps is an approach to software development that focuses on collaboration between software developers, operations staff, and quality assurance teams throughout the entire process. It allows teams to work more effectively by automating and streamlining processes, such as code integration, version control, testing, deployment, and monitoring in an integrated environment. As a Scrum Master, it is important to foster collaboration across all departments and to motivate the team to embrace DevOps as a way to improve process efficiency. The DevOps approach encourages test-driven development, continuous integration, continuous delivery and mutual feedback from the development team and operations team throughout the entire project lifecycle.
```

## Picking holes in AI

Now look, I'm the first to find fault in these descriptions. I'm deeply interested in DevOps and I've written about why I don't like the use of the phrases such as "software development lifecycle" or "efficiency" as I think they are used incorrectly within DevOps. However, the machine is *only about as wrong as the typical human you might ask*. That's because language models are based on a kind of average knowledge. We collectively fed in the wrongness in our efforts to share knowledge on The Web.

What does this mean for using AI? We simply don't know yet. We need to be cautious with it, obviously. I think we need to treat it with a similar level of scepticism as we would the introduction to a Wikipedia article. Ultimately, I feel no better about [this summary](https://en.wikipedia.org/wiki/DevOps):

```
DevOps is a methodology in the software development and IT industry. Used as a set of practices and tools, DevOps integrates and automates the work of software development (Dev) and IT operations (Ops) as a means for improving and shortening the systems development life cycle. DevOps is complementary to agile software development; several DevOps aspects came from the agile way of working.
```

I mean, "shortens the systems development life cycle". What?! The systems development lifecycle covers the life span of a system from idea to retirement... so they are saying DevOps will result in you retiring your software product earlier than it would otherwise. That's utterly ridiculous.

## AI content implications

A final note on the implications of using AI content.

If you create a website and fill it with machine-generated content, there are some important things to keep in mind.

1. If you generate content sufficiently similar to copyrighted material, you may be responsible for infringing copyright.
2. It is *almost* certain that search engines are going to rank generated content lower than human content and that generated content is going to tank some sites at an unknown future date.
3. In many cases, you can't claim copyright on generated content (this differs by territory - you need to check your local laws).

## Responsible AI

You should take the time to start conversations within your organisation about how you will use AI in a responsible way. Part of this discussion should involve getting deep into the [AI transparency notes](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/transparency-note) provided by organisations like Microsoft.

The biggest errors I predict as things progress through the hype cycle are:

1. People making short-term decisions that will be highly damaging in the long term. For example, an organisation kick-starting its content by generating a bunch of pages. Over the next few months, this will look like a winning strategy, but there's an algorithm update coming that will turn your website into a desert.
2. People treating the information as canonical, not the result of a predictive language model. Decisions made without appropriate validation will cause harm.

## Summary

AI has hit high-levels of hype since language and image models were made available. What they produce depends very much on the prompts, but also on the prevelance of text on the World *Wild* Web. This means there are two sources of bias, uncorrected by real experience or opinion.

There are many good uses for this technology, for example:

- Searching within a document, as you won't need to guess the exact phrase to find the information
- Summarising or classifying content
- Using natural language to create a database query

... but it is clear that people are going to try and go beyond these cases and end up sinking in the tar pit.

You may agree or disagree with the [#NoEstimates](https://www.stevefenton.co.uk/blog/2015/09/noestimates-in-practice/) movement, but the machine doesn't care either way. It will argue just a vehemently both for and against estimates. The models can't answer questions, they just provide the words you ask for...

For

> Yes, teams should estimate software delivery in order to understand the scope of the project, plan their development cycles, and inform stakeholders about progress. Estimation helps teams to be realistic about how much and how quickly a project can be achieved. Estimations also enable project managers to track progress and adjust plans accordingly.

Against

> Software teams should stop estimating because it is a time-consuming task that takes away from their core focus of coding and debugging. Additionally, estimates can be inaccurate, misleading, or downright wrong when trying to predict the amount of effort required to complete a task or feature. Instead, software teams can focus on measuring actual performance and measuring progress since this gives a much more accurate picture of the progress of the team. Finally, estimates are often used to as a way to motivate developers, which can lead to unrealistic expectations and pressure.

Valuable content is opinionated. You can't debate someone who folds to your side of the argument after a re-phrase. That's just Indecisive Dave!

[Watch The Fast Show - Indecisive Dave](https://www.youtube.com/watch?v=lmTahAali90)

I'll just leave this here.

> **Goalkeepers**: Gordon Banks, Peter Shilton, David Seaman
>
> **Defenders**: Bobby Moore, Ashley Cole, Rio Ferdinand, Gary Neville, Jonathan Woodgate, Stuart Pearce, Sol Campbell, John Terry 
>
> **Midfielders**: Bobby Charlton, Paul Gascoigne, Steven Gerrard, David Beckham, Frank Lampard, Paul Scholes, Bryan Robson 
>
> **Forwards**: Alan Shearer, Gary Lineker, Michael Owen, Wayne Rooney, Harry Kane, Raheem Sterling, Teddy Sheringham