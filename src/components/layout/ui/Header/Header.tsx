import {
  HeaderContainer, HeaderLink, HeaderTitleContainer, HeaderMenu, HeaderMenuBarOne, HeaderMenuBarThree,
  HeaderMenuBarTwo, HeaderNavMobileContainer, HeaderNavMobileOptions, HeaderNavMobileOption, HeaderNavMobileLink,
  HeaderNavContainer, HeaderNavOptions, HeaderNavLink, HeaderNavOption, HeaderTitleText, HeaderTitleBackground
} from "./Header.styles";
import React, {useState} from "react";
import Typed from 'react-typed';
import Socials from "components/common/Socials/Socials";

function Header() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const onAnimationComplete = () => {
    setShowCursor(false);
  }

  return (
    <>
      {
        !showCursor ?
          <HeaderTitleText to={'/'} onClick={() => window.scrollTo(0, 0)}> EV </HeaderTitleText>
          :
          <HeaderTitleBackground>
            <HeaderTitleContainer>
              <HeaderLink to={'/'}>
                <Typed strings={["Eduardo Vidals", "EV"]} typeSpeed={30} backSpeed={40}
                       onComplete={onAnimationComplete}/>
              </HeaderLink>
            </HeaderTitleContainer>
          </HeaderTitleBackground>
      }

      { /* Mobile nav is used because 100vh does not appear well in mobile phones, so two nav bars are needed */}
      <MobileNav isMenuClicked={isMenuClicked} setIsMenuClicked={setIsMenuClicked}/>
      <HeaderContainer>
        <NormalNav/>
      </HeaderContainer>

      <HeaderMenu onClick={() => setIsMenuClicked(!isMenuClicked)}>
        <HeaderMenuBarOne isMenuClicked={isMenuClicked}/>
        <HeaderMenuBarTwo isMenuClicked={isMenuClicked}/>
        <HeaderMenuBarThree isMenuClicked={isMenuClicked}/>
      </HeaderMenu>
    </>
  )
}

interface MobileNavProps {
  isMenuClicked: boolean,
  setIsMenuClicked: (clicked: boolean) => void,
}

const MobileNav = (props: MobileNavProps) => {
  const {isMenuClicked, setIsMenuClicked} = props;
  const paths = ['/#home', '/#about', '/#skills', '/#projects', '/#contact']
  const sections = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  const mobileOptions = paths.map((path, index) => {
    return (
      <HeaderNavMobileOption onClick={() => setIsMenuClicked(false)} key={`mobile-nav-${index}`}>
        <HeaderNavMobileLink to={path}> {sections[index]} </HeaderNavMobileLink>
      </HeaderNavMobileOption>
    )
  })

  // react fragment is used to reload component each time with the animation
  return (
    <>
      <HeaderNavMobileContainer isMenuClicked={isMenuClicked}>
        <HeaderNavMobileOptions onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsMenuClicked(false);
          }
        }}>
          {mobileOptions}
          <HeaderNavMobileOption>
            <Socials/>
          </HeaderNavMobileOption>
        </HeaderNavMobileOptions>
      </HeaderNavMobileContainer>
    </>
  )
}

const NormalNav = () => {
  const paths = ['/#home', '/#about', '/#skills', '/#projects', '/#contact']
  const sections = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  const options = paths.map((path, index) => {
    return (
      <HeaderNavOption key={`normal-nav-${index}`}>
        <HeaderNavLink to={path}> {sections[index]} </HeaderNavLink>
      </HeaderNavOption>
    )
  })

  return (
    <HeaderNavContainer>
      <HeaderNavOptions>
        {options}
      </HeaderNavOptions>
    </HeaderNavContainer>
  );
}

export default Header;
