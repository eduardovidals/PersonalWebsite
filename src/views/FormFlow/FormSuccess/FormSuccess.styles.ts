import styled from "styled-components";

export const FormSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`

export const FormSuccessIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: ${props => props.theme.colors.button};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  padding: 20px;
`

export const FormSuccessIcon = styled.div`
  margin-top: 10px;
  font-size: 64px;
`

export const FormSuccessHeader = styled.h2`
  font-size: 1.5rem;
  margin-top: 10px;
  color: ${props => props.theme.colors.text};
  text-align: center;
`

export const FormSuccessText = styled.p`
  margin-top: 10px;
  text-align: center;
`
