import {
  FooterContainer, SocialContainer, FooterConnectText, SocialIconsContainer, SocialIconLink, SocialIconText
} from "./Footer.styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <FooterContainer>
      <SocialContainer>
        <FooterConnectText> Connect with me through these platforms </FooterConnectText>
        <SocialIconsContainer>
          <SocialIconLink href={"https://github.com/eduardovidals"} target={"_blank"}>
            <FontAwesomeIcon icon={['fab', 'github']}/>
            <SocialIconText> Github </SocialIconText>
          </SocialIconLink>

          <SocialIconLink href={"https://www.linkedin.com/in/eduardovidals"} target={"_blank"}>
            <FontAwesomeIcon icon={['fab', 'linkedin']}/>
            <SocialIconText> LinkedIn </SocialIconText>
          </SocialIconLink>

          <SocialIconLink href={"https://www.instagram.com/eddy_the_professionalpenguin"} target={"_blank"}>
            <FontAwesomeIcon icon={['fab', 'instagram']}/>
            <SocialIconText> Instagram </SocialIconText>
          </SocialIconLink>

          <SocialIconLink>
            <FontAwesomeIcon icon={['fab', 'discord']}/>
            <SocialIconText> Discord </SocialIconText>
          </SocialIconLink>

          <SocialIconLink>
            <FontAwesomeIcon icon={'envelope'}/>
            <SocialIconText> Email </SocialIconText>
          </SocialIconLink>
        </SocialIconsContainer>
      </SocialContainer>
    </FooterContainer>
  )
}

export default Footer;
