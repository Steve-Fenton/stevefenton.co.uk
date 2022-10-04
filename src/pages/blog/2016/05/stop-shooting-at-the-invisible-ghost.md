---
layout: src/layouts/Default.astro
title: 'Stop shooting at the invisible ghost'
navMenu: false
pubDate: 2016-05-13T14:35:49+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - OOP
---

> Writing clean code is what you must do in order to call yourself a professional. There is no reasonable excuse for doing anything less than your best.

So says the title page of [Clean Code](https://www.amazon.co.uk/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) – before even a foreword or introduction.

If you are object-oriented programmer you will have heard of Robert Martin’s book, Clean Code. If you have read Clean Code, you’ll know that there are lots of signs of a poor design that you can attack in order to improve your code; to make is cleaner. If you are an object-oriented programmer who hasn’t read this book, you should probably read it so you can have an opinion on it. Clean Code is the starting point for discussions on what good code looks like in curly-braced object-oriented languages. (It is not the final word, though.)

So on the understanding that we all have a similar idea of what clean code looks like, let’s talk about shooting at invisible ghosts.

There are two common times where teams try to introduce design into their code.

1. Before they write it (often called “Design”)
2. After they write it (often called “Refactoring”)

Up front design works great for abstract ideas, architectures, and general principles; but it sucks for low-level code design. If you try to design a code change up-front, you solve invented problems and miss real-life problems. Your design may be worse than the duplication!

> You can’t manage what you can’t see.

So say Jim Benson and Tonianne DeMaria Barry, authors of [Personal Kanban](https://www.personalkanban.com/).

The only way to get a good low-level code design is [RED-GREEN-REFACTOR](/2013/05/my-unit-testing-epiphany/), where you go from RED to GREEN *without any design at all*, then go from GREEN to nicely refactored code when you can see the duplication (or other gnarly stuff) that needs to be removed.

Trying to prevent duplication from occurring in the first place is actually close to impossible because it depends on you predicting where it will occur. Fixing duplication during refactoring is easier because you can see the real problem that needs to be solved, and you can solve it without also having to think about the original behaviour your code was trying to create.