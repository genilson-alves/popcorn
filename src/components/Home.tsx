import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import * as Styled from "../Styled";
import { COLORS } from "../Styled";
import { Helmet } from "react-helmet";

const no_poster = require("../assets/no_poster.jpg");
const previous = require("../assets/previous.png");
const next = require("../assets/next.png");

type Work = {
  title: string;
  name: string;
  overview: string;
  release_date: string;
  poster_path: string;
  id: number;
  vote_average: number;
};

const LinkDefault = css`
  text-decoration: none;
  color: ${COLORS.LINK_COLOR};
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const OtherWorksWrapper = styled.div`
  margin: 50px 0px;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 15px;
`;

const SectionTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${COLORS.SECTION_COLOR};
`;

const ViewMore = styled(Link)`
  ${LinkDefault}
  font-size: 0.8rem;
`;

const WorkInformationWrapper = styled.div`
  display: flex;
  gap: 0px 10px;
  margin: 10px;
  overflow: scroll;
`;

const WorkInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;

const WorkPosterWrapper = styled.div`
  img {
    border-radius: 5px;
    width: 160px;
    height: 250px;
  }
`;

const WorkTitleWrapper = styled.div`
  text-align: center;
`;

const WorkTitle = styled(Link)`
  ${LinkDefault}
  font-size: 0.9rem;
`;

const OtherWorks = (props: any) => {
  return (
    <div>
      <SectionTitleWrapper>
        <SectionTitle>{props.title}</SectionTitle>
        <ViewMore to={props.to}>View More</ViewMore>
      </SectionTitleWrapper>
      <WorkInformationWrapper>
        {props.content.map((work: Work) => (
          <WorkInformation key={work.id}>
            <WorkPosterWrapper>
              <img
                src={
                  work.poster_path
                    ? `https://www.themoviedb.org/t/p/original${work.poster_path}`
                    : no_poster
                }
                alt={work.name ? work.name : work.title}
              ></img>
            </WorkPosterWrapper>
            <WorkTitleWrapper>
              <WorkTitle to={`/${props.type}/${work.id}`}>
                {work.name ? work.name : work.title}
              </WorkTitle>
            </WorkTitleWrapper>
          </WorkInformation>
        ))}
      </WorkInformationWrapper>
    </div>
  );
};

const HomeContentWrapper = styled.main``;

const FeaturedWorksTitle = styled.div`
  color: ${COLORS.SECTION_COLOR};
  font-size: 1.4rem;
  padding: 10px 0px;
  font-weight: bold;
`;

const FeaturedContentWrapper = styled.div`
  margin: 50px 10px;
`;

const FeaturedWorkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FeaturedWorkPosterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturedPosterRatingWrapper = styled.div`
  display: inline-block;
  position: relative;
  img {
    border-radius: 10px;
    width: 200px;
    height: 300px;
  }
`;

const FeaturedWorkRating = styled.div`
  position: absolute;
  padding: 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 50px;
  height: 50px;
  background-color: ${COLORS.RATING_BACKGROUND_COLOR};
  border-radius: 6px;
  font-size: 1.5rem;
  font-weight: bold;
  top: 1%;
  left: 74%;
`;

const FeaturedWorkInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const WorkInformationSection = styled.span`
  font-weight: bold;
  font-style: italic;
`;

const FeaturedWorkTitleWrapper = styled.div`
  padding: 5px;
  text-align: center;
`;

const FeaturedWorkTitle = styled(Link)`
  ${LinkDefault}
  font-size: 1.4rem;
  font-weight: bold;
`;

const FeaturedWorkReleaseDate = styled.div``;

const FeaturedWorkOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonSettings = css`
  height: 50px;
  width: 50px;
  border: none;
  background-color: inherit;
  cursor: pointer;
  border-radius: 15px;
  margin: 5px;
  img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const MobilePreviousButton = styled.button`
  ${ButtonSettings}
`;

const MobileNextButton = styled.button`
  ${ButtonSettings}
`;

const TopRatedWrapper = styled.div``;

const TopRatedSectionTitle = styled.div``;

const TopRatedPoster = styled.div``;

const TopRatedContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TopRated = styled.div``;

const TopRatedPosterWrapper = styled.div`
  img {
    width: 150px;
  }
`;

const TopRatedPosition = styled.div``;

const TopRatedInformation = styled.div``;

const TopRatedTitle = styled.div``;

const Home: React.FC = () => {
  const [POPULAR_MOVIES, setPopularMovies] = useState<Work[]>([]);
  const [UPCOMING_MOVIES, setUpcomingMovies] = useState<Work[]>([]);
  const [TOP_RATED_MOVIES, setTopRatedMovies] = useState<Work[]>([]);
  const [ON_THE_AIR_TV_SHOWS, setOnTheAirTvShows] = useState<Work[]>([]);
  const [POPULAR_TV_SHOWS, setPopularTvShows] = useState<Work[]>([]);
  const [TOP_RATED_TV_SHOWS, setTopRatedTvShows] = useState<Work[]>([]);
  const [TOP_RATED_WORKS, setTopRatedWorks] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

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

  const handleNextMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex + 1) % POPULAR_MOVIES.length
    );
  };

  const handlePreviousMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) =>
        (prevIndex - 1 + POPULAR_MOVIES.length) % POPULAR_MOVIES.length
    );
  };

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {isLoading ? (
        <Styled.Loading>Loading...</Styled.Loading>
      ) : error ? (
        <Styled.Error>ERROR: {error}</Styled.Error>
      ) : (
        <HomeContentWrapper>
          <FeaturedContentWrapper>
            {POPULAR_MOVIES.length > 0 && (
              <FeaturedWorkWrapper key={POPULAR_MOVIES[currentMovieIndex].id}>
                <FeaturedWorksTitle>
                  <p>Popular Movies</p>
                </FeaturedWorksTitle>
                <FeaturedWorkPosterWrapper>
                  <MobilePreviousButton onClick={handlePreviousMovie}>
                    <img src={previous} alt="Previous" />
                  </MobilePreviousButton>
                  <FeaturedPosterRatingWrapper>
                    <img
                      src={
                        POPULAR_MOVIES[currentMovieIndex].poster_path
                          ? `https://www.themoviedb.org/t/p/original${POPULAR_MOVIES[currentMovieIndex].poster_path}`
                          : no_poster
                      }
                      alt={POPULAR_MOVIES[0].title}
                    ></img>
                    <FeaturedWorkRating>
                      {POPULAR_MOVIES[currentMovieIndex].vote_average
                        .toFixed(1)
                        .replace(".", "")}
                    </FeaturedWorkRating>
                  </FeaturedPosterRatingWrapper>
                  <MobileNextButton onClick={handleNextMovie}>
                    <img src={next} alt="Next" />
                  </MobileNextButton>
                </FeaturedWorkPosterWrapper>
                <FeaturedWorkInformation>
                  <FeaturedWorkTitleWrapper>
                    <FeaturedWorkTitle
                      to={`/movie/${POPULAR_MOVIES[currentMovieIndex].id}`}
                    >
                      {POPULAR_MOVIES[currentMovieIndex].title}
                    </FeaturedWorkTitle>
                  </FeaturedWorkTitleWrapper>
                  <FeaturedWorkReleaseDate>
                    <WorkInformationSection>
                      Release Date:
                    </WorkInformationSection>
                    <p>{POPULAR_MOVIES[currentMovieIndex].release_date}</p>
                  </FeaturedWorkReleaseDate>
                  <FeaturedWorkOverview>
                    <WorkInformationSection>Synopsis:</WorkInformationSection>
                    <p>{POPULAR_MOVIES[currentMovieIndex].overview}</p>
                  </FeaturedWorkOverview>
                </FeaturedWorkInformation>
              </FeaturedWorkWrapper>
            )}
          </FeaturedContentWrapper>
          <OtherWorksWrapper>
            <OtherWorks
              content={TOP_RATED_MOVIES}
              title="Top Rated Movies"
              to="/movie/top_rated"
              type="movie"
            ></OtherWorks>
            <OtherWorks
              content={UPCOMING_MOVIES}
              title="Upcoming Movies"
              to="/movie/upcoming"
              type="movie"
            ></OtherWorks>
            <OtherWorks
              content={TOP_RATED_TV_SHOWS}
              title="Top Rated TV Shows"
              to="/tv/top_rated"
              type="tv"
            ></OtherWorks>
            <OtherWorks
              content={POPULAR_TV_SHOWS}
              title="Popular TV Shows"
              to="/tv/popular"
              type="tv"
            ></OtherWorks>
            <OtherWorks
              content={ON_THE_AIR_TV_SHOWS}
              title="On The Air TV Shows"
              to="/tv/on_the_air"
              type="tv"
            ></OtherWorks>
          </OtherWorksWrapper>
          <TopRatedWrapper>
            <TopRatedSectionTitle>Our top rated works</TopRatedSectionTitle>
            <TopRatedContentWrapper>
              <TopRated>
                <TopRatedPoster>
                  <TopRatedPosterWrapper>
                    <TopRatedPosition>#1</TopRatedPosition>
                    <img src={no_poster} alt="Poster" />
                  </TopRatedPosterWrapper>
                </TopRatedPoster>
                <TopRatedInformation>
                  <TopRatedTitle>No Poster</TopRatedTitle>
                </TopRatedInformation>
              </TopRated>
              <TopRated>
                <TopRatedPoster>
                  <TopRatedPosterWrapper>
                    <TopRatedPosition>#1</TopRatedPosition>
                    <img src={no_poster} alt="Poster" />
                  </TopRatedPosterWrapper>
                </TopRatedPoster>
                <TopRatedInformation>
                  <TopRatedTitle>No Poster</TopRatedTitle>
                </TopRatedInformation>
              </TopRated>
              <TopRated>
                <TopRatedPoster>
                  <TopRatedPosterWrapper>
                    <TopRatedPosition>#1</TopRatedPosition>
                    <img src={no_poster} alt="Poster" />
                  </TopRatedPosterWrapper>
                </TopRatedPoster>
                <TopRatedInformation>
                  <TopRatedTitle>No Poster</TopRatedTitle>
                </TopRatedInformation>
              </TopRated>
              <TopRated>
                <TopRatedPoster>
                  <TopRatedPosterWrapper>
                    <TopRatedPosition>#1</TopRatedPosition>
                    <img src={no_poster} alt="Poster" />
                  </TopRatedPosterWrapper>
                </TopRatedPoster>
                <TopRatedInformation>
                  <TopRatedTitle>No Poster</TopRatedTitle>
                </TopRatedInformation>
              </TopRated>
            </TopRatedContentWrapper>
          </TopRatedWrapper>
        </HomeContentWrapper>
      )}
    </div>
  );
};

export default Home;
