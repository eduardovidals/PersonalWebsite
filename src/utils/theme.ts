import {DefaultTheme} from "styled-components";
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`

const theme:DefaultTheme = {
  borderRadius: "5px",
  colors: {
    main: "#33435D",
    secondary: "#1F292E",
    text: "#FFF",
    hover: "#98D6E8",
    project: "#3e516b",
    background: "#1E3653",
    button: "#405475",
    buttonDisabled: "rgba(101,112,129,0.82)",
    buttonHover: "#435779",
    mobileBackground: "rgba(33,59,93,0.8)",
    titleBackground: "rgba(30,54,83,0.8)"
  }
}

export default theme;
