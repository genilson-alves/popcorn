import React from "react";
import { GlobalStyle } from "./Styled";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./components/Page";
import Home from "./components/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
