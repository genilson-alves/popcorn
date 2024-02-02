import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import * as Styled from "../Styled";
import { COLORS } from "../Styled";
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
        {props.content.slice(0, 6).map((work: Work, index: number) => (
          <CardInformation key={index}>
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

const TopRatedSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1400px;
  margin: auto;
  padding: 10px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

const TopRatedWrapper = styled.div`
  width: 100%;
  margin: 5px;
`;

const TopRatedTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`;

const TopRatedContent = styled.div`
  background-color: white;
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  padding: 10px;
  color: ${COLORS.RED};
`;

const TopRatedName = styled(Link)`
  text-decoration: none;
  color: ${COLORS.RED};
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const TopNumber = styled.span`
  margin-right: 10px;
  font-style: italic;
  font-weight: bold;
`;

const TopRated = (props: any) => {
  return (
    <TopRatedWrapper>
      <TopRatedTitleWrapper>
        <Title>{props.title}</Title>
        <ViewMore to={props.to}>View More</ViewMore>
      </TopRatedTitleWrapper>
      {props.content.slice(0, 6).map((work: Work, index: number) => (
        <TopRatedContent key={index}>
          <TopNumber>{index + 1}</TopNumber>
          <TopRatedName to={`${props.type}/${work.id}`}>
            {work.name ? work.name : work.title}
          </TopRatedName>
        </TopRatedContent>
      ))}
    </TopRatedWrapper>
  );
};

const Home: React.FC = () => {
  const [POPULAR_MOVIES, setPopularMovies] = useState<Work[]>([]);
  const [UPCOMING_MOVIES, setUpcomingMovies] = useState<Work[]>([]);
  const [TOP_RATED_MOVIES, setTopRatedMovies] = useState<Work[]>([]);
  const [POPULAR_TV_SHOWS, setPopularTvShows] = useState<Work[]>([]);
  const [TOP_RATED_TV_SHOWS, setTopRatedTvShows] = useState<Work[]>([]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_GET_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
    },
  };

  useEffect(() => {
    document.title = `Popcorn`;
    return () => {
      document.title = "Popcorn";
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.themoviedb.org/3/movie/popular", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setPopularMovies(response.results))
      .catch((err) => setError(`ERROR FETCHING POPULAR MOVIES: ${err}`));
    fetch("https://api.themoviedb.org/3/movie/upcoming", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setUpcomingMovies(response.results))
      .catch((err) => setError(`ERROR FETCHING UPCOMING MOVIES: ${err}`));
    fetch("https://api.themoviedb.org/3/movie/top_rated", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setTopRatedMovies(response.results))
      .catch((err) => setError(`ERROR FETCHING TOP RATED MOVIES: ${err}`));
    fetch("https://api.themoviedb.org/3/tv/popular", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setPopularTvShows(response.results))
      .catch((err) => setError(`ERROR FETCHING POPULAR TV SHOWS: ${err}`));
    fetch("https://api.themoviedb.org/3/tv/top_rated", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setTopRatedTvShows(response.results))
      .catch((err) => setError(`ERROR FETCHING TOP RATED TV SHOWS: ${err}`));
    setLoading(false);
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      {isLoading ? (
        <Styled.Loading>Loading...</Styled.Loading>
      ) : error ? (
        <Styled.Error>ERROR: {error}</Styled.Error>
      ) : (
        <div>
          <TopRatedSection>
            <TopRated
              title="TOP RATED MOVIES"
              type="movie"
              to="/movie/top_rated"
              content={TOP_RATED_MOVIES}
            ></TopRated>
            <TopRated
              title="TOP RATED TV SHOWS"
              type="tv"
              to="/tv/top_rated"
              content={TOP_RATED_TV_SHOWS}
            ></TopRated>
          </TopRatedSection>
          <HomeWrapper>
            <MediaSectionCard
              content={UPCOMING_MOVIES}
              title="UPCOMING MOVIES"
              to="/movie/upcoming"
              type="movie"
            ></MediaSectionCard>
            <MediaSectionCard
              content={POPULAR_MOVIES}
              title="POPULAR MOVIES"
              to="/movie/popular"
              type="movie"
            ></MediaSectionCard>
            <MediaSectionCard
              content={POPULAR_TV_SHOWS}
              title="POPULAR TV SHOWS"
              to="/tv/popular"
              type="tv"
            ></MediaSectionCard>
          </HomeWrapper>
        </div>
      )}
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;
