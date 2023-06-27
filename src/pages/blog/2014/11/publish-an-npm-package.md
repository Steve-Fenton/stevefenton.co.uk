---
title: 'Publish an NPM package'
navMenu: false
pubDate: 2014-11-29T19:59:46+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Node
    - TypeScript
---

This is a really quick run through of publishing a simple NPM package, based on my experience of publishing [tsUnit](https://github.com/Steve-Fenton/tsUnit) to NPM. Because tsUnit is a single file, this provides a great opportunity to see how to publish a package without the distraction of a complicated package – we just want to make our file available.

## Step 1 – package.json

Make sure you have a quality [package.json](https://www.npmjs.org/doc/files/package.json.html) file to describe your package.

```json
{
    "author": "Steve Fenton",
    "name": "tsunit.external",
    "description": "Unit testing framework for TypeScript.",
    "keywords": [
        "tsunit",
        "typescript",
        "unit",
        "testing"
    ],
    "version": "1.7.3",
    "homepage": "https://github.com/Steve-Fenton/tsUnit",
    "bugs": "https://github.com/Steve-Fenton/tsUnit/issues",
    "license": "Apache-2.0",
    "files": [ "tsUnit.ts", "tsUnit.js" ],
    "repository": {
        "url": "https://github.com/Steve-Fenton/tsUnit"
    },
    "main": "tsUnit.js",
    "dependencies": { },
    "devDependencies": { },
    "optionalDependencies": { },
    "engines": {
        "node": "*"
    }
}
```

The name (must be all lower case) and version are the most important fields (you could leave off most of the rest).

The interesting bits are the “files” array and the “main” property. My package.json file is in the same folder as the tsUnit.ts file and the tsUnit.js file – so I’m only dealing with a very simple scenario here.

## Step 2 – Add a user

You need to [add a user](https://www.npmjs.org/doc/cli/npm-adduser.html). You just need to run the following command and type in the information you are prompted for:

```powershell
npm adduser
```

## Step 3 – Publish

You can now publish. This is a simple as running the following command from the directory containing the package.json file:

```powershell
npm publish
```

If there are any problems, you’ll get a message telling you what you need to change. Otherwise, your package will show up just like the [tsunit.external pacakge on npm here](https://www.npmjs.org/package/tsunit.external).

## Step 3 – Install It

You can install your package using:

```powershell
npm install tsunit.external
```

## Step 4 – Use It

To use the package, you can use:

```typescript
import tsUnit = require('./node_modules/tsunit.external/tsUnit');
```