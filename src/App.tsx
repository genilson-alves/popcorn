import React from "react";
import { GlobalStyle } from "./Styled";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./components/Page";
import Home from "./components/Home";
import TypeModel from "./components/TypeModel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TypeModel></TypeModel>,
  },
  { path: "/tv/:workId", element: <Page type="tv"></Page> },
  { path: "/movie/:workId", element: <Page type="movie"></Page> },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <GlobalStyle></GlobalStyle>
    </div>
  );
};

export default App;
