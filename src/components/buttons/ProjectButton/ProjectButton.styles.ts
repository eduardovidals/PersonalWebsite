import styled from "styled-components";

export const ProjectButtonContainer = styled.a`
  display: flex;
  border: white 1px solid;
  border-radius: 10px;
  text-decoration: none;
  margin-top: 15px;
  
  &:hover {
    color: ${props => props.theme.colors.hover};
    background-color: ${props => props.theme.colors.buttonHover};
    cursor: pointer;
  }
`

export const ProjectButtonText = styled.p`
  color: ${props => props.theme.colors.text};
  padding: 8px 30px;
`
