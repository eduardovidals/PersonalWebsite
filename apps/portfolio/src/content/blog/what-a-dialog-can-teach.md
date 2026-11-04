---
title: 'What a dialog can teach the next developer'
summary: 'Closing a dialog is easy to demo with a mouse. Where the keyboard goes afterward is the part worth passing on.'
date: '2026-11-04'
category: 'Design systems'
---

Open a dialog with a keyboard, cancel, and press Tab. Where are you now? If the button that opened it is still on the page, you’d usually expect to be back there, ready to continue. If focus landed at the top of the page instead, the dialog *looked* like it closed correctly. You still lost your place.

That’s the kind of detail that got me into design systems. Someone has to discover the problem, understand who it affects, and work out the right behavior. It would be a shame if the only thing the next developer got out of that was a screenshot.

## What I’d leave behind

I’d put the focus behavior in the shared dialog. I’d give it an example you can try with just a keyboard. And I’d write a test that opens the dialog from a button, dismisses it, and checks where focus lands. Now a developer can see the intent, use it, and change the implementation without accidentally losing the behavior. There’s no need to make every application team rediscover the same bug.

A coding agent benefits from exactly the same setup. Instead of asking it to invent an accessible dialog from a description, you can point it to the component the team already maintains. But take the agent away and the example and test are still useful.

That last part matters to me. It’s the connection between my design-system work and [Software Factory](/projects/software-factory/). The useful thing one project leaves the next isn’t always a piece of UI. Sometimes it’s knowing what should *still* be true after someone changes the code.
