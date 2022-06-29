import {TextFieldInput, TextFieldLabel} from "components/forms/TextField/TextField.styles";
import React from "react";

interface TextFieldProps extends React.FormHTMLAttributes<HTMLInputElement>{
  htmlFor: string,
  labelText: string,
  placeholder: string,
  required: boolean,
  email?: boolean,
  password?: boolean,
  setTextField: (field: string) => void
}

function TextField(props: TextFieldProps){
  const {htmlFor, labelText, placeholder, required, email, setTextField, ...rest} = props;

  return (
    <>
      <TextFieldLabel htmlFor={htmlFor} className={'form-label'}> {labelText} </TextFieldLabel>
      <TextFieldInput id={htmlFor} type={email ? 'email' : 'text'} placeholder={placeholder} className={'form-input'}
             required={required} onChange={e => setTextField(e.currentTarget.value)} {...rest}/>
    </>
  )
}

export default TextField;
