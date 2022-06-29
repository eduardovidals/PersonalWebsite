import {FormInputLabel, FormInputElement} from "components/forms/FormInput/FormInput.styles";
import React from "react";

interface FormInputProps extends React.FormHTMLAttributes<HTMLInputElement>{
  htmlFor: string,
  labelText: string,
  placeholder: string,
  required: boolean,
  email?: boolean,
  password?: boolean,
  setTextField: (field: string) => void
}

function FormInput(props: FormInputProps){
  const {htmlFor, labelText, placeholder, required, email, setTextField, ...rest} = props;

  return (
    <>
      <FormInputLabel htmlFor={htmlFor}> {labelText} </FormInputLabel>
      <FormInputElement id={htmlFor} type={email ? 'email' : 'text'} placeholder={placeholder}
             required={required} onChange={e => setTextField(e.currentTarget.value)} {...rest}/>
    </>
  )
}

export default FormInput;
