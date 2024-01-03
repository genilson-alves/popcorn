import React from "react";
import { GlobalStyle } from "./Styled";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./components/Page";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import TypeModel from "./components/TypeModel";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  { path: "/tv/:workId", element: <Page type="tv"></Page> },
  { path: "/movie/:workId", element: <Page type="movie"></Page> },
  {
    path: "/movie/top_rated",
    element: (
      <TypeModel
        type="movie"
        page_type="top_rated"
        title="Top Rated Movies"
      ></TypeModel>
    ),
  },
  {
    path: "/movie/popular",
    element: (
      <TypeModel
        type="movie"
        page_type="popular"
        title="Popular Movies"
      ></TypeModel>
    ),
  },
  {
    path: "/movie/upcoming",
    element: (
      <TypeModel
        type="movie"
        page_type="upcoming"
        title="Upcoming Movies"
      ></TypeModel>
    ),
  },
  {
    path: "/movie/now_playing",
    element: (
      <TypeModel
        type="movie"
        page_type="now_playing"
        title="Now Playing Movies"
      ></TypeModel>
    ),
  },
  {
    path: "/tv/popular",
    element: (
      <TypeModel
        type="tv"
        page_type="popular"
        title="Popular TV Shows"
      ></TypeModel>
    ),
  },
  {
    path: "/tv/top_rated",
    element: (
      <TypeModel
        type="tv"
        page_type="top_rated"
        title="Top Rated TV Shows"
      ></TypeModel>
    ),
  },
  {
    path: "/tv/airing_today",
    element: (
      <TypeModel
        type="tv"
        page_type="airing_today"
        title="TV Shows Airing Today"
      ></TypeModel>
    ),
  },
  {
    path: "/tv/on_the_air",
    element: (
      <TypeModel
        type="tv"
        page_type="on_the_air"
        title="TV Shows On The Air"
      ></TypeModel>
    ),
  },
  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },
  { path: "*", element: <NotFound></NotFound> },
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
