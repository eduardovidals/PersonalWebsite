---
title: 'The search is not the path'
summary: 'On a pathfinding grid, the squares an algorithm visits tell a different story from the route it finally chooses.'
date: '2022-06-29'
category: 'Pathfinding'
sourceUrl: 'https://github.com/eduardovidals/PersonalWebsite/blob/5911b927e82a1ea1bcb5d22c1b8ac07da113cb2e/src/utils/constants/markdown.ts#L40'
---

The first version of my pathfinding visualizer had a button that ran depth-first search. Before adding walls, weights, or even speed controls, I wanted to show two things: where the search had been, and how it got from start to finish.

## A dead end belongs in one picture

Imagine a fork in a corridor. The left branch ends at a wall; the right one leads to the goal. If depth-first search tries the left branch first, every square it explores there is part of the search. None of those squares belongs on the final route.

Painting only the route hides that detour. Painting every visited square as the route makes the detour look necessary. In AlgoVisual, I animated the searched nodes and the path nodes separately. Watching the search unfold explains something the finished line can't: what the algorithm had to discover along the way.

## Clear the path, keep the experiment

That distinction also matters after the animation stops. Clearing the whole grid throws away the walls and weights along with the result. Clearing just the path lets you keep the problem and try a different search on it.

Try it in [AlgoVisual](https://eduardovidals.github.io/AlgoVisual/): give the grid a dead end, run a depth-first search, then leave the obstacles in place and try Dijkstra's algorithm. Look at the explored area before comparing the routes. Two searches can agree on where to go without agreeing on where to look.
