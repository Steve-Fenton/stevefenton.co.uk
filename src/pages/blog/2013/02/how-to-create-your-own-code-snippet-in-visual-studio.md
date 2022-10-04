---
layout: src/layouts/Default.astro
title: 'How to create your own code snippet in Visual Studio'
navMenu: false
pubDate: 2013-02-03T22:20:50+00:00
authors:
    - steve-fenton
categories:
    - Programming
    - 'Visual Studio'
tags:
    - .net
    - C-Sharp
    - xml
---

I’m using Visual Studio 2012, but this works just as well in any sensibly modern version of Visual Studio.

If you need to add an auto property in Visual Studio, you are probably aware of the “prop” snippet. Instead of typing:

```csharp
public string MyProperty { get; set; }
```

You just type:

```csharp
prop
```

And hit your tab key a couple of times. You need to type in the bits it can’t guess – but it is quicker than hand-cranking the stuff that is always the same.

Similar short-cuts exist for tons of things and it is worth learning a few if you want to avoid nodding off and head-butting your keyboard.

But what if you want to write your own short-cuts? Enter the snippet!

## Writing a Custom Snippet

For this example, I’m going to show you a snippet that generates an outline for a method. It is a little simplistic, but shows you how to make parts of the snippet user-editable.

Start off by creating a file named “method.snippet”. This will be an XML file, but has the special snippet file extension.

Here is the entire file, I’ll explain straight after.

```xml
<codesnippets xmlns="http://schemas.microsoft.com/VisualStudio/CodeSnippet">
    <CodeSnippet Format="1.0.0">
        <Header>
          <Title>method</Title>
          <Description>Inserts an empty method.</Description>
          <Author>Steve Fenton</Author>
          <Shortcut>method</Shortcut>
          <SnippetTypes>
            <SnippetType>Expansion</SnippetType>
          </SnippetTypes>          
        </Header>
        <Snippet>
            <Declarations>
                <Literal>
                    <ID>type</ID>
                    <Default>void</Default>
                </Literal>
                <Literal>
                    <ID>name</ID>
                    <Default>methodName</Default>
                </Literal>
            </Declarations>
            <Code Language="CSharp" Kind="any">
                <![CDATA[
                    public $type$ $name$()
                    {
                        throw new NotImplementedException();
                    }
                ]]>
            </Code>
        </Snippet>
    </CodeSnippet>
</codesnippets>
```

Title, Description, and Author are reasonably self-explanatory.

Shortcut contains the thing you need to type to access the snippet. I have used “method”, but you could have “me” or “mth” or whatever is obvious to you.

The snippet itself is defined in two stages. The first part are the Declarations – this contains any things we want the programmer to be able to edit when the code is generated. They will be able to tab between the things you define here and overwrite them easily. In this case, it is “type” and “name”, along with some default values.

```xml
<Declarations>
    <Literal>
        <ID>type</ID>
        <Default>void</Default>
    </Literal>
    <Literal>
        <ID>name</ID>
        <Default>methodName</Default>
    </Literal>
</Declarations>
```

The second part is the code, which in our case contains placeholders for the declarations we just created. Just surround the ID with dollars in the code-block.

```csharp
<![CDATA[
        public $type$ $name$()
        {
                throw new NotImplementedException();
        }
]]>
```

Save the file and it is ready to import!

In Visual Studio, go to `Tools > Code Snippet Manager`. In this dialog you’ll see all the snippets organised neatly into various groups.

Hit “Import…” and select your file. You can then select the group to add the snippet to. You can select more than one if you like, but it will potentially appear multiple times if more than one context applies – so selecting a single destination works best.

You shouldn’t need to restart Visual Studio to use the snippet, so go to a code file and select a location where a method would be valid and type “method” then tab a couple of times. You can now enter the type and the name of the method, because we created them as declarations.

So the “method” example may not be majorly useful – but the techniques used can be applied to something that really will make an improvement to your happy coding!