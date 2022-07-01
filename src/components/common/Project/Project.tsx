import {
  ProjectContainer,
  ProjectImage,
  ProjectBottomContainer,
  ProjectTitle,
  ProjectDescription,
  ProjectReadMoreButton, ProjectReadMoreText, ProjectReadMoreArrowContainer
} from "components/common/Project/Project.styles";
import {IProject} from "utils/constants/projects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ProjectProps {
  project: IProject,
  aos: string,
}

function Project(props: ProjectProps) {
  const {project, aos} = props;

  return (
    <ProjectContainer data-aos={aos} data-aos-duration={2000}>
      <ProjectImage src={project.img}/>
      <ProjectBottomContainer>
        <ProjectTitle> {project.title} </ProjectTitle>
        <ProjectDescription>
          {project.description}
        </ProjectDescription>
        <ProjectReadMoreButton to={`projects/${project.path}`}>
          <ProjectReadMoreText> READ MORE </ProjectReadMoreText>
          <ProjectReadMoreArrowContainer>
            <FontAwesomeIcon icon={'angle-right'}/>
          </ProjectReadMoreArrowContainer>
        </ProjectReadMoreButton>
      </ProjectBottomContainer>
    </ProjectContainer>
  )
}

export default Project;
