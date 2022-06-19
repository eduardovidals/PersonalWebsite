import Images from "utils/images";

export interface ProjectJson {
  img: string,
  title: string,
  description: string,
}

interface Projects {
  [name: string]: ProjectJson
}

const projects: Projects = {
  sortingVisualizer: {
    img: Images.sortingProject,
    title: "Sorting Visualizer",
    description: 'A Sorting Visualizer built using React & Typescript, which visualizes sorting algorithms such as Merge Sort, Quick Sort, and Heap Sort.'
  },
  pathfindingVisualizer: {
    img: Images.pathfindingProject,
    title: 'Pathfinding Visualizer',
    description: 'A Pathfinding Visualizer built using React & Typescript, which visualizes pathfinding algorithms such as DFS, BFS, Dijkstra, A*, and Best-First Search.'
  }
}

export default projects;

