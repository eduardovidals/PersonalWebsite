import {
  HomeSectionContainer, HomeSectionHeader, HomeAboutMeText, HomeAboutMeTextContainer, HomeTitleContainer,
  HomeTitleText, HomeSkillsContainer, HomeProjectsContainer, HomeProjectsSectionContainer, HomeContactContainer,
  HomeContactReachOut, HomeContactForm, HomeContactFormResponse
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
import emailjs from '@emailjs/browser';
import FormInput from "components/forms/FormInput/FormInput";
import FormSubmit from "components/forms/FormSubmit/FormSubmit";
import FormTextArea from "components/forms/FormTextArea/FormTextArea";
import ReCAPTCHA from "react-google-recaptcha";


const typedStrings = ["Software Engineer.", "Developer.", "Programmer."];

interface FormResponseProps {
  error: boolean,
  message: string
}

function Home() {
  // inner height is used to conform to mobile and desktop views as 100vh does not react well on mobile
  // this ensures that the home typed text is in the middle of the screen for both mobile and desktop
  const [containerHeight, setContainerHeight] = useState((window.innerHeight).toString() + 'px')
  const [width, setWidth] = useState(window.innerWidth);

  // form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formResponse, setFormResponse] = useState<FormResponseProps>({error: false, message: ''});
  const [captchaToken, setCaptchaToken] = useState('');
  const count = useAppSelector(state => state.header);
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    Aos.init();
    // on resize fix window to be inner height of window, ensures entire screen is covered and that home typed text
    // is centered to the middle of the screen
    window.addEventListener("resize", () => {
      // checks if window width has actually changed and it's not just iOS triggering a resize event on scroll
      if (window.innerWidth != width) {
        setWidth(window.innerWidth);
        setContainerHeight((window.innerHeight).toString() + 'px')
      }
    })
  }, [])

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setFormResponse({error: true, message: 'Fill out the captcha!'});
      return;
    } else {
      setFormResponse({error: false, message: 'Successfully sent email!'});
    }

    if (formRef.current) {
      emailjs.sendForm(process.env.REACT_APP_SERVICE_ID as string, process.env.REACT_APP_TEMPLATE_ID as string, formRef.current, process.env.REACT_APP_PUBLIC_KEY)
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    }
  };

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
      <Project project={project} aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}/>
    )
  })

  return (
    <Main>
      <HomeTitleContainer style={{height: containerHeight}} id={"home"}>
        {renderTypedComponent()}
      </HomeTitleContainer>

      <HomeSectionContainer id={"about"}>
        <HomeAboutMeTextContainer data-aos="fade-up" data-aos-duration={2000}>
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
          {projects}
        </HomeProjectsContainer>
      </HomeProjectsSectionContainer>

      <HomeSectionContainer id={'contact'}>
        <HomeContactContainer data-aos="fade-up" data-aos-duration={2000}>
          <HomeSectionHeader> Let's talk </HomeSectionHeader>
          <HomeContactReachOut>
            If you want to have a coffee chat or just want to ask a simple question, then feel free to reach out
            to me by using the form below and I'll get back to you promptly.
          </HomeContactReachOut>

          {formResponse.message &&
            <HomeContactFormResponse error={formResponse.error}>
              {formResponse.message}
            </HomeContactFormResponse>
          }
          <HomeContactForm onSubmit={(e) => formSubmit(e)} ref={formRef}>
            <FormInput htmlFor={'fullName'} labelText={'Full Name'} placeholder={'Enter your full name'}
                       setTextField={setName} name={'from_name'} required={true}/>
            <FormInput htmlFor={'email'} labelText={'Email'} placeholder={'Enter your email'}
                       setTextField={setEmail} name={'reply_to'} required={true} email={true}/>
            <FormTextArea htmlFor={'message'} labelText={'Message'} placeholder={'Enter your message'}
                          setTextField={setMessage} name={'message'} required={true}/>
            <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_KEY as string} theme={'dark'}
                       onChange={(e) => setCaptchaToken(e || '')}/>
            <FormSubmit value={'Submit'}/>
          </HomeContactForm>
        </HomeContactContainer>
      </HomeSectionContainer>
    </Main>
  )
}

export default Home;
