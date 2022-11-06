---
layout: src/layouts/Default.astro
title: 'The State Pattern'
navMenu: false
pubDate: 2011-10-19T17:29:43+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Patterns
---

I have been looking at the State Pattern and I have noticed that the examples of the State Pattern online can be a bit confusing. This is largely due to the challenge of simplifying the code enough to make the example short.

So this is my example of the State Pattern, a bit more complex than most examples, but happily demonstrating what it is all about. The examples are written in C#, but you can easily apply the concept to any object-oriented language.

I will start with an example of the code that calls into our example.

```csharp
CallStateContext callState = new CallStateContext(new RingingState());

// Let's answer the call
callState.Answer();

// Now put the call on hold
callState.Hold();

// Retrieve the call from hold
callState.Retrieve();

// End the call
callState.Disconnect();
```

If you look at this code, it looks like you create a CallStateContext and then call methods on it such as “Answer”, “Hold” or “Retrieve”. To the calling code, it looks like a single object that knows what to do with all of these requests and that can also validate that each transition is valid. If this was the case (it isn’t) we could expect to see a grand series of if and switch statements that split down lots of logical branches in the code. If you made a change or introduced a new state, all of those if and switch statements would need to be revised and tested. This is one of the problems the State Pattern wants to solve.

## So how does it work?

Actually, the State Pattern is a clever variation on the Strategy Pattern. In the Strategy Pattern we create an interface for our class that means we can switch our actual implementation if we want to. Normally, we do this so we can pass a mock object instead of the real object when we perform a test.

The state pattern takes this idea a step further by allowing the object to be switched at any time. It uses this switch to replace the current state object with a new state object. So in our example or a phone call, the following happens.

- We create CallStateContext and start it in the “RingingState”.
- We call callState.Answer() – this actually calls RingingState.Answer() under the hood, and RingingState replaces itself with ActiveState
- When we call callState.Hold() this actually calls ActiveState.Hold() – remember, RingingState replaced itself with ActiveState, so our new call now goes to ActiveState. In this case, ActiveState replaces itself with HeldState…
- By now, you should be thinking “the next call I make will actually result in a method call on HeldState” – you are correct!
So how do we keep replacing these different state objects – let’s look at some code. First of all, here is the interface for our ICallStateContext – this dictates all the methods that can be called on our CallStateContext object when we create it…

```csharp
public interface ICallStateContext
{
    void Answer();
    void Hold();
    void Retrieve();
    void Disconnect();
}
```

These all look sensible right? We have some methods that describe transitions we want to make between states. For example, Disconnect() is the transition from ActiveState to NullState, or from HoldState to NullState (or from any state to any other state depending on the context).

Here is the full implementation of CallStateContext. In a real world example, it would contain more “context”, i.e. any data that is required to perform the state transitions, for example a CallId.

```csharp
public class CallStateContext
           : ICallStateContext
{
    private CallState _state;

    public CallStateContext(CallState state)
    {
        _state = state;
    }

    public CallState State
    {
        get { return _state; }
        set { _state = value; }
    }

    public void Answer()
    {
        _state.Answer(this);
    }

    public void Hold()
    {
        _state.Hold(this);
    }

    public void Retrieve()
    {
        _state.Retrieve(this);
    }

    public void Disconnect()
    {
        _state.Disconnect(this);
    }
}
```

Note that the CallStateContext doesn’t perform any transitions, it calls the CallState `_state` object to do this. It is this `_state` member that will be replaced with the different states at runtime. The CallStateContext also doesn’t decide what goes in this field, this is actually decided by each state. This means that if you call Hold when you are in the ActiveState, you can decide to transition to HeldState. If you call Hold when you are in the RingingState, you might decide that this maps to QueuedState. All of these implementation details are encapsulated within each different state, with no switch or if statements necessary.

So what do the states look like. All of our states are based on an abstract class called CallState.

CallState abstract base class

```csharp
public abstract class CallState
{
    public abstract void Answer(CallStateContext context);
    public abstract void Hold(CallStateContext context);
    public abstract void Retrieve(CallStateContext context);
    public abstract void Disconnect(CallStateContext context);
}
```

We can implement any number of states that can each have a different implementation of these methods. Each concrete state will decide whether a transition is allowed (and what to do if it isn’t), how the transition takes place and what the next state will be after the transition.

In the following example concrete state, ActiveState, I have removed all implementation about how the transition takes place (for example, a call to a telephony component to signal that the call is being picked up) but left in the validation and the setting of the new state.

```csharp
public class ActiveState
           : CallState
{
    public override void Answer(CallStateContext context)
    {
        throw new Exception("You cannot Answer from an Active state.");
    }

    public override void Hold(CallStateContext context)
    {
        context.State = new HeldState();
    }

    public override void Retrieve(CallStateContext context)
    {
        context.State = this;
    }

    public override void Disconnect(CallStateContext context)
    {
        context.State = new NullState();
    }
}
```

This shows how you cannot Answer an active call. This makes sense because if it is active, it has already been answered. The validation failure might throw an exception, write a log or simply ignore the request – the correct decision in this respect should be dictated by the problem you are trying to solve.

For the Hold transition, the method replaces context.State (which currently contains the instance of ActiveState) with an instance of HeldState – so any future calls to our CallStateContext will be processed by the HeldState class until it replaces itself with another implementation of CallState.

In the Retrieve transition, I have set the ActiveState to be the next state – you could opt to do nothing, as the ActiveState is already the current state, but I think it makes the intention clear when you specify that ActiveState should continue to be the current state.

You can continue these ideas in the HeldState implementation of CallState.

```csharp
public class HeldState
           : CallState
{
    public override void Answer(CallStateContext context)
    {
        throw new Exception("You cannot Answer from an Held state.");
    }

    public override void Hold(CallStateContext context)
    {
        context.State = this;
    }

    public override void Retrieve(CallStateContext context)
    {
        context.State = new ActiveState();
    }

    public override void Disconnect(CallStateContext context)
    {
        context.State = new NullState();
    }
}
```

And that is the State Pattern. It replaces lots of logical branches in your code with a tidy and extensible mechanism for handling state.

The one problem you can have with this pattern is that if you have a large number of transitions each CallState keeps growing, and many of the transitions may not be relevant to all CallState objects. One suggestion I have read on this is that you could create interfaces that contain sections of logic, for example ICanAnswer, ICanHold, ICanRetrieve and so on. You could then detect these interfaces in CallStateContext in order to tell if the transition is allowed.

I would prefer to have default implementations on the base CallState class that ignore or except for each method and simply override only the transitions that are relevant to the particular implementation of CallState. For example our ActiveState would look like this:

```csharp
public class ActiveState
           : CallState
{
    public override void Hold(CallStateContext context)
    {
        context.State = new HeldState();
    }

    public override void Retrieve(CallStateContext context)
    {
        context.State = this;
    }

    public override void Disconnect(CallStateContext context)
    {
        context.State = new NullState();
    }
}
```

We no longer specify the Answer method, which is irrelevant to our ActiveState. The call would then fall to our base class, which has a default to throw the exception or to ignore the request:

```csharp
public class CallState
{
    public virtual void Answer(CallStateContext context)
    {
        // Ignore
    }

    ....
```

Have fun using the State Pattern!