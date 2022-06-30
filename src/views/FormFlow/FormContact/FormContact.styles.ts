import styled from "styled-components";

export const FormContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 500px;
`

export const FormSectionHeader = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  text-align: center;

  @media (min-width: 47em) {
    font-size: 2.5rem;
  }
`

export const FormContactReachOut = styled.div`
  margin-top: 10px;
`


export const FormContactFormResponse = styled.p`
  color: #F00;
  margin-top: 10px;
`

export const FormContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`
