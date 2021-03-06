import {SkillContainer, SkillImage, SkillText} from "components/common/Skill/Skill.styles";

interface SkillProps {
  aos: string,
  img: string,
  skill: string
}

function Skill(props: SkillProps) {
  const {aos, img, skill} = props;

  return (
    <SkillContainer data-aos={aos} data-aos-duration={2000}>
      <SkillImage src={img}/>
      <SkillText> {skill} </SkillText>
    </SkillContainer>
  )
}

export default Skill;
