import styled, {keyframes} from "styled-components";

export const HomeTitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;  
  justify-content: center;
  align-items: center;
`

export const HomeTitleAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const HomeTitleText = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  width: 95%;
  color: ${props => props.theme.colors.text};
  animation: ${HomeTitleAnimation} 1s ease-in;
`

export const HomeSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

export const HomeAboutMeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
`

export const HomeSectionHeader = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`

export const HomeAboutMeText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text};
  max-width: 95%;
  
  @media (min-width: 35rem){
    max-width: 500px;
  }
`

export const HomeSkillsContainer = styled.div`
  display: grid;
  justify-content: center;
  width: calc(100% - 20px);
  pointer-events: none;
  grid-template-columns: auto auto;
  column-gap: 20px;
  margin-top: 20px;
  padding-left: 20px;

  @media (min-width: 60rem){
    grid-template-columns: auto auto auto auto;
  }
`

export const HomeProjectsSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`

export const HomeProjectsContainer = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto;
  row-gap: 40px;
  column-gap: 20px;
  width: 90%;
  margin: 10px 0 30px 0;

  @media (min-width: 60rem){
    grid-template-columns: auto auto;
  }
`

