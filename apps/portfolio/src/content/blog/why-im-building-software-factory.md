---
title: 'How design systems led me to build Software Factory'
caption: 'From building PInnacle at PGIM to helping small businesses own their software'
summary: 'At PGIM, we got starting an app down to one command. The part I wanted to keep working on was everything that happened after that.'
date: '2026-11-04'
category: 'Design systems'
---

When I started at PGIM, I had strong opinions about moving from Angular to React. I eventually led that move on PInnacle, our platform for internal apps. But if I had to pick one thing from that work to give another team, it wouldn’t be the framework. It would be the command that let someone start a full-stack app in under five minutes.

That command represented a lot of decisions nobody had to make again. The new app already knew how to talk to a service. A developer could try a component in Storybook before deciding to use it. I enjoyed building the apps themselves, but I _loved_ seeing another team pick up something we’d made and get straight to the part that was theirs.

## The part a starter can’t do

Once twenty apps share a foundation, the interesting work starts. Say you want to change how a component behaves. Which apps depend on the old behavior? Can you improve it for one team without surprising the other nineteen? A great first day with a starter doesn’t answer either question. You have to keep showing up for the people using it.

At Prudential, that’s what I like about working on DX, our design system. I get to build accessible components, write the examples, and help engineers use them. On PEAQ, my current structured settlements project with Prudential Retirement Strategies, I’ve been on the other side of that relationship. I refactored screens that did similar work but loaded their data differently. Someone working on one screen couldn’t carry what they’d learned over to the next.

That experience changed how I work with coding agents. They can write another version of a pattern very quickly. I'd rather give them a good pattern to follow and a way to check their work. I tried that idea on two projects that had almost nothing else in common: an order-entry dashboard and a birthday gift for my girlfriend. The gift opens on a pink 3D box. The dashboard takes orders. I still know where to look for a feature or its tests in either one. I’ve kept those conventions on this site, too.

## Why I want to build this for businesses

A friend’s party-rental business made the idea feel concrete. She knows what counts as a reservation. If she wants to change when an item becomes unavailable, that’s her decision. She shouldn’t need to learn database migrations to make it, but she _should_ be able to try the change, see what happens to existing bookings, and decide whether it goes live.

That’s why I’m building [Software Factory](/projects/software-factory/) outside work. I want the owner’s original request, the engineer’s change, the tests, and the version the owner actually tried to stay connected. And if she hires another developer a year later, I want to be able to hand them the code **and the reason the reservation works that way**. That’s what I’d want someone to leave me.
