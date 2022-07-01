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
  setIsMenuClicked: (clicked: boolean) => void
}

const MobileNav = (props: MobileNavProps) => {
  const {isMenuClicked, setIsMenuClicked} = props;

  // react fragment is used to reload component each time with the animation
  return (
    <>
      {isMenuClicked &&
        <HeaderNavMobileContainer isMenuClicked={isMenuClicked} onClick={() => setIsMenuClicked(false)}>
          <HeaderNavMobileOptions>
            <HeaderNavMobileOption>
              <HeaderNavMobileLink to={"/#home"}> Home </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink to={"/#about"}> About </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink to={"/#skills"}> Skills </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink to={"/#projects"}> Projects </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink to={"/#contact"}> Contact </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <Socials/>
            </HeaderNavMobileOption>
          </HeaderNavMobileOptions>
        </HeaderNavMobileContainer>}
    </>
  )
}

const NormalNav = () => {
  return (
    <HeaderNavContainer>
      <HeaderNavOptions>
        <HeaderNavOption>
          <HeaderNavLink to={"/#home"}> Home </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink to={"/#about"}> About </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink to={"/#skills"}> Skills </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink to={"/#projects"}> Projects </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink to={"/#contact"}> Contact </HeaderNavLink>
        </HeaderNavOption>
      </HeaderNavOptions>
    </HeaderNavContainer>
  );
}

export default Header;
