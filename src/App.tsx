import React from "react";
import Home from "./components/Home";
import { GlobalStyle } from "./Styled";
import Page from "./components/Page";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <Page></Page>
    </div>
  );
};

export default App;
