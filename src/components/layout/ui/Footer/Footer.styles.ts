import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 10px;
  width: calc(100% - 20px);
  background-color: ${props => props.theme.colors.main};
  overflow-y: hidden;
`

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  row-gap: 10px;
`

export const FooterConnectText = styled.p`
  color: ${props => props.theme.colors.text}
`

export const SocialIconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  text-align: center;
  column-gap: 15px;
  
  @media (min-width: 47em){
    column-gap: 30px;
  }
`

export const SocialIconLink = styled.a`
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

export const SocialIconText = styled.p`
  display: none;
  font-size: 1.2rem;

  @media (min-width: 47em) {
    display: flex;
    align-items: center;
  }
`
