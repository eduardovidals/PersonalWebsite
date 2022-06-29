import React from "react";
import {SubmitFieldInput} from "components/forms/SubmitField/SubmitField.styles";

interface SubmitFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string
}

function SubmitField(props: SubmitFieldProps){
  const {value, ...rest} = props;
  return (
    <SubmitFieldInput type={'submit'} value={value} {...rest} />
  )
}

export default SubmitField;
