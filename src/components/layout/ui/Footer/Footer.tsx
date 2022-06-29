import {
  FooterContainer,
  SocialContainer,
  SocialIconsContainer,
  SocialIconLink,
  SocialIconTooltip, SocialIconTooltipText, FooterRightsText
} from "./Footer.styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";

function Footer() {

  return (
    <FooterContainer>
      <SocialContainer>
        <SocialIconsContainer>
          <SocialIconLink href={"https://github.com/eduardovidals"} target={"_blank"}>
            <FontAwesomeIcon icon={['fab', 'github']}/>
          </SocialIconLink>

          <SocialIconLink href={"https://www.linkedin.com/in/eduardovidals"} target={"_blank"}>
            <FontAwesomeIcon icon={['fab', 'linkedin']}/>
          </SocialIconLink>

          <SocialIconLink href={"https://www.instagram.com/eddy_the_professionalpenguin"} target={"_blank"}>
            <FontAwesomeIcon icon={['fab', 'instagram']}/>
          </SocialIconLink>

          <Tooltip copiedAlertText={'Copied discord!'}>
            <SocialIconLink onClick={() => {
              navigator.clipboard.writeText("baldder#8949");
            }}>
              <FontAwesomeIcon icon={['fab', 'discord']}/>
            </SocialIconLink>
          </Tooltip>

          <Tooltip copiedAlertText={'Copied email!'}>
            <SocialIconLink onClick={() => navigator.clipboard.writeText("eduardovidals69@gmail.com")}>
              <FontAwesomeIcon icon={'envelope'}/>
            </SocialIconLink>
          </Tooltip>
        </SocialIconsContainer>
      </SocialContainer>
      <FooterRightsText> ©2022 Eduardo Vidals - All Rights Reserved. </FooterRightsText>
    </FooterContainer>
  )
}

interface TooltipProps {
  children: React.ReactNode,
  copiedAlertText: string
}

function Tooltip(props: TooltipProps){
  const {children, copiedAlertText} = props;

  const [copyText, setCopyText] = useState('Copy to clipboard');
  const [onCopy, setOnCopy] = useState(false);

  useEffect(() => {
    if (!onCopy){
      setCopyText('Copy to clipboard');
    }
  }, [onCopy])

  return (
    <SocialIconTooltip onMouseEnter={() => setOnCopy(true)} onMouseLeave={() => setOnCopy(false)}
                       onClick={() => setCopyText(copiedAlertText)}>
      <SocialIconTooltipText active={onCopy}> {copyText} </SocialIconTooltipText>
      {children}
    </SocialIconTooltip>
  )
}

export default Footer;
