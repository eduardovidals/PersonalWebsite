import styled from "styled-components";
import {Link} from "react-router-dom";

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  background-color: ${props => props.theme.colors.project};
  border-radius: 20px;
  height: 100%;

  @media (min-width: 60em) {
    grid-column: span 2;
    &:nth-last-child(1):nth-child(odd) {
      grid-column: 2 / span 2;
    }
  }
`

export const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
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
  font-size: 0.9rem;
  margin: 15px 0 10px 0;
  text-align: center;
`

export const ProjectReadMoreButton = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 0.8rem;
  background-color: ${props => props.theme.colors.main};
  border-radius: 10px;
  font-weight: bold;
  overflow: hidden;

  &:hover {
    color: ${props => props.theme.colors.hover};
  }
`

export const ProjectReadMoreText = styled.p`
  padding: 10px 15px;
  text-align: center;
`

export const ProjectReadMoreArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #273448;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`
