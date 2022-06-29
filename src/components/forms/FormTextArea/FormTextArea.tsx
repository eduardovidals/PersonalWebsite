import {FormTextAreaLabel, FormTextAreaElement} from "components/forms/FormTextArea/FormTextArea.styles";
import React from "react";

interface FormTextAreaProps extends React.FormHTMLAttributes<HTMLTextAreaElement> {
  htmlFor: string,
  labelText: string,
  placeholder: string,
  required: boolean,
  setTextField: (field: string) => void
}

function FormTextArea(props: FormTextAreaProps) {
  const {htmlFor, labelText, placeholder, required, setTextField, ...rest} = props;

  return (
    <>
      <FormTextAreaLabel htmlFor={htmlFor}> {labelText} </FormTextAreaLabel>
      <FormTextAreaElement id={htmlFor} placeholder={placeholder} required={required}
                           onChange={e => setTextField(e.currentTarget.value)} {...rest}/>
    </>
  )
}

export default FormTextArea;
