import Images from "utils/images";
import {sortingVisualizerMarkdown} from "utils/constants/markdown";

export interface IProject {
  img: string,
  title: string,
  description: string,
  path: string,
  markdown: string
}

interface IProjects {
  [name: string]: IProject
}

export const Projects: IProjects = {
  sortingVisualizer: {
    img: Images.sortingProject,
    title: "Sorting Visualizer",
    description: `A Sorting Visualizer built using React & Typescript, which visualizes sorting algorithms 
    such as Merge Sort, Quick Sort, and Heap Sort.`,
    path: 'sorting-visualizer',
    markdown: sortingVisualizerMarkdown
  },
  pathfindingVisualizer: {
    img: Images.pathfindingProject,
    title: 'Pathfinding Visualizer',
    description: `A Pathfinding Visualizer built using React & Typescript, which visualizes pathfinding 
    algorithms such as DFS, BFS, Dijkstra, A*, and Best-First Search.`,
    path: 'pathfinding-visualizer',
    markdown: sortingVisualizerMarkdown
  }
}

export default Projects;

