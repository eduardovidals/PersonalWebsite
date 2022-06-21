import Main from "components/layout/ui/Main/Main";
import {Route, Routes} from "react-router-dom";
import Article from "components/common/Article/Article";
import Projects from "utils/constants/projects";

function ProjectsPage() {
  return (
    <Main>
      <Routes>
        <Route path={Projects.sortingVisualizer.path}
               element={<Article markdown={Projects.sortingVisualizer.markdown}/>}/>
        <Route path={Projects.pathfindingVisualizer.path}
               element={<Article markdown={Projects.pathfindingVisualizer.markdown}/>}/>
      </Routes>
    </Main>
  )
}

export default ProjectsPage;
