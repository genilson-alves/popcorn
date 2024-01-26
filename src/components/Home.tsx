import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import * as Styled from "../Styled";
import { COLORS } from "../Styled";
import { Helmet } from "react-helmet";
import { FooterComponent } from "./FooterComponent";
import Navigation from "./Navigation";
const no_poster = require("../assets/no_poster.jpg");

type Work = {
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  id: number;
};

const HomeWrapper = styled.main`
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: auto;
  }
`;

const DefaultLink = css`
  text-decoration: none;
  color: ${COLORS.LINK_COLOR};
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const MediaSectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 15px;
  padding: 5px;
  border-bottom: 0.5 solid ${COLORS.SECTION_COLOR};
  @media (max-width: 768px) {
    margin: 10px 10px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  color: ${COLORS.SECTION_COLOR};
  &::before {
    content: "";
    border: 2px solid ${COLORS.SECTION_COLOR};
    margin-right: 5px;
    border-radius: 10px;
  }
`;

const ViewMore = styled(Link)`
  ${DefaultLink}
  font-size: 0.8rem;
`;

const CardInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0px 10px;
  margin: 0px 10px;
  @media (max-width: 768px) {
    overflow: scroll;
  }
  @media (min-width: 769px) and (max-width: 1199px) {
    overflow: scroll;
  }
`;

const CardInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    height: 300px;
  }
  @media (min-width: 769px) and (max-width: 1199px) {
    height: 350px;
  }
  @media (min-width: 1200px) {
    width: 400px;
    height: 350px;
  }
`;

const CardPoster = styled.div`
  @media (max-width: 768px) {
    img {
      height: 250px;
      border-radius: 10px;
    }
  }
  @media (min-width: 769px) and (max-width: 1199px) {
    img {
      border-radius: 10px;
      height: 300px;
    }
  }
  @media (min-width: 1200px) {
    img {
      border-radius: 10px;
      width: 100%;
      height: 300px;
    }
  }
`;

const CardTitle = styled(Link)`
  ${DefaultLink}
  font-size: 0.9rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  padding: 0px 10px;
  text-align: center;
`;

const MediaSectionCard = (props: any) => {
  return (
    <div>
      <MediaSectionTitle>
        <Title>{props.title}</Title>
        <ViewMore to={props.to}>View More</ViewMore>
      </MediaSectionTitle>
      <CardInformationWrapper>
        {props.content.slice(0, 6).map((work: Work) => (
          <CardInformation key={work.id}>
            <CardPoster>
              <img
                src={
                  work.poster_path
                    ? `https://www.themoviedb.org/t/p/original${work.poster_path}`
                    : no_poster
                }
                alt={work.name ? work.name : work.title}
              ></img>
            </CardPoster>
            <CardTitle to={`/${props.type}/${work.id}`}>
              {work.name ? work.name : work.title}
            </CardTitle>
          </CardInformation>
        ))}
      </CardInformationWrapper>
    </div>
  );
};

const Home: React.FC = () => {
  const [POPULAR_MOVIES, setPopularMovies] = useState<Work[]>([]);
  const [UPCOMING_MOVIES, setUpcomingMovies] = useState<Work[]>([]);
  const [TOP_RATED_MOVIES, setTopRatedMovies] = useState<Work[]>([]);
  const [ON_THE_AIR_TV_SHOWS, setOnTheAirTvShows] = useState<Work[]>([]);
  const [POPULAR_TV_SHOWS, setPopularTvShows] = useState<Work[]>([]);
  const [TOP_RATED_TV_SHOWS, setTopRatedTvShows] = useState<Work[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_GET = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
    },
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.themoviedb.org/3/movie/popular", API_GET)
      .then((response) => response.json())
      .then((response) => setPopularMovies(response.results))
      .catch((err) => setError(`ERROR FETCHING POPULAR MOVIES: ${err}`));
    fetch("https://api.themoviedb.org/3/movie/upcoming", API_GET)
      .then((response) => response.json())
      .then((response) => setUpcomingMovies(response.results))
      .catch((err) => setError(`ERROR FETCHING UPCOMING MOVIES: ${err}`));
    fetch("https://api.themoviedb.org/3/movie/top_rated", API_GET)
      .then((response) => response.json())
      .then((response) => setTopRatedMovies(response.results))
      .catch((err) => setError(`ERROR FETCHING TOP RATED MOVIES: ${err}`));
    fetch("https://api.themoviedb.org/3/tv/popular", API_GET)
      .then((response) => response.json())
      .then((response) => setPopularTvShows(response.results))
      .catch((err) => setError(`ERROR FETCHING POPULAR TV SHOWS: ${err}`));
    fetch("https://api.themoviedb.org/3/tv/on_the_air", API_GET)
      .then((response) => response.json())
      .then((response) => setOnTheAirTvShows(response.results))
      .catch((err) => setError(`ERROR FETCHING ON THE AIR TV SHOWS: ${err}`));
    fetch("https://api.themoviedb.org/3/tv/top_rated", API_GET)
      .then((response) => response.json())
      .then((response) => setTopRatedTvShows(response.results))
      .catch((err) => setError(`ERROR FETCHING TOP RATED TV SHOWS: ${err}`));
    setLoading(false);
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <Helmet>
        <title>Popcorn</title>
      </Helmet>
      {isLoading ? (
        <Styled.Loading>Loading...</Styled.Loading>
      ) : error ? (
        <Styled.Error>ERROR: {error}</Styled.Error>
      ) : (
        <HomeWrapper>
          <MediaSectionCard
            content={POPULAR_MOVIES}
            title="POPULAR MOVIES"
            to="/movie/popular"
            type="movie"
          ></MediaSectionCard>
          <MediaSectionCard
            content={TOP_RATED_MOVIES}
            title="TOP RATED MOVIES"
            to="/movie/top_rated"
            type="movie"
          ></MediaSectionCard>
          <MediaSectionCard
            content={UPCOMING_MOVIES}
            title="UPCOMING MOVIES"
            to="/movie/upcoming"
            type="movie"
          ></MediaSectionCard>
          <MediaSectionCard
            content={TOP_RATED_TV_SHOWS}
            title="TOP RATED TV SHOWS"
            to="/tv/top_rated"
            type="tv"
          ></MediaSectionCard>
          <MediaSectionCard
            content={POPULAR_TV_SHOWS}
            title="POPULAR TV SHOWS"
            to="/tv/popular"
            type="tv"
          ></MediaSectionCard>
          <MediaSectionCard
            content={ON_THE_AIR_TV_SHOWS}
            title="ON THE AIR TV SHOWS"
            to="/tv/on_the_air"
            type="tv"
          ></MediaSectionCard>
        </HomeWrapper>
      )}
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;
