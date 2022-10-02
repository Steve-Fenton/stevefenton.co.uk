---
id: 3596
layout: src/layouts/Default.astro
title: 'Getting started with Cypress and TypeScript'
pubDate: 2018-06-07T07:00:17+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=3596'
permalink: /2018/06/getting-started-with-cypress-and-typescript/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";N;s:10:"author_url";N;s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";N;s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";N;}'
image: /wp-content/uploads/2018/06/cypress-tree.jpg
categories:
    - Programming
tags:
    - cypress
    - testing
    - typescript
---

![Cypress Tree](/wp-content/uploads/2018/06/cypress-tree-1024x681.jpg)

Cypress is a front-end testing utility that allows you to write UI tests using Mocha and Chai. It has auto-waits, time-travel (look back at snapshots from within test runs), and automatic discovery of tests. This blog provides a quick start for getting started with Cypress and TypeScript.

### Cypress NPM packages

Your `package.json` file will need the following minimal development dependencies.

```
<pre class="prettyprint lang-javascript">
{
    "name": "test",
    "dependencies": {},
    "devDependencies": {
        "typescript": "^3.6.4",
        "cypress": "^3.5.0"
    }
}
```

Run an `npm install` and then check that the UI works okay by running `npx cypress open`. Leave it running as you continue as it will auto-load changes and you can run your tests as you go.

### Running Cypress

You can run Cypress with the open command:

```
<pre class="prettyprint">
npx cypress open
```

If you leave it running while you’re writing tests, it will update as files change. You can also run a test suite and leave it open to see the tests automatically re-run when you change them.

### Code location and TS Config

I am putting my TypeScript files in the root of the test app, with component object models in a sub folder. I am moving these into the Cypress folder `./cypress/integration` during compilation. You could use a task runner to do that instead if you wanted to. Here is the `tsconfig.json` to support this.

```
<pre class="prettyprint lang-javascript">
{
    "compilerOptions": {
        "outDir": "./cypress/integration",
        "strict": true,
        "baseUrl": "../node_modules",
        "target": "esnext",
        "moduleResolution": "node",
        "lib": [
            "esnext",
            "dom"
        ],
        "types": [
            "cypress"
        ]
    },
    "include": [
        "./*/**.ts"
    ],
    "exclude": [
        "./node_modules/**.ts"
    ]
}
```

### First test

I won’t patronise you with a “true equals true” assertion. We’ll just put together an entire test. Tests use Mocha and Chai, so anyone who has used these (or Jasmine, or Jest)… will know exactly how to write their tests. Anyone who has used Selenium will know to use classes to represent components. You’ll hear this referred to as Page Object Models; but actually you should represent components, or widgets, rather than whole pages.

Let’s throw a complete set of files into the mix to show this in action. If you are following along, please point your tests at a website you own!

First of all, here are some component object models to represent a home page, a search component, and a search result page.

You’ll see call to `cy`, which is the global Cypress variable. You will also notice that I tend to return the component, or a substitute component, from each method. This makes things chainable and also makes using the right object super-easy.

`./pages/home.ts`

```
<pre class="prettyprint lang-typescript">
import { Search } from './search';

export class Home {
    navigate() {
        cy.visit('https://www.example.com/');
        return this;
    }

    openSearch() {
        return new Search();
    }
}
```

`./pages/search.ts`

```
<pre class="prettyprint lang-typescript">
import { Result } from "./result";

export class Search {
    search(term: string) {
        const field = cy.get('.search-field');
        field.type(term);

        cy.get('.search-submit').click();
        return new Result();
    }
}
```

`./pages/result.ts`

```
<pre class="prettyprint lang-typescript">
export class Result {
    count() {
        return 6;
    }

    assertUrl(term: string) {
        const query = `?s=${term}`;
        cy.url().should('include', query)
    }
}
```

### Cypress specification

You can use these component object models from a specification file.

`./specification.ts`

```
<pre class="prettyprint lang-typescript">
import { Home } from './pages/home';

describe('Site Search', () => {
    it ('should query for the user entered term', () => {
        const home = new Home().navigate();
        const search = home.openSearch();
        const result = search.search('cypress');

        result.assertUrl('cypress');
    });
});
```

Hopefully you’ll notice that the specification itself knows nothing about Cypress, or the DOM, or element selectors.

As soon as the compiler outputs the JavaScript files for this application, the UI will pick them up and list them.

![Cypress UI](https://www.stevefenton.co.uk/wp-content/uploads/2018/06/cypress-ui.png)

You can then click on it and it will run.

![Cypress Runner](https://www.stevefenton.co.uk/wp-content/uploads/2018/06/cypress-runner-1024x629.png)

You can click on the steps displayed on the left-hand side of the runner (which is within whichever browser you selected) and it will show you the state of the system under test at that time.

### Assertions

The most comment assertions will be against elements, which look like this…

```
<pre class="prettyprint lang-typescript">
cy.get('#myElementId').should('contain', 'Expected Text');
```

### Summary

Cypress is a neat tool for running front-end tests, but you need to lean on all the knowledge that has come from tools such as Selenium to ensure you organise your code in a nice way. Front-end tests tend to be harder to maintain, so good design is needed to minimize this overhead. The familiarity of the tool to anyone who has used JavaScript testing frameworks, and other front-end test frameworks makes it easy to use, and it has some nice features such as the time-travel utility.

Find out more on the [official website](https://www.cypress.io/).

<small>Lone cypress tree Monterey, CA, photo D. Ramey Logan (Resized, but otherwise unmodified). [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.en)</small>