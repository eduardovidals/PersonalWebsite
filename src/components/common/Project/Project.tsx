import {ReactNode} from "react";
import Images from "utils/images";
import {
  ProjectContainer, ProjectImage, ProjectBottomContainer, ProjectTitle, ProjectDescription, ProjectButtons
} from "components/common/Project/Project.styles";
import {ProjectJson} from "utils/constants/projects";

interface ProjectProps {
  project: ProjectJson,
  aos: string,
  children?: ReactNode[] | ReactNode,
}

function Project(props: ProjectProps) {
  const {project, aos, children} = props;

  return (
    <ProjectContainer data-aos={aos}>
      <ProjectImage src={project.img}/>
      <ProjectBottomContainer>
        <ProjectTitle> {project.title} </ProjectTitle>
        <ProjectDescription>
          {project.description}
        </ProjectDescription>
        <ProjectButtons>
          {children}
        </ProjectButtons>
      </ProjectBottomContainer>
    </ProjectContainer>
  )
}

export default Project;
