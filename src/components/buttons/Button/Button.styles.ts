import styled from "styled-components";

export const ButtonContainer = styled.button`
  border: none;
  background-color: ${props => props.theme.colors.button};
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`

export const ButtonText = styled.p`
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  padding: 15px;
`
