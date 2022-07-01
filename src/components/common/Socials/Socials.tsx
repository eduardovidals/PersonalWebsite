import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "components/common/Tooltip/Tooltip";
import React from "react";
import {SocialsContainer, SocialsLink} from "components/common/Socials/Socials.styles";

function Socials() {
  return (
    <SocialsContainer>
      <SocialsLink href={"https://github.com/eduardovidals"} target={"_blank"}>
        <FontAwesomeIcon icon={['fab', 'github']}/>
      </SocialsLink>

      <SocialsLink href={"https://www.linkedin.com/in/eduardovidals"} target={"_blank"}>
        <FontAwesomeIcon icon={['fab', 'linkedin']}/>
      </SocialsLink>

      <SocialsLink href={"https://www.instagram.com/eddy_the_professionalpenguin"} target={"_blank"}>
        <FontAwesomeIcon icon={['fab', 'instagram']}/>
      </SocialsLink>

      <Tooltip copiedAlertText={'Copied discord!'}>
        <SocialsLink onClick={() => {
          navigator.clipboard.writeText("baldder#8949");
        }}>
          <FontAwesomeIcon icon={['fab', 'discord']}/>
        </SocialsLink>
      </Tooltip>

      <Tooltip copiedAlertText={'Copied email!'}>
        <SocialsLink onClick={() => navigator.clipboard.writeText("eduardovidals69@gmail.com")}>
          <FontAwesomeIcon icon={'envelope'}/>
        </SocialsLink>
      </Tooltip>
    </SocialsContainer>
  )
}

export default Socials;
