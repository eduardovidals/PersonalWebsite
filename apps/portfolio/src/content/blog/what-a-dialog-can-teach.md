---
title: 'What a dialog can teach the next developer'
summary: 'How I’d document and test a shared dialog before other teams use it.'
date: '2026-11-04'
category: 'Design systems'
---

Open a dialog with a keyboard, cancel, and press Tab. Where are you now? If the button that opened it is still on the page, you’d usually expect to be back there, ready to continue. If focus landed at the top of the page instead, the dialog *looked* like it closed correctly. You still lost your place.

This is easy to miss in a screenshot. To catch it, you have to open the dialog, close it, and try to keep using the page.

## What I’d leave behind

I’d put the focus behavior in the shared dialog. I’d give it an example you can try with just a keyboard. And I’d write a test that opens the dialog from a button, dismisses it, and checks where focus lands. Now a developer can see the intent, use it, and change the implementation without accidentally losing the behavior. There’s no need to make every application team rediscover the same bug.

A coding agent benefits from exactly the same setup. Instead of asking it to invent an accessible dialog from a description, you can point it to the component the team already maintains. But take the agent away and the example and test are still useful.
