import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string,
      secondary: string,
      text: string,
      hover: string,
      project: string,
      background: string,
      button: string,
      buttonDisabled: string,
      buttonHover: string,
      mobileBackground: string,
      titleBackground: string
    };
  }
}
