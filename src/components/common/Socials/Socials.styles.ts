import styled from "styled-components";

export const SocialsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  text-align: center;
  column-gap: 15px;
  margin: 10px 0;
`

export const SocialsLink = styled.a`
  display: flex;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  column-gap: 10px;

  &:hover {
    color: ${props => props.theme.colors.hover};
    cursor: pointer;
  }
`
