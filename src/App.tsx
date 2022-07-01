import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AppContainer} from "App.styles";
import Header from "components/layout/ui/Header/Header";
import Footer from "components/layout/ui/Footer/Footer";
import {faGithub, faLinkedin, faInstagram, faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faAngleRight, faArrowRight, faCheck, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {Provider} from "react-redux";
import {store} from "store/store";
import Home from "views/Home/Home";
import theme, {GlobalStyle} from "utils/theme";
import {ThemeProvider} from "styled-components";
import ProjectsPage from "views/Projects/Projects";

library.add(faGithub, faLinkedin, faInstagram, faDiscord, faEnvelope, faAngleRight, faArrowRight, faCheck);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
          <AppContainer>
            <Header/>
            <Routes>
              <Route path={'/'} element={<Home/>}/>
              <Route path={'projects/*'} element={<ProjectsPage/>}/>
            </Routes>
            <Footer/>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
