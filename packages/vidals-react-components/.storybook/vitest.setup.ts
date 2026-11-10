import { configure } from 'storybook/test';

// Shared CI runners render WebKit far slower than a laptop. Give fades and entering animations
// time to finish before a story's `findBy` query or `waitFor` gives up.
configure({ asyncUtilTimeout: 5000 });
