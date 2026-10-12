---
title: "Add Rego support to Astro"
subtitle: "How to supply what Shiki needs to render your Rego code examples."
pubDate: 2026-10-14
description: "Find out how to supply what Shiki needs to render your Rego code examples."
keywords: "astro,shiki,rego,language"
navMenu: false
bannerImage:
  src: /img/topic/rego/rego.png
  alt: A cuttlefish adorns the cover of Exploring Rego.
authors:
  - steve-fenton
categories:
  - Programming
tags:
  - Astro
  - Rego
  - Open Policy Agent
---

There are three components to adding a custom language to Astro for Shiki to pick up and use. Always check the bundled languages first, because you can save a bit of effort if the language is already available.

OPA and Rego haven't made the bundle yet, so we need the following changes:

- Add a language file
- Add a language registration
- Update the Astro config

We'll tackle them in reverse order, because that shows the simplest change first, and builds up to the more substantial files. If you're after OPA/Rego support in Astro with Shiki, you can just copy the two new files straight out of this post. If you're using a different language, you need to build the language file for it.

Let's get cracking.

## Update the Astro config

Here's the `astro.config.mjs` file, collapsed so only the crucial changes are visible:

```javascript
// Other imports
import rego from './src/grammars/rego.mjs';

export default defineConfig({
  // Site config, integrations, etc... and then
  markdown: {
    shikiConfig: {
      // Theme config, etc... and then
      langs: [rego],
      langAlias: {
        opa: "rego",
      },
    },
    // Other config like processor and server info...
  }
});
```

This makes the language available using the names `rego` and `opa`, this lets authors use either term and it will work. This is how Shiki handles other languages as you can `javascript` or `js`, for example.

This won't be recognized until we add a language registration.

## Language registration

Here's the `src/grammars/rego.mjs`, which loads up the JSON file with the language definition:

```javascript
import fs from 'node:fs';

/** @type {import('shiki').LanguageRegistration} */
const rego = JSON.parse(
  fs.readFileSync(new URL('./rego.tmLanguage.json', import.meta.url), 'utf8')
);

export default rego;
```

The language registration file grabs the language file, which defines all the different types of keywords in the language, and throws it at Shiki to deal with.

## Language file

And here's the `src/grammars/rego.tmLanguage.json` file, which tells Shiki all the important things it needs to know about Rego:

```json
{
  "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
  "name": "rego",
  "scopeName": "source.rego",
  "displayName": "Rego",
  "aliases": [
    "opa"
  ],
  "fileTypes": [
    "rego"
  ],
  "patterns": [
    {
      "include": "#comment"
    },
    {
      "include": "#keyword"
    },
    {
      "include": "#comparison-operators"
    },
    {
      "include": "#assignment-operators"
    },
    {
      "include": "#term"
    }
  ],
  "repository": {
    "call": {
      "captures": {
        "1": {
          "name": "support.function.any-method.rego"
        }
      },
      "match": "([a-zA-Z_][a-zA-Z0-9_]*)\\(",
      "name": "meta.function-call.rego"
    },
    "comment": {
      "patterns": [
        {
          "match": "(#)\\s*(METADATA)\\s*$\\n?",
          "captures": {
            "1": {
              "name": "punctuation.definition.comment.rego"
            },
            "2": {
              "name": "strong"
            }
          },
          "name": "comment.line.number-sign.rego"
        },
        {
          "match": "(#)\\s*(scope|title|description|related_resources|authors|organizations|schemas|entrypoint|custom):.*$\\n?",
          "captures": {
            "1": {
              "name": "punctuation.definition.comment.rego"
            },
            "2": {
              "name": "strong"
            }
          },
          "name": "comment.line.number-sign.rego"
        },
        {
          "captures": {
            "1": {
              "name": "punctuation.definition.comment.rego"
            }
          },
          "match": "(#).*$\\n?",
          "name": "comment.line.number-sign.rego"
        }
      ]
    },
    "constant": {
      "match": "\\b(?:true|false|null)\\b",
      "name": "constant.language.rego"
    },
    "root-document": {
      "match": "(?<!\\.)\\b(?:input|data)\\b",
      "name": "variable.other.constant.rego support.constant.rego variable.language.rego"
    },
    "keyword": {
      "match": "(^|\\s+)(?:(default|not|package|import|as|with|else|some|in|every|if|contains|and|or))(?=\\s|$)",
      "name": "keyword.other.rego"
    },
    "number": {
      "match": "(?x:                # turn on extended mode\n                             -?         # an optional minus\n                             (?:\n                               0        # a zero\n                               |        # ...or...\n                               [1-9]    # a 1-9 character\n                               \\d*      # followed by zero or more digits\n                             )\n                             (?:\n                               (?:\n                                 \\.     # a period\n                                 \\d+    # followed by one or more digits\n                               )?\n                               (?:\n                                 [eE]   # an e character\n                                 [+-]?  # followed by an option +/-\n                                 \\d+    # followed by one or more digits\n                               )?       # make exponent optional\n                             )?         # make decimal portion optional\n                           )",
      "name": "constant.numeric.rego"
    },
    "comparison-operators": {
      "match": "\\=\\=|\\!\\=|>|<|<\\=|>\\=|\\+|-|\\*|%|/|\\||&",
      "name": "keyword.operator.comparison.rego"
    },
    "assignment-operators": {
      "match": ":\\=|\\=",
      "name": "keyword.operator.assignment.rego"
    },
    "interpolated-string-double": {
      "begin": "(\\$)(\")",
      "beginCaptures": {
        "1": {
          "name": "punctuation.definition.template-expression.begin.rego"
        },
        "2": {
          "name": "punctuation.definition.string.begin.rego"
        }
      },
      "end": "\"",
      "endCaptures": {
        "0": {
          "name": "punctuation.definition.string.end.rego"
        }
      },
      "name": "string.template.rego",
      "patterns": [
        {
          "include": "#interpolation-expression"
        },
        {
          "include": "#string-escape"
        },
        {
          "include": "#interpolation-escape"
        },
        {
          "include": "#string-escape-invalid"
        }
      ]
    },
    "interpolated-string-raw": {
      "begin": "(\\$)(`)",
      "beginCaptures": {
        "1": {
          "name": "punctuation.definition.template-expression.begin.rego"
        },
        "2": {
          "name": "punctuation.definition.string.begin.rego"
        }
      },
      "end": "`",
      "endCaptures": {
        "0": {
          "name": "punctuation.definition.string.end.rego"
        }
      },
      "name": "string.template.rego",
      "patterns": [
        {
          "include": "#interpolation-expression"
        }
      ]
    },
    "interpolation-expression": {
      "begin": "(?<!\\\\)\\{",
      "beginCaptures": {
        "0": {
          "name": "punctuation.section.embedded.rego"
        }
      },
      "end": "\\}",
      "endCaptures": {
        "0": {
          "name": "punctuation.section.embedded.rego"
        }
      },
      "name": "meta.embedded.expression.rego",
      "patterns": [
        {
          "include": "#interpolation-expression-contents"
        }
      ]
    },
    "interpolation-expression-contents": {
      "patterns": [
        {
          "include": "#comment"
        },
        {
          "include": "#constant"
        },
        {
          "include": "#string"
        },
        {
          "include": "#number"
        },
        {
          "include": "#call"
        },
        {
          "include": "#root-document"
        },
        {
          "include": "#variable"
        },
        {
          "include": "#comparison-operators"
        }
      ]
    },
    "string-escape": {
      "match": "(?x:       # turn on extended mode\n\t\t\t\\\\                 # a literal backslash\n\t\t\t(?:                # ...followed by...\n\t\t\t\t[\"\\\\/bfnrt]    # one of these characters\n\t\t\t\t|              # ...or...\n\t\t\t\tu              # a u\n\t\t\t\t[0-9a-fA-F]{4} # and four hex digits\n\t\t\t)\n\t\t\t)",
      "name": "constant.character.escape.rego"
    },
    "interpolation-escape": {
      "match": "\\\\[{}]",
      "name": "constant.character.escape.rego"
    },
    "string-escape-invalid": {
      "match": "\\\\.",
      "name": "invalid.illegal.unrecognized-string-escape.rego"
    },
    "string": {
      "patterns": [
        {
          "include": "#interpolated-string-double"
        },
        {
          "include": "#interpolated-string-raw"
        },
        {
          "begin": "\"",
          "beginCaptures": {
            "0": {
              "name": "punctuation.definition.string.begin.rego"
            }
          },
          "end": "\"",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.string.end.rego"
            }
          },
          "name": "string.quoted.double.rego",
          "patterns": [
            {
              "include": "#string-escape"
            },
            {
              "include": "#string-escape-invalid"
            }
          ]
        },
        {
          "begin": "`",
          "beginCaptures": {
            "0": {
              "name": "punctuation.definition.string.begin.rego"
            }
          },
          "end": "`",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.string.end.rego"
            }
          },
          "name": "string.other.raw.rego"
        }
      ]
    },
    "term": {
      "patterns": [
        {
          "include": "#constant"
        },
        {
          "include": "#string"
        },
        {
          "include": "#number"
        },
        {
          "include": "#call"
        },
        {
          "include": "#root-document"
        },
        {
          "include": "#variable"
        }
      ]
    },
    "variable": {
      "match": "\\b[[:alpha:]_][[:alnum:]_]*\\b",
      "name": "meta.identifier.rego"
    }
  }
}
```

## All done

This will resolve the message you see when you build your Astro site:

> [Shiki] The language "rego" doesn't exist, falling back to "plaintext".

You'll get both a clean build and syntax highlighting for your policy code, like this:

```rego
deny contains msg if {
  not input.member.membership.active
  msg := "membership is not active"
}
```
