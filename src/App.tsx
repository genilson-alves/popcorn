import React from "react";
import { createGlobalStyle } from "styled-components";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

const GlobalStyle = createGlobalStyle`
  * { margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 1500px;
  margin: auto;
  }
`;

const App = () => {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <Navigation></Navigation>
      <Home></Home>
    </div>
  );
};

export default App;
