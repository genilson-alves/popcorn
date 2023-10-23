import React from "react";
import { createGlobalStyle } from "styled-components";
import Home from "./components/Home";

const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Overpass', sans-serif;
  }

  body {
    color: black;
    background-color: #edede9;
  }
`;

const App = () => {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <Home></Home>
    </div>
  );
};

export default App;
