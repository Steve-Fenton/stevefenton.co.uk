---
id: 369
layout: src/layouts/Default.astro
title: 'Updated Dynamics localization in TypeScript'
pubDate: 2014-03-26T22:24:42+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=369'
permalink: /2014/03/updated-dynamics-localization-in-typescript/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - dynamics
    - javascript
    - typescript
---

ようこそ to my little blog post on localization in Dynamics, with a better example written in TypeScript (although you could just nick the compiled JavaScript if you aren’t using TypeScript).

I was shown an [example supplied on MSDN for localization of messages](http://msdn.microsoft.com/en-us/library/hh670609.aspx) in JavaScript and my first thought was that is looked a little leaky. Here is the original example:

```
<pre class="prettyprint lang-typescript">var userLcid = 1033;
var localizedStrings = {
   ErrorMessage: {
      _1033: "There was an error completing this action. Please try again.",
      _1031: "Es ist ein Fehler aufgetreten, der Abschluss dieser Aktion. Bitte versuchen Sie es erneut.",
      _1036: "Il y avait une erreur complÃ©tant cette action. Veuillez essayer Ã  nouveau.",
      _1034: "Hubo un error al completar esta acciÃ³n. Vuelva a intentarlo."
   },
   Welcome: {
      _1033: "Welcome",
      _1031: "Willkommen",
      _1036: "Bienvenue",
      _1034: "Bienvenido"
   }
};
var LocalizedErrorMessage = localizedStrings.ErrorMessage["_" + userLcid];
var LocalizedWelcomeMessage = localizedStrings.Welcome["_" + userLcid];
```

I didn’t like how you have to keep passing in the userLcid variable and I didn’t like the additions of the underscore a bunch of times and I didn’t like how the internal data structure gradually infects the whole application.

### TypeScript

It looked like a good case for a module and a couple of classes to hide all of those details away. Here is my TypeScript version of this example.

```
<pre class="prettyprint lang-typescript">module Localization {
    class LocalizedData {
        static ErrorMessageData = {
            _1033: "There was an error completing this action. Please try again."
            _1031: "Es ist ein Fehler aufgetreten, der Abschluss dieser Aktion. Bitte versuchen Sie es erneut.",
            _1036: "Il y avait une erreur complÃ©tant cette action. Veuillez essayer Ã  nouveau.",
            _1034: "Hubo un error al completar esta acciÃ³n. Vuelva a intentarlo."
        };
        static WelcomeData = {
            _1033: "Welcome",
            _1031: "Willkommen",
            _1036: "Bienvenue",
            _1034: "Bienvenido"
        };
    }
         
    export class LocalizedStrings {
        private key: string;
        constructor(locale) {
            this.key = '_' + locale;
        }
        get errorMessage() {
            return LocalizedData.ErrorMessageData[this.key];
        }
               
        get welcome() {
            return LocalizedData.WelcomeData[this.key];
        }
    }
}
var userLcid = 1033;
var localizedStrings = new Localization.LocalizedStrings(userLcid);
 
var welcome = localizedStrings.welcome;
var error = localizedStrings.errorMessage;
```

Now the data structures are all hidden away and the usage of the strings doesn’t require the constant passing of the userLcid. The module hides the LocalizedData class entirely and represents the chunk of code that will change for the same reason, for example if a new language becomes supported you only change the LocalizedData class. If you add a new string, both the data and LocalizedStrings class needs to be changed.

### Compiled JavaScript

If you aren’t using TypeScript, you can use the compiled JavaScript instead.

```
<pre class="prettyprint lang-javascript">var Localization;
(function (Localization) {
    var LocalizedData = (function () {
        function LocalizedData() {
        }
        LocalizedData.ErrorMessageData = {
            _1033: "There was an error completing this action. Please try again.",
            _1031: "Es ist ein Fehler aufgetreten, der Abschluss dieser Aktion. Bitte versuchen Sie es erneut.",
            _1036: "Il y avait une erreur complÃ©tant cette action. Veuillez essayer Ã  nouveau.",
            _1034: "Hubo un error al completar esta acciÃ³n. Vuelva a intentarlo."
        };
        LocalizedData.WelcomeData = {
            _1033: "Welcome",
            _1031: "Willkommen",
            _1036: "Bienvenue",
            _1034: "Bienvenido"
        };
        return LocalizedData;
    })();
    var LocalizedStrings = (function () {
        function LocalizedStrings(locale) {
            this.key = '_' + locale;
        }
        Object.defineProperty(LocalizedStrings.prototype, "errorMessage", {
            get: function () {
                return LocalizedData.ErrorMessageData[this.key];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LocalizedStrings.prototype, "welcome", {
            get: function () {
                return LocalizedData.WelcomeData[this.key];
            },
            enumerable: true,
            configurable: true
        });
        return LocalizedStrings;
    })();
    Localization.LocalizedStrings = LocalizedStrings;
})(Localization || (Localization = {}));
var userLcid = 1033;
var localizedStrings = new Localization.LocalizedStrings(userLcid);
var welcome = localizedStrings.welcome;
var error = localizedStrings.errorMessage;
```