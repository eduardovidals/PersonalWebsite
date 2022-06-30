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

  @media (min-width: 47em) {
    font-size: 2rem;
  }
`

export const HomeSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: calc(100% - 40px);
  padding: 0 20px;
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

  @media (min-width: 47em) {
    font-size: 2.5rem;
  }
`

export const HomeAboutMeText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text};
  max-width: 95%;

  @media (min-width: 35em) {
    max-width: 500px;
  }

  @media (min-width: 47em) {
    max-width: 700px;
    font-size: 1.1rem;
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

  @media (min-width: 60em) {
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
  margin: 20px 0 30px 0;

  @media (min-width: 60em) {
    grid-template-columns: repeat(4, auto);
  }
`

export const HomeContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 500px;
`

export const HomeContactReachOut = styled.div`
  margin-top: 10px;
`

interface FormResponseProps {
  error: boolean
}

export const HomeContactFormResponse = styled.p<FormResponseProps>`
  color: ${props => props.error ? '#F00' : '#0F0'};
  margin-top: 10px;
`

export const HomeContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`

