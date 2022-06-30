import React from "react";
import {ButtonContainer, ButtonText} from "components/buttons/Button/Button.styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
}

function Button(props: ButtonProps){
  const {value, ...rest} = props;
  return (
    <ButtonContainer {...rest}>
      <ButtonText> {value} </ButtonText>
    </ButtonContainer>
  )
}

export default Button;
