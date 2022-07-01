import {
  FormSuccessContainer,
  FormSuccessHeader, FormSuccessIcon,
  FormSuccessIconContainer, FormSuccessText,
} from "views/FormFlow/FormSuccess/FormSuccess.styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "components/buttons/Button/Button";
import {useAppDispatch} from "store/hooks";
import {updateScreen} from "store/formScreen/formScreen.slice";

function FormSuccess() {
  const dispatch = useAppDispatch();

  return (
      <FormSuccessContainer data-aos={'fade-up'} data-aos-duration={2000}>
        <FormSuccessIconContainer>
          <FormSuccessIcon>
            <FontAwesomeIcon icon={'check'}/>
          </FormSuccessIcon>
        </FormSuccessIconContainer>
        <FormSuccessHeader> Success! </FormSuccessHeader>
        <FormSuccessText>
          Thanks for submitting! Feel free to check out my other projects or reach out to me through other platforms
          from my socials at the very bottom. 😊
        </FormSuccessText>
        <Button value={'Submit another'} onClick={() => dispatch(updateScreen('FormContactScreen'))}/>
      </FormSuccessContainer>
  )
}

export default FormSuccess;
