import React from "react";
import Home from "./components/Home";
import { GlobalStyle } from "./Styled";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <Home></Home>
    </div>
  );
};

export default App;
