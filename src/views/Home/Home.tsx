import {
  HomeSectionContainer, HomeSectionHeader, HomeAboutMeText, HomeAboutMeTextContainer, HomeTitleContainer,
  HomeTitleText, HomeSkillsContainer, HomeProjectsContainer, HomeProjectsSectionContainer
} from "views/Home/Home.styles";
import Typed from "react-typed";
import React, {useEffect, useRef, useState} from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import Images from "utils/images";
import Skill from "components/common/Skill/Skill";
import Project from "components/common/Project/Project";
import Projects from "utils/constants/projects";
import "./Home.css"
import Main from "components/layout/ui/Main/Main";
import {useAppDispatch, useAppSelector} from "store/hooks";
import emailjs from '@emailjs/browser';
import FormContact from "views/FormFlow/FormContact/FormContact";
import FormSuccess from "views/FormFlow/FormSuccess/FormSuccess";

const typedStrings = ["Software Engineer.", "Developer.", "Programmer."];


function Home() {
  // inner height is used to conform to mobile and desktop views as 100vh does not react well on mobile
  // this ensures that the home typed text is in the middle of the screen for both mobile and desktop
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const count = useAppSelector(state => state.header);
  const formScreen = useAppSelector(state => state.formScreen);
  const titleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    Aos.init();

    document.addEventListener("scroll", () => {
      if (!aboutRef.current) return;

      if (aboutRef.current.getBoundingClientRect().top - 20 <= window.innerHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    });
  }, [])

  const showScreen = (screen: string) => {
    switch (screen) {
      case 'FormContactScreen':
        return <FormContact/>;
      case 'FormSuccessScreen':
        return <FormSuccess/>;
      default:
        return <FormContact/>;
    }
  }

  const renderTypedComponent = () => {
    // upon load, if it's a user's first time rendering, then nothing is returned
    // count starts as 0 in redux, increments after 2200ms, which then loads the component below
    if (!count) return;

    return (
      <HomeTitleText> Hello, I'm Eduardo, a&nbsp;
        <span>
          <Typed strings={typedStrings} typeSpeed={40} backSpeed={50} loop={true} startDelay={1000}/>
        </span>
      </HomeTitleText>
    )
  }

  const projects = Projects.map((project, index) => {
    return (
      <Project project={project} aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} key={project.title}/>
    )
  })

  return (
    <Main>
      <HomeTitleContainer style={{height: containerHeight.toString() + 'px'}} id={"home"} ref={titleRef}>
        {renderTypedComponent()}
        <a className={`ca3-scroll-down-link ca3-scroll-down-arrow ${!isVisible ? 'fade' : ''}`}/>
      </HomeTitleContainer>

      <HomeSectionContainer id={"about"}>
        <HomeAboutMeTextContainer>
          <HomeSectionHeader ref={aboutRef}> About me </HomeSectionHeader>
          <HomeAboutMeText data-aos="fade-up" data-aos-duration={2000}>
            I am currently working as a Software Engineer Intern at PGIM. I am also the Director of the Software
            Development Club at NJCU, where we help students gain an insight of modern technologies and best
            practices. In the future, I aspire to become a full-time Software Engineer and gain many relevant
            skills to become a great asset to big-tech companies.
            <br/>
            <br/>
            P.S. I also love running!
            <br/>
            <br/>
            Scroll down to check out my technical skills and personal projects! 😊
          </HomeAboutMeText>
        </HomeAboutMeTextContainer>
      </HomeSectionContainer>

      <HomeSectionContainer id={'skills'}>
        <HomeSectionHeader> Technical Skills </HomeSectionHeader>
        <HomeSkillsContainer>
          <Skill aos={'fade-right-skill'} img={Images.javaLogo} skill={'Java'}/>
          <Skill aos={'fade-left-skill'} img={Images.cppLogo} skill={'C++'}/>
          <Skill aos={'fade-right-skill'} img={Images.htmlLogo} skill={'HTML'}/>
          <Skill aos={'fade-left-skill'} img={Images.cssLogo} skill={'CSS'}/>
          <Skill aos={'fade-right-skill'} img={Images.reactLogo} skill={'React'}/>
          <Skill aos={'fade-left-skill'} img={Images.typescriptLogo} skill={'Typescript'}/>
          <Skill aos={'fade-right-skill'} img={Images.pythonLogo} skill={'Python'}/>
          <Skill aos={'fade-left-skill'} img={Images.swaggerLogo} skill={'REST APIs'}/>
        </HomeSkillsContainer>
      </HomeSectionContainer>

      <HomeProjectsSectionContainer id={'projects'}>
        <HomeSectionHeader> Projects </HomeSectionHeader>
        <HomeProjectsContainer>
          {projects}
        </HomeProjectsContainer>
      </HomeProjectsSectionContainer>

      <HomeSectionContainer id={'contact'}>
        {showScreen(formScreen)}
      </HomeSectionContainer>
    </Main>
  )
}

export default Home;

