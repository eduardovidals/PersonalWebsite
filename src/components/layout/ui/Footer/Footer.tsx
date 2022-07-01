import {
  FooterContainer, FooterRightsText
} from "./Footer.styles";
import React from "react";
import Socials from "components/common/Socials/Socials";

function Footer() {

  return (
    <FooterContainer>
      <Socials/>
      <FooterRightsText> ©2022 Eduardo Vidals - All Rights Reserved. </FooterRightsText>
    </FooterContainer>
  )
}

export default Footer;
