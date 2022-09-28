import {
  HomeSectionContainer, HomeSectionHeader, HomeAboutMeText, HomeAboutMeTextContainer, HomeTitleContainer,
  HomeTitleText, HomeSkillsContainer, HomeProjectsContainer, HomeProjectsSectionContainer,
  HomeFormSectionContainer, HomeSkillsSectionContainer, HomeSkillsSection, HomeTitleTyped
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
import {useAppSelector} from "store/hooks";
import FormContact from "views/FormFlow/FormContact/FormContact";
import FormSuccess from "views/FormFlow/FormSuccess/FormSuccess";

const typedStrings = ["Software Engineer.", "Developer.", "Programmer."];


function Home() {
  // inner height is used to conform to mobile and desktop views as 100vh does not react well on mobile
  // this ensures that the home typed text is in the middle of the screen for both mobile and desktop
  const [containerHeight] = useState(window.innerHeight);

  const count = useAppSelector(state => state.header);
  const formScreen = useAppSelector(state => state.formScreen);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const aboutHeaderRef = useRef<HTMLDivElement>(null);
  const skillsHeaderRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const projectsHeaderRef = useRef<HTMLDivElement>(null);
  const [showTitleArrow, setShowTitleArrow] = useState(false);
  const [showAboutArrow, setShowAboutArrow] = useState(false);
  const [showSkillsArrow, setShowSkillsArrow] = useState(false);

  useEffect(() => {
    Aos.init();
    document.addEventListener("scroll", () => {
      if (!aboutHeaderRef.current) return;
      if (!skillsHeaderRef.current) return;
      if (!aboutContainerRef.current) return;
      if (!titleContainerRef.current) return;
      if (!projectsHeaderRef.current) return;

      if (aboutHeaderRef.current.getBoundingClientRect().top - 20 <= window.innerHeight) {
        setShowTitleArrow(false);
      } else {
        setShowTitleArrow(true);
      }

      // titleContainerRef.bottom reaches 0 the more you scroll down, only show arrow
      // when .bottom is 150px away from the top of the window
      if (skillsHeaderRef.current.getBoundingClientRect().top <= window.innerHeight ||
        titleContainerRef.current.getBoundingClientRect().bottom - 150 >= 0) {
        setShowAboutArrow(false);
      } else {
        setShowAboutArrow(true);
      }

      if (projectsHeaderRef.current.getBoundingClientRect().top <= window.innerHeight
        || aboutContainerRef.current.getBoundingClientRect().bottom - 100 >= 0) {
        setShowSkillsArrow(false);
      } else {
        setShowSkillsArrow(true);
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
        <HomeTitleTyped>
          <Typed strings={typedStrings} typeSpeed={40} backSpeed={50} loop={true} startDelay={1000}/>
        </HomeTitleTyped>
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
      <HomeTitleContainer style={{height: containerHeight}} id={"home"} ref={titleContainerRef}>
        {renderTypedComponent()}
        {showTitleArrow &&
          <a className={`ca3-scroll-down-link ca3-scroll-down-arrow ${!showTitleArrow ? 'fade' : ''}`} href={"#about"}/>
        }
      </HomeTitleContainer>

      <HomeSectionContainer id={"about"} ref={aboutContainerRef} style={{height: containerHeight}}>
        <HomeAboutMeTextContainer>
          <HomeSectionHeader ref={aboutHeaderRef}> About me </HomeSectionHeader>
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
        {showAboutArrow &&
          <a className={`ca3-scroll-down-link ca3-scroll-down-arrow ${!showAboutArrow ? 'fade' : ''}`}
             href={"#skills"}/>
        }
      </HomeSectionContainer>

      <HomeSkillsSectionContainer id={'skills'}>
        <HomeSkillsSection>
          <HomeSectionHeader ref={skillsHeaderRef}> Technical Skills </HomeSectionHeader>
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
        </HomeSkillsSection>
        {showSkillsArrow &&
          <a className={`ca3-scroll-down-link ca3-scroll-down-arrow ${!showSkillsArrow ? 'fade' : ''}`}
             href={"#projects"}/>
        }
      </HomeSkillsSectionContainer>

      <HomeProjectsSectionContainer id={'projects'}>
        <HomeSectionHeader ref={projectsHeaderRef}> Projects </HomeSectionHeader>
        <HomeProjectsContainer>
          {projects}
        </HomeProjectsContainer>
      </HomeProjectsSectionContainer>

      <HomeFormSectionContainer id={'contact'}>
        {showScreen(formScreen)}
      </HomeFormSectionContainer>
    </Main>
  )
}

export default Home;

