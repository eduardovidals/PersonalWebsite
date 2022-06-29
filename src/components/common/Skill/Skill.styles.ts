import styled from "styled-components";

export const SkillContainer = styled.div`
  display: flex;
  pointer-events: none;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 10px;
`

export const SkillImage = styled.img`
  height: 50px;

  @media (min-width: 47em){
    height: 60px;
  }

  @media (min-width: 60em){
    height: 70px;
  }
`

export const SkillText = styled.p`
  margin-top: 10px;
  font-size: 1rem;

  @media (min-width: 47em){
    font-size: 1.2rem;
  }
`
