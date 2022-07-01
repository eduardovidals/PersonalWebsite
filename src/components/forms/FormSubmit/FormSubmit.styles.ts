import styled from "styled-components";

export const FormSubmitButton = styled.button`
  border: none;
  background-color: ${props => props.theme.colors.button};
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 300ms;
  
  &:disabled, &[disabled] {
    background-color: ${props => props.theme.colors.buttonDisabled};
    cursor: default;
  }
`

export const FormSubmitText = styled.p`
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  padding: 15px;
  font-size: 0.8rem;
`
