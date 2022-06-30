import Main from "components/layout/ui/Main/Main";
import {Route, Routes, useLocation} from "react-router-dom";
import Article from "components/common/Article/Article";
import Projects from "utils/constants/projects";
import {useEffect} from "react";

// ensures that page is at the top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top: -100});
  }, [pathname]);

  return null;
}

function ProjectsPage() {
  const routes = Projects.map((project) => {
    return <Route path={project.path} element={<Article markdown={project.markdown}/>}/>
  })

  return (
    <Main>
      <ScrollToTop/>
      <Routes>
        {routes}
      </Routes>
    </Main>
  )
}

export default ProjectsPage;
