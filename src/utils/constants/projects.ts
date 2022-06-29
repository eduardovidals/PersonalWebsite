import Images from "utils/images";
import * as Markdown from "utils/constants/markdown";

export interface IProject {
  img: string,
  title: string,
  description: string,
  path: string,
  markdown: string
}

export const Projects: IProject[] = [
  {
    img: Images.propsLogo,
    title: 'Props',
    description: `A React-Redux website built using Typescript, allowing users to sign up and make purchases towards
    subscription plans.`,
    path: 'props',
    markdown: Markdown.propsMarkdown
  },
  {
    img: Images.benevLogo,
    title: 'Benev',
    description: `A React-Redux website built using Typescript, allowing users to sign up & make purchases towards
    subscription plans, which utilized Stripe's API for front-end and back-end.`,
    path: 'benev',
    markdown: Markdown.benevMarkdown
  },
  {
    img: Images.sortingProject,
    title: "Sorting Visualizer",
    description: `A Sorting Visualizer built using React & Typescript, which visualizes sorting algorithms 
    such as Merge Sort, Quick Sort, and Heap Sort.`,
    path: 'sorting-visualizer',
    markdown: Markdown.sortingVisualizerMarkdown
  },
  {
    img: Images.pathfindingProject,
    title: 'Pathfinding Visualizer',
    description: `A Pathfinding Visualizer built using React & Typescript, which visualizes pathfinding 
    algorithms such as DFS, BFS, Dijkstra, A*, and Best-First Search.`,
    path: 'pathfinding-visualizer',
    markdown: Markdown.pathfindingVisualizerMarkdown
  },
  {
    img: Images.threeJSSortingVisualizer,
    title: '3D Sorting Visualizer',
    description: `A 3D Sorting Visualizer built using React & Three.js, allowing you to roam around the environment
    and see the visualization of sorting algorithms in real-time.`,
    path: '3d-sorting-visualizer',
    markdown: Markdown.threeJSSortingVisualizerMarkdown
  },
  {
    img: Images.solarSystem,
    title: 'Solar System',
    description: `A Solar System built using React & Three.js that lets you to move around space.`,
    path: 'solar-system',
    markdown: Markdown.solarSystemMarkdown
  }
]

export default Projects;

