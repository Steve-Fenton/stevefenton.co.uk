---
title: 'TypeScript interfaces can extend classes'
navMenu: false
pubDate: 2013-06-14T12:07:44+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

TypeScript still has the ability to surprise and impress me and I just stumbled upon a feature that has done both. You can try this for yourself using TypeScript 0.9, but if you are using TypeScript 0.8 you won’t be able to use this yet.

This one sounds a bit odd at first, but actually it makes sense when you sit down and think about it. In TypeScript, an interface can extend a class. Just like this…

```typescript
class Fenton {
    public height = 'Tall';

    getHeight() {
        return this.height;
    }
}

interface IFenton extends Fenton {
    getWeight() : string;
}

class FentonLike implements IFenton {
    public height = 'Medium';

    getHeight() {
        return this.height;
    }

    getWeight() {
        return 'Don\'t ask';
    }
}
```

What happens under the covers is the TypeScript compiler works out the type signature for the class and adds the signature to the interface (without any implementation). When you implement the interface, you need to implement the methods and properties explicitly declared in the interface and also the methods and properties extracted from the original class.