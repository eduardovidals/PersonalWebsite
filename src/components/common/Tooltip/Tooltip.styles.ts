import styled, {keyframes} from "styled-components";

export const TooltipContainer = styled.div`
  position: relative;
`

export const TooltipAnimation = keyframes`
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

export const TooltipText = styled.span<TooltipTextProps>`
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
  animation: ${TooltipAnimation};
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
