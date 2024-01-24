import React from "react";
import { useState, useEffect } from "react";
import * as Styled from "../Styled";
import styled from "styled-components";
import { COLORS } from "../Styled";
import Navigation from "./Navigation";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterComponent } from "./FooterComponent";
import { WorkBackground } from "./../Styled";
import NotFound from "./NotFound";
const no_image = require("../assets/no_image.png");
const no_cast_image = require("../assets/no_cast_image.jpg");
const no_background = require("../assets/no_background.jpg");
const no_poster = require("../assets/no_poster.jpg");
const home = require("../assets/home.png");

type Work = {
  backdrop_path: string;
  poster_path: string;
  name: string;
  title: string;
  original_name: string;
  original_title: string;
  overview: string;
  original_language: string;
  release_date: string;
  status: string;
  homepage: string;
  first_air_date: string;
  last_air_date: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  number_of_episodes: number;
  number_of_seasons: number;
  runtime: number;
  imdb_id: number;
  revenue: number;
  id: number;
  in_production: boolean;
  spoken_languages: {
    [key: number]: {
      english_name: string;
    };
  };
  genres: {
    [key: number]: {
      id: number;
      name: string;
    };
  };
  seasons: {
    [key: number]: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      poster_path: string;
      vote_average: number;
    };
  };
  languages: {
    [key: number]: string;
  };
  networks: {
    [key: number]: {
      logo_path: string;
      name: string;
      origin_country: string;
    };
  };

  episode_run_time: {
    [key: number]: number;
  };
  next_episode_to_air: {
    [key: number]: {
      air_date: number;
      episode_number: number;
      name: string;
      overview: string;
      runtime: number;
      season_name: number;
      still_path: string;
    };
  };
  production_companies: {
    [key: number]: {
      logo_path: string;
      name: string;
      origin_country: string;
    };
  };
  production_countries: {
    [key: number]: {
      name: string;
    };
  };
  belongs_to_collection: {
    name: string;
    poster_path: string;
  };
};

type Cast = {
  cast: {
    [key: number]: {
      character: string;
      name: string;
      profile_path: string;
      known_for_department: string;
      id: number;
    };
  };
};

type Collection = {
  overview: string;
};

type Params = {
  workId: string;
};

const PageBackgroundWrapper = styled.div``;

const PageBackgroundContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const PageBackground = styled.div<{ background: string }>`
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 250px;
`;

const PageWorkContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: auto;
  }
`;

const PagePoster = styled.div`
  img {
    position: relative;
    margin-top: -80%;
    width: 130px;
    height: 200px;
    border-radius: 5px;
  }
  @media (min-width: 1200px) {
    img {
      position: relative;
      margin-top: -80%;
      width: 160px;
      height: 250px;
      border-radius: 5px;
    }
  }
`;

const PageContentWrapper = styled.div`
  max-width: 400px;
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: auto;
  }
`;

const PageStatus = styled.div`
  padding: 5px;
  background-color: ${COLORS.STATUS};
  color: ${COLORS.PAGE_WHITE};
  border-radius: 5px;
  width: 130px;
  text-align: center;
  @media (min-width: 1200px) {
    padding: 5px;
    background-color: ${COLORS.STATUS};
    color: ${COLORS.PAGE_WHITE};
    border-radius: 5px;
    width: 160px;
    text-align: center;
  }
`;

const PageTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 5px 10px;
`;

const PageOriginalTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  padding-bottom: 5px;
`;

const PageTagline = styled.div`
  font-style: italic;
  text-align: center;
  padding: 0px 10px;
`;

const SynopsisInformation = styled.div`
  width: 100%;
  padding: 0px 10px;
  margin: 20px 0px 10px;
  @media (min-width: 1200px) {
    width: 100%;
    padding: 0px 10px;
    margin: 20px 0px 10px;
  }
`;

const SynopsisWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Synopsis = styled.div`
  padding: 10px;
  background-color: ${COLORS.PAGE_WHITE};
  border-radius: 10px;
  width: 100%;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const PageInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InformationWrapper = styled.div`
  background-color: ${COLORS.PAGE_WHITE};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 0px;
  margin-bottom: 5px;
  span {
    font-style: italic;
    color: ${COLORS.PAGE_TITLE_COLOR};
  }
`;

const CastContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  padding: 10px;
  color: ${COLORS.SECTION_COLOR};
`;

const CastContent = styled.div`
  @media (min-width: 1200px) {
    width: 100%;
  }
`;

const PageCastWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PageCast = styled.div`
  background-color: ${COLORS.PAGE_WHITE};
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

  display: flex;
  padding: 10px;
  border-radius: 10px;
  gap: 15px;
  width: 100%;
  img {
    width: 80px;
    height: 130px;
    border-radius: 10px;
  }
`;

const CastProfile = styled.div`
  padding: 5px 5px 0px 0px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
`;

const CastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    font-style: italic;
    color: ${COLORS.LINK_COLOR};
  }
`;

const ShowMore = styled.button`
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  padding: 10px;
  margin-bottom: 10px;
  color: ${COLORS.PAGE_WHITE};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const FullContentWrapper = styled.div`
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 3fr;
    max-width: 1400px;
    margin: auto;
    display: grid;
    align-items: baseline;
    height: 100%;
  }
`;

const SeasonsWrapper = styled.div`
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const SeasonsInformation = styled.div`
  width: 100%;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    background-color: ${COLORS.PAGE_WHITE};
    padding: 10px;
    border-radius: 10px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    background-color: ${COLORS.PAGE_WHITE};
    padding: 10px;
    border-radius: 10px;
  }
`;

const Season = styled.div`
  @media (min-width: 1200px) {
    display: flex;
    background-color: ${COLORS.PAGE_WHITE};
    border-radius: 10px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: flex;
  }
`;

const SeasonPoster = styled.div`
  @media (max-width: 768px) {
    img {
      width: 130px;
      height: 100%;
      border-radius: 10px;
    }
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    img {
      width: 130px;
      height: 100%;
      border-radius: 10px;
    }
  }
  @media (min-width: 1200px) {
    img {
      width: 130px;
      height: 100%;
      border-radius: 10px;
    }
  }
`;

const SeasonContent = styled.div`
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px 10px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px 10px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px 10px;
  }
`;

const SeasonProfile = styled.div`
  span {
    color: ${COLORS.LINK_COLOR};
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: flex;
    flex-direction: column;
  }
`;

const Homepage = styled.a`
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 10px;
  padding: 5px;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  text-decoration: none;
  img {
    width: 30px;
  }
  @media (min-width: 1200px) {
    bottom: 50px;
    right: 20%;
  }
`;

const PageMovie = (props: any) => {
  const [workInformation, setWorkInformation] = useState<Work>();
  const [workCast, setCast] = useState<Cast>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllCast, setShowAllCast] = useState<boolean>(false);
  const [movieCollection, setMovieCollection] = useState<Collection>();
  const workType = props.type;
  const { workId } = useParams() as Params;

  const navigate = useNavigate();

  const API_GET_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
    },
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    console.log(workId);
    const numWorkId = Number(workId);
    if (isNaN(numWorkId)) {
      navigate("/error");
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${numWorkId}`, API_GET_OPTIONS)
        .then((response) => response.json())
        .then((response) => {
          setWorkInformation(response);
          if (response.belongs_to_collection) {
            fetch(
              `https://api.themoviedb.org/3/search/collection?query=${response.belongs_to_collection.name}&include_adult=false&language=en-US&page=1`,
              API_GET_OPTIONS
            )
              .then((response) => response.json())
              .then((response) => setMovieCollection(response.results[0]));
          }
        })
        .catch((err) => setError(`ERROR WHILE FETCHING: ${err}`));
      fetch(
        `https://api.themoviedb.org/3/movie/${numWorkId}/credits`,
        API_GET_OPTIONS
      )
        .then((response) => response.json())
        .then((response) => setCast(response))
        .catch((err) => {
          setError(`ERROR WHILE FETCHING: ${err}`);
        });
    }
    setLoading(false);
  }, []);

  console.log(workInformation);

  return (
    <div>
      {isLoading && <Styled.Loading>Loading...</Styled.Loading>}
      {error && <Styled.Error>ERROR: {error}</Styled.Error>}
      {workInformation && workCast && (
        <div>
          <Helmet>
            <title>{workInformation.title}</title>
          </Helmet>
          <PageBackgroundWrapper>
            <PageBackgroundContent>
              <PageBackground
                background={
                  workInformation.backdrop_path
                    ? `https://www.themoviedb.org/t/p/original${workInformation.backdrop_path}`
                    : no_background
                }
              ></PageBackground>
              <PagePoster>
                <img
                  src={
                    workInformation.poster_path
                      ? `https://www.themoviedb.org/t/p/original${workInformation.poster_path}`
                      : no_poster
                  }
                  alt={workInformation.title}
                />
              </PagePoster>
            </PageBackgroundContent>
            <PageWorkContentWrapper>
              <PageStatus>
                <p>{workInformation.status}</p>
              </PageStatus>
              <PageContentWrapper>
                <PageTitle>
                  <p>{workInformation.title}</p>
                </PageTitle>
                {workInformation.title !== workInformation.original_title && (
                  <PageOriginalTitle>
                    <p>{workInformation.original_title}</p>
                  </PageOriginalTitle>
                )}
                {workInformation.tagline ? (
                  <PageTagline>
                    <p>{`"${workInformation.tagline}"`}</p>
                  </PageTagline>
                ) : undefined}
              </PageContentWrapper>
            </PageWorkContentWrapper>
            <FullContentWrapper>
              <SynopsisInformation>
                <SynopsisWrapper>
                  <SectionTitle>Synopsis</SectionTitle>
                  <Synopsis>
                    {workInformation.overview
                      ? workInformation.overview
                      : "No Information"}
                  </Synopsis>
                </SynopsisWrapper>
                <PageInformation>
                  <SectionTitle>Information</SectionTitle>
                  <InformationWrapper>
                    <Information>
                      <span>Homepage</span>
                      {workInformation.homepage &&
                      /^(http:\/\/www\.|https:\/\/www\.)/.test(
                        workInformation.homepage
                      ) ? (
                        <a
                          href={workInformation.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {workInformation.homepage}
                        </a>
                      ) : (
                        "No Information"
                      )}
                    </Information>
                    <Information>
                      <span>IMDB</span>
                      {workInformation.imdb_id ? (
                        <a
                          href={`https://www.imdb.com/title/${workInformation.imdb_id}/`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {`https://www.imdb.com/title/${workInformation.imdb_id}/`}
                        </a>
                      ) : (
                        "No Information"
                      )}
                    </Information>
                    <Information>
                      <span>Release Date</span>
                      <p>
                        {workInformation.release_date
                          ? workInformation.release_date
                          : "No Information"}
                      </p>
                    </Information>
                    <Information>
                      <span>Runtime</span>
                      <p>
                        {workInformation.runtime
                          ? workInformation.runtime + " min"
                          : "No Information"}
                      </p>
                    </Information>
                    <Information>
                      <span>Score</span>
                      <p>
                        {workInformation.vote_average > 0
                          ? workInformation.vote_average
                              .toFixed(1)
                              .replace(".", "")
                          : "No Information"}
                      </p>
                    </Information>
                    <Information>
                      <span>Genres</span>
                      {workInformation.production_companies[0]
                        ? Object.values(workInformation.genres).map(
                            (genre, index) => <p key={index}>{genre.name}</p>
                          )
                        : "No Information"}
                    </Information>
                    <Information>
                      <span>Original Language</span>
                      <p>{workInformation.original_language.toUpperCase()}</p>
                    </Information>
                    <Information>
                      <span>Budget</span>
                      <p>
                        {workInformation.budget > 0
                          ? workInformation.budget.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : "No Information"}
                      </p>
                    </Information>
                    <Information>
                      <span>Revenue</span>
                      <p>
                        {workInformation.revenue > 0
                          ? workInformation.revenue.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })
                          : "No Information"}
                      </p>
                    </Information>
                    <Information>
                      <span>Production Countries</span>
                      {workInformation.production_companies[0]
                        ? Object.values(
                            workInformation.production_countries
                          ).map((country, index) => (
                            <p key={index}>{country.name}</p>
                          ))
                        : "No Information"}
                    </Information>
                    <Information>
                      <span>Production Companies</span>
                      {workInformation.production_companies[0]
                        ? Object.values(
                            workInformation.production_companies
                          ).map((companies, index) => (
                            <p key={index}>{companies.name}</p>
                          ))
                        : "No Information"}
                    </Information>
                  </InformationWrapper>
                </PageInformation>
              </SynopsisInformation>
              <SynopsisInformation>
                {workInformation.belongs_to_collection && (
                  <SeasonsWrapper>
                    <SectionTitle>
                      <p>Collection</p>
                    </SectionTitle>
                    <SeasonsInformation>
                      <Season>
                        <SeasonPoster>
                          <img
                            src={
                              workInformation.belongs_to_collection.poster_path
                                ? `https://www.themoviedb.org/t/p/original${workInformation.belongs_to_collection.poster_path}`
                                : no_poster
                            }
                            alt={workInformation.belongs_to_collection.name}
                          />
                        </SeasonPoster>
                        <SeasonContent>
                          <SeasonProfile>
                            <span>Belongs to Collection</span>
                            <p>
                              {workInformation.belongs_to_collection.name
                                ? workInformation.belongs_to_collection.name
                                : "No Information"}
                            </p>
                          </SeasonProfile>
                          <SeasonProfile>
                            <span>Overview</span>
                            <p>
                              {movieCollection?.overview
                                ? movieCollection?.overview
                                : "No Information"}
                            </p>
                          </SeasonProfile>
                        </SeasonContent>
                      </Season>
                    </SeasonsInformation>
                  </SeasonsWrapper>
                )}
                {workCast.cast[0] && (
                  <CastContentWrapper>
                    <SectionTitle>
                      <p>Cast</p>
                    </SectionTitle>
                    <CastContent>
                      {workCast.cast[0] && (
                        <PageCastWrapper>
                          {Object.values(workCast.cast).map((cast, index) =>
                            showAllCast || index < 12 ? (
                              <PageCast key={cast.id}>
                                <img
                                  src={
                                    cast.profile_path
                                      ? `https://www.themoviedb.org/t/p/original${cast.profile_path}`
                                      : no_cast_image
                                  }
                                  alt={cast.name}
                                />
                                <CastWrapper>
                                  <CastProfile>
                                    <span>Name</span>
                                    <p>
                                      {cast.known_for_department
                                        ? cast.name
                                        : "No Information"}
                                    </p>
                                  </CastProfile>
                                  <CastProfile>
                                    <span>Role</span>
                                    <p>
                                      {cast.known_for_department
                                        ? cast.known_for_department
                                        : "No Information"}
                                    </p>
                                  </CastProfile>
                                  <CastProfile>
                                    <span>Character</span>
                                    <p>
                                      {cast.character.replace(/\(.*?\)/g, "")
                                        ? cast.character.replace(/\(.*?\)/g, "")
                                        : "No Information"}
                                    </p>
                                  </CastProfile>
                                </CastWrapper>
                              </PageCast>
                            ) : undefined
                          )}
                        </PageCastWrapper>
                      )}
                    </CastContent>
                    {workCast.cast[11] && (
                      <ShowMore
                        onClick={() => {
                          setShowAllCast(!showAllCast);
                        }}
                      >
                        {showAllCast ? "Show Less" : "Show More"}
                      </ShowMore>
                    )}
                  </CastContentWrapper>
                )}
              </SynopsisInformation>
            </FullContentWrapper>
          </PageBackgroundWrapper>
        </div>
      )}
      <Homepage href="/">
        <img src={home} alt="home" />
      </Homepage>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default PageMovie;
