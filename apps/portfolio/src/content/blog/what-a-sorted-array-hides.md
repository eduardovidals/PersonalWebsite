---
title: 'What a sorted array hides'
caption: 'Merge sort, quicksort, and heapsort before the bars fall into place'
summary: 'Merge sort, quicksort, and heapsort can produce exactly the same bars. The interesting part happens before the last frame.'
date: '2022-06-21'
category: 'Sorting'
sourceUrl: 'https://github.com/eduardovidals/PersonalWebsite/blob/81596fdb1b343ae53d4292f0ba12b5816c92c9b9/src/utils/constants/markdown.ts#L3'
---

Give three sorting algorithms the same list and save a picture of each result. If the algorithms did their job, you have three identical pictures. That's why I wanted to build a sorting visualizer: the answer is easy to check, but it says very little about how you got there.

After studying Robert Sedgewick and Kevin Wayne's algorithms courses, I built the first piece of AlgoVisual in React. Inspired by [Clément Mihailescu's sorting visualizer](https://github.com/clementmihailescu/Sorting-Visualizer), it puts merge sort, quicksort, and heapsort into motion.

## Watch four numbers instead of forty

Take the list `8, 3, 6, 1`. One way to follow merge sort is to look for the moment when the two halves are each in order:

```text
Start       [8, 3]  [6, 1]
Sort halves [3, 8]  [1, 6]
Merge       [1, 3, 6, 8]
```

During the merge, the only candidates for the next place are the first unused numbers in each half. First compare 3 and 1. Take 1, and the next comparison is 3 against 6. You don't need to check 8 yet: its place behind 3 tells you enough.

## A different thing to look for

With quicksort, look for a partition around a pivot instead of two sorted halves. With heapsort, watch the largest remaining value move to the end of the unsorted region. The bars finish in the same places; the useful question is what you know about them _before_ they're all in order.

You can [run the visualizer](https://eduardovidals.github.io/AlgoVisual/) and compare the three. Pick a single bar and follow it through a run. It's easier to notice the difference when you're watching one number rather than an entire screen.
