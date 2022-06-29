import styled, {keyframes} from 'styled-components'
import {Link} from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

export const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  height: 80px;
  width: calc(100% - 30px);
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.text};
  padding: 0 15px;
  z-index: 1;
`

export const HeaderTitleAnimation = keyframes`
  0% {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  50% {
    top: 15px;
    left: 15px;
    transform: translate(0, 0);
    z-index: 2;
  }

  60% {
    transform: scale(0.8);
    color: #98D6E8;
  }

  75% {
    transform: scale(1.1);
    color: #98b5e5;
  }

  90% {
    transform: scale(1);
    color: #c8d1ff;
  }
`

export const HeaderLink = styled(Link)`   
  text-decoration: none;
  color: ${props => props.theme.colors.text};
`

export const HeaderTitleBackground = styled.div`
  position: fixed;
  height: calc(100% - 80px);
  width: 100%;
  background-color: ${props => props.theme.colors.titleBackground};
  margin-top: 80px;
  z-index: 2;
`

export const HeaderTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed; 
  font-size: 2.5rem;
  letter-spacing: 3px;
  width: 95%;
  z-index: 1;
  font-weight: bold;
  pointer-events: none; // needed to allow scroll events when user scrolls on the typed component
  color: ${props => props.theme.colors.text};
  &:hover {
    color: ${props => props.theme.colors.hover}
  }
`

export const HeaderTitleText = styled(Link)`
  top: 15px;
  left: 15px;
  position: fixed;
  font-size: 2.5rem;
  animation: ${HeaderTitleAnimation} 1.5s ease;
  letter-spacing: 3px;
  font-weight: bold;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  z-index: 2;
  
  &:hover {
    color: ${props => props.theme.colors.hover}
  }
`

export const HeaderMenu = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  row-gap: 6px;
  z-index: 2;
  top: 25px;
  right: 15px;
`

interface BarProps {
  isMenuClicked?: boolean
}

export const HeaderMenuBar = styled.div<BarProps>`
  width: 40px;
  height: 5px;
  background-color: ${props => props.theme.colors.text};
  transition: 500ms;
  z-index: 1;

  @media (min-width: 47em) {
    display: none;
  }
`

export const HeaderMenuBarOne = styled(HeaderMenuBar)`
  transform: ${props => props.isMenuClicked ? "rotate(-45deg) translate(-8px, 8px)" : ""};
`

export const HeaderMenuBarTwo = styled(HeaderMenuBar)`
  opacity: ${props => props.isMenuClicked ? '0' : '1'};
`

export const HeaderMenuBarThree = styled(HeaderMenuBar)`
  transform: ${props => props.isMenuClicked ? "rotate(45deg) translate(-7px, -8px)" : ""};
`

export const HeaderNavMobileContainerAnimation = keyframes`
  from {
    left: 100%;
  }
  
  to {
    left: 0;
  }
`

export const HeaderNavMobileContainer = styled.nav<BarProps>`
  display: ${props => props.isMenuClicked ? 'flex' : 'none'};
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: ${props => props.theme.colors.mobileBackground};
  animation: ${HeaderNavMobileContainerAnimation} 500ms ease;
  z-index: 2;
  
  @media (min-width: 47em) {
    display: none;
  }
`

export const HeaderNavMobileOptions = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 80px 0;
  height: calc(100vh - 160px);
  list-style: none;
  row-gap: 30px;
  font-size: 1.5rem;
`

export const HeaderNavMobileOption = styled.li`
  &:hover {
    color: ${props => props.theme.colors.hover}
  }
`

export const HeaderNavMobileLink = styled(HashLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.text}
`

export const HeaderNavContainer = styled.nav<BarProps>`
  display: none;
  @media (min-width: 47em) {
    display: flex;
    flex-direction: row;
  }
`

export const HeaderNavOptions = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  height: 100%;
  justify-content: flex-end;
  column-gap: 20px;
  font-size: 1.3rem;
`

export const HeaderNavLink = styled(HashLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.text}
`

export const HeaderNavOption = styled.li`

`
