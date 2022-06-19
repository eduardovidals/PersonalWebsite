import styled from "styled-components";

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  max-height: 500px;
  background-color: ${props => props.theme.colors.project};
    border-radius: 20px;
    height: 100%;
`

export const ProjectImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

export const ProjectBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: calc(100% - 20px);
  padding: 10px;
`

export const ProjectTitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
`

export const ProjectDescription = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
`

export const ProjectButtons = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
  justify-content: space-evenly;
`
