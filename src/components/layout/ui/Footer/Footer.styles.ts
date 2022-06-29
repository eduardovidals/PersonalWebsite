import styled, {keyframes} from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  overflow-y: hidden;
  padding-top: 60px;
  padding-bottom: 40px;
`

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  row-gap: 10px;
`

export const SocialIconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  text-align: center;
  column-gap: 15px;
  margin: 10px 0;
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

export const SocialIconTooltip = styled.div`
  position: relative;
`

export const SocialIconTooltipAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

interface TooltipTextProps {
  active: boolean
}

export const SocialIconTooltipText = styled.span<TooltipTextProps>`
  display: ${props => props.active ? 'initial' : 'none'};
  background-color: ${props => props.theme.colors.button};
  font-size: 1rem;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  width: 140px;
  padding: 5px;
  left: -60px;
  bottom: 150%;
  animation: ${SocialIconTooltipAnimation};
  animation-duration: 150ms;
  animation-timing-function: ease-in;
  animation-iteration-count: initial;
  animation-fill-mode: forwards;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.theme.colors.button} transparent transparent transparent;
  }
`

export const FooterRightsText = styled.p`
  margin-top: 10px;
  text-align: center;
`
