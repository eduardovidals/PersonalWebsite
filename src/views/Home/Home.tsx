import {MainChildContainer, MainContainer} from "components/layout/ui/Main/Main.styles";
import {
  HomeSectionContainer,
  HomeSectionHeader,
  HomeAboutMeText,
  HomeAboutMeTextContainer,
  HomeTitleContainer,
  HomeTitleText,
  HomeSkillsContainer,
  HomeProjectsContainer, HomeProjectsSectionContainer
} from "views/Home/Home.styles";
import Typed from "react-typed";
import {useEffect, useState} from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import Images from "utils/images";
import Skill from "components/common/Skill/Skill";
import Project from "components/common/Project/Project";
import Projects from "utils/constants/projects";
import "./Home.css"
import Main from "components/layout/ui/Main/Main";
import {useAppDispatch, useAppSelector} from "store/hooks";
import {increment} from "store/home/home.slice";

const typedStrings = ["Software Engineer.", "Developer.", "Programmer."];

function Home() {
  // inner height is used to conform to mobile and desktop views as 100vh does not react well on mobile
  // this ensures that the home typed text is in the middle of the screen for both mobile and desktop
  const [containerHeight, setContainerHeight] = useState((window.innerHeight).toString() + 'px')
  const [width, setWidth] = useState(window.innerWidth);

  const count = useAppSelector(state => state.header);

  useEffect(() => {
    Aos.init({duration: 2000});

    // on resize fix window to be inner height of window, ensures entire screen is covered and that home typed text
    // is centered to the middle of the screen
    window.addEventListener("resize", () => {
      // checks if window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != width){
        setWidth(window.innerWidth);
        setContainerHeight((window.innerHeight).toString() + 'px')
      }
    })
  }, [])


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

  return (
    <Main>
      <HomeTitleContainer style={{height: containerHeight}} id={"home"}>
        {renderTypedComponent()}
      </HomeTitleContainer>

      <HomeSectionContainer id={"about"}>
        <HomeAboutMeTextContainer data-aos="fade-up">
          <HomeSectionHeader> About me </HomeSectionHeader>
          <HomeAboutMeText>
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
          <Project project={Projects.sortingVisualizer} aos={'fade-right'}/>
          <Project project={Projects.pathfindingVisualizer} aos={'fade-left'}/>
        </HomeProjectsContainer>
      </HomeProjectsSectionContainer>
    </Main>
  )
}

export default Home;
