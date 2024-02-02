import React from "react";
import { GlobalStyle } from "./Styled";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import TvShowProfile from "./components/TvShowProfile";
import MovieProfile from "./components/MovieProfile";
import SearchPage from "./components/SearchPage";
import TopModel from "./components/TopModel";
import NotFound from "./components/NotFound";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  { path: "/tv/:id", element: <TvShowProfile></TvShowProfile> },
  { path: "/movie/:id", element: <MovieProfile></MovieProfile> },
  {
    path: "/movie/top_rated",
    element: (
      <TopModel
        type="movie"
        page_type="top_rated"
        title="TOP RATED MOVIES"
      ></TopModel>
    ),
  },
  {
    path: "/movie/popular",
    element: (
      <TopModel
        type="movie"
        page_type="popular"
        title="POPULAR MOVIES"
      ></TopModel>
    ),
  },
  {
    path: "/movie/upcoming",
    element: (
      <TopModel
        type="movie"
        page_type="upcoming"
        title="UPCOMING MOVIES"
      ></TopModel>
    ),
  },
  {
    path: "/movie/now_playing",
    element: (
      <TopModel
        type="movie"
        page_type="now_playing"
        title="NOW PLAYING TV SHOWS"
      ></TopModel>
    ),
  },
  {
    path: "/tv/popular",
    element: (
      <TopModel
        type="tv"
        page_type="popular"
        title="POPULAR TV SHOWS"
      ></TopModel>
    ),
  },
  {
    path: "/tv/top_rated",
    element: (
      <TopModel
        type="tv"
        page_type="top_rated"
        title="TOP RATED TV SHOWS"
      ></TopModel>
    ),
  },
  {
    path: "/tv/airing_today",
    element: (
      <TopModel
        type="tv"
        page_type="airing_today"
        title="TV SHOWS AIRING TODAY"
      ></TopModel>
    ),
  },
  {
    path: "/tv/on_the_air",
    element: (
      <TopModel
        type="tv"
        page_type="on_the_air"
        title="ON THE AIR TV SHOWS"
      ></TopModel>
    ),
  },
  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },
  {
    path: "/error",
    element: <NotFound></NotFound>,
  },
  {
    path: "/login",
    element: <SignIn></SignIn>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
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
