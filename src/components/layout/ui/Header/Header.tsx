import {
  HeaderContainer,
  HeaderLink,
  HeaderTitleContainer,
  HeaderMenu,
  HeaderMenuBarOne,
  HeaderMenuBarThree,
  HeaderMenuBarTwo,
  HeaderNavMobileContainer,
  HeaderNavMobileOptions,
  HeaderNavMobileOption,
  HeaderNavMobileLink,
  HeaderNavContainer,
  HeaderNavOptions,
  HeaderNavLink,
  HeaderNavOption,
  HeaderTitleText, HeaderTitleBackground
} from "./Header.styles";
import {useState} from "react";
import Typed from 'react-typed';

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
              <HeaderNavMobileLink href={"#home"}> Home </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink href={"#about"}> About </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink href={"#skills"}> Skills </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink href={"#projects"}> Projects </HeaderNavMobileLink>
            </HeaderNavMobileOption>

            <HeaderNavMobileOption>
              <HeaderNavMobileLink href={"#contact"}> Contact </HeaderNavMobileLink>
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
          <HeaderNavLink href={"#home"}> Home </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink href={"#about"}> About </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink href={"#skills"}> Skills </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink href={"#projects"}> Projects </HeaderNavLink>
        </HeaderNavOption>

        <HeaderNavOption>
          <HeaderNavLink href={"#contact"}> Contact </HeaderNavLink>
        </HeaderNavOption>
      </HeaderNavOptions>
    </HeaderNavContainer>
  );
}

export default Header;
