import {ProjectButtonContainer, ProjectButtonText} from 'components/buttons/ProjectButton/ProjectButton.styles'

interface ProjectButtonProps {
  link: string,
  text: string
}

function ProjectButton(props: ProjectButtonProps){
  const {link, text} = props;
  return (
    <ProjectButtonContainer href={link} target={'_blank'}>
      <ProjectButtonText> {text} </ProjectButtonText>
    </ProjectButtonContainer>
  )
}

export default ProjectButton;
