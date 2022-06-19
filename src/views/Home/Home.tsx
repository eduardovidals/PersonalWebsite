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
import ProjectButton from "components/buttons/ProjectButton/ProjectButton";
import Projects from "utils/constants/projects";
import "./Home.css"
import Main from "components/layout/ui/Main/Main";

const typedStrings = ["Software Engineer.", "Developer.", "Programmer."];

function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const [startDelay, setStartDelay] = useState(1000);
  // used so that the window.innerHeight does not update when the HomeTitleText is rendered
  const [containerHeight, setContainerHeight] = useState((window.innerHeight).toString() + 'px')

  useEffect(() => {
    Aos.init({duration: 2000});

    setTimeout(() => {
      setShowTitle(true);
    }, 2200)

    setTimeout(() => {
      setStartDelay(0);
    }, 3000);
  }, [])

  return (
    <Main>
        <HomeTitleContainer style={{height: containerHeight}} id={"home"}>
          {showTitle &&
            <HomeTitleText> Hello, I'm Eduardo, a&nbsp;
              <span>
              <Typed strings={typedStrings} typeSpeed={40} backSpeed={50} loop={true} startDelay={startDelay}/>
            </span>
            </HomeTitleText>
          }
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
            <Skill aos={'fade-left-skill'} img={Images.swaggerLogo} skill={'RESTful APIs'}/>
          </HomeSkillsContainer>
        </HomeSectionContainer>

        <HomeProjectsSectionContainer id={'projects'}>
          <HomeSectionHeader> Projects </HomeSectionHeader>
          <HomeProjectsContainer>
            <Project project={Projects.sortingVisualizer} aos={'fade-right'}>
              <ProjectButton
                link={'https://github.com/eduardovidals/AlgoVisual/tree/main/src/AlgoVisual/Layout/Main/SortingVisualizer'}
                text={'Code'}/>
              <ProjectButton link={'https://eduardovidals.github.io/AlgoVisual'} text={'Website'}/>
            </Project>

            <Project project={Projects.pathfindingVisualizer} aos={'fade-left'}>
              <ProjectButton
                link={'https://github.com/eduardovidals/AlgoVisual/tree/main/src/AlgoVisual/Layout/Main/PathfindingVisualizer'}
                text={'Code'}/>
              <ProjectButton link={'https://eduardovidals.github.io/AlgoVisual'} text={'Website'}/>
            </Project>
          </HomeProjectsContainer>
        </HomeProjectsSectionContainer>
    </Main>
  )
}

export default Home;
