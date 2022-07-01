import React from "react";
import {FormSubmitButton, FormSubmitText} from "components/forms/FormSubmit/FormSubmit.styles";

interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function FormSubmit(props: FormSubmitProps){
  const {value, ...rest} = props;
  return (
    <FormSubmitButton type={'submit'} {...rest}>
      <FormSubmitText> {value} </FormSubmitText>
    </FormSubmitButton>
  )
}

export default FormSubmit;
