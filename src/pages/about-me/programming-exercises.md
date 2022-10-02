---
layout: src/layouts/Default.astro
title: Programming Exercises
navOrder: 3000
pubDate: 2022-10-02
keywords: 
description: 
---

I have some programming exercises available on GitHub. Here is a quick overview of what they are and how to use them.

### Movie Rentals Kata

This is based on an exercise created by Mike Cohn, which was taught to me by Robert C. Martin in a mob programming session. The version we used was in Java, but I have translated it to C#. I have taken care to include as many of the problems as possible.

[Movie Rentals on GitHub](https://github.com/Steve-Fenton/MovieRentals)

There are two branches:

- master – ready to refactor
- withbugs – has an error to fix before refactoring

The idea behind this exercise is to fix the code. It has many problems that will will flex your object-oriented programming skills. You can try this many times and find you end up with new solutions, each of which will have its merits.

If you need a hint on some of the problems to solve, read about what `if` and `switch` may be telling you in [Alarm Bells in Object-Oriented Programming](https://www.stevefenton.co.uk/2013/03/alarm-bells-in-object-oriented-programming/), or in my version of Kipling’s [If…](https://www.stevefenton.co.uk/2017/08/if/). Maybe even experiment with [introducing a pipeline](https://www.stevefenton.co.uk/2021/10/introducing-an-async-pipeline-in-c/)?

### 99 Bottles Kata

I created this as an accompaniment to [99 Bottles of OOP](https://www.sandimetz.com/99bottles/) by Sandi Metz and Katrina Owen. It is a C# implementation of *Shameless Green* that is ready for you to try out the techniques discussed in the book.

[Bottles of Beer on GitHub](https://github.com/Steve-Fenton/BottlesOfBeer)

Everything you need is in the master branch. The approval tests branch was one I created as part of an article I wrote on [Migrating to Approval Tests](https://www.stevefenton.co.uk/2018/04/migrating-existing-tests-to-approvaltests/).

### Tarnished Rose Kata

Based on the Gilded Rose Kata, Tarnished Rose is a starting point for exercises that will apply directly to anyone having to tame legacy code.

[Tarnished Rose on GitHub](https://github.com/Steve-Fenton/TarnishedRose)

There are two branches:

- master – a legacy application with *no* tests
- characterised – a legacy application with tests

If you start with master, you get to perform all the tasks of fixing legacy code, including introducing characterising tests. These tests will boost your knowledge of the code, prove the current behaviour, and give you confidence to refactor.

The characterised branch already has these tests, so if you want to get straight into the refactoring part of the exercise, you can start with that.

### Tic-tac-toe Kata

This one is from scratch. Most people know Tic-tac-toe (or noughts-and-crosses). The task is to create it…

1. The game is for two players
2. The board is a 3×3 grid
3. Each player takes it in turn to place a marker in an empty square
4. If a player gets three in a row vertically, horizontally, or diagonally; they win the game

Once achived, can the following variations can be attempted…

#### Robot Opponent

Write a computerised “Player 2” for tic-tac-toe.

#### Connect Four Extension

1. Increase the board to a 7 wide, 6 high grid
2. Make it so the grid is vertically suspended (i.e. you can’t suspend a play in mid-air it drops to the bottom)
3. Make it so you need four in a row
4. … all while still supporting the original game