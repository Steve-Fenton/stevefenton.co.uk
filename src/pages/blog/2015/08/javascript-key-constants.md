---
title: 'JavaScript key constants'
navMenu: false
pubDate: 2015-08-17T07:30:55+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

If you are fed up of looking up JavaScript key mappings every time you want to deal with a keyboard press, and each time you read someone else’s keyboard event handler… and every time you revisit a keyboard event handler that you wrote a while back – here is a set of constants you can use instead. If you are using any kind of reasonable text editor or IDE, you’ll get auto-completion as well as improved readability:

```javascript
var KEY = {
    SPACE: 32,
    NUM_0: 48,
    NUM_1: 49,
    NUM_2: 50,
    NUM_3: 51,
    NUM_4: 52,
    NUM_5: 53,
    NUM_6: 54,
    NUM_7: 55,
    NUM_8: 56,
    NUM_9: 57,
    SEMI_COLON: 59,
    EQUALS: 61,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    NUM_PAD_0: 96,
    NUM_PAD_1: 97,
    NUM_PAD_2: 98,
    NUM_PAD_3: 99,
    NUM_PAD_4: 100,
    NUM_PAD_5: 101,
    NUM_PAD_6: 102,
    NUM_PAD_7: 103,
    NUM_PAD_8: 104,
    NUM_PAD_9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SEPARATOR: 108,
    SUBTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    BACK_QUOTE: 192,
    OPEN_BRACKET: 219,
    BACK_SLASH: 220,
    CLOSE_BRACKET: 221,
    QUOTE: 222,
    META: 224
};
    
var SPECIAL_KEY = {
    CANCEL: 3,
    HELP: 6,
    BACK_SPACE: 8,
    TAB: 9,
    CLEAR: 12,
    ENTER: 13,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: KEY.SPACE,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    CONTEXT_MENU: 93,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    F16: 127,
    F17: 128,
    F18: 129,
    F19: 130,
    F20: 131,
    F21: 132,
    F22: 133,
    F23: 134,
    F24: 135,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145
};
```

The keys constants are “character keys” – letters, numbers, and other printable characters. The special keys are tabs, enter keys, function keys (you won’t get these if the browser handles them first), and other non-printable characters. I have put “SPACE” in both because I can imagine people thinking “that’s a special key” – even though it is printable. The value is only defined once though. Re-use that pattern if you need to do this.

You use them as simply as…

```javascript
if (event.which === KEY.SEMI_COLON) //...
```

If you want the compact version… it is here:

```javascript
var KEY={SPACE:32,NUM_0:48,NUM_1:49,NUM_2:50,NUM_3:51,NUM_4:52,NUM_5:53,NUM_6:54,NUM_7:55,NUM_8:56,NUM_9:57,SEMI_COLON:59,EQUALS:61,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUM_PAD_0:96,NUM_PAD_1:97,NUM_PAD_2:98,NUM_PAD_3:99,NUM_PAD_4:100,NUM_PAD_5:101,NUM_PAD_6:102,NUM_PAD_7:103,NUM_PAD_8:104,NUM_PAD_9:105,MULTIPLY:106,ADD:107,SEPARATOR:108,SUBTRACT:109,DECIMAL:110,DIVIDE:111,COMMA:188,PERIOD:190,SLASH:191,BACK_QUOTE:192,OPEN_BRACKET:219,BACK_SLASH:220,CLOSE_BRACKET:221,QUOTE:222,META:224},SPECIAL_KEY={CANCEL:3,HELP:6,BACK_SPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:KEY.SPACE,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,CONTEXT_MENU:93,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,F16:127,F17:128,F18:129,F19:130,F20:131,F21:132,F22:133,F23:134,F24:135,NUM_LOCK:144,SCROLL_LOCK:145};
```