import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AppContainer} from "App.styles";
import Header from "components/layout/ui/Header/Header";
import Footer from "components/layout/ui/Footer/Footer";
import {faGithub, faLinkedin, faInstagram, faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {Provider} from "react-redux";
import {store} from "store/store";
import Home from "views/Home/Home";

library.add(faGithub, faLinkedin, faInstagram, faDiscord, faEnvelope)

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer>
          <Header/>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
          </Routes>
          <Footer/>
        </AppContainer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
