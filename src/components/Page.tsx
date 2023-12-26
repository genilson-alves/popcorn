import React from "react";
import { useState, useEffect } from "react";
import * as Styled from "../Styled";
import styled from "styled-components";
import { COLORS } from "../Styled";
import { PageNavigationBar } from "./NavigationBar";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterComponent } from "./FooterComponent";
const no_image = require("../assets/no_image.png");
const no_cast_image = require("../assets/no_cast_image.jpg");
const no_background = require("../assets/no_background.jpg");
const no_poster = require("../assets/no_poster.jpg");

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

const PageBackgroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageBackground = styled.div<{ background: string }>`
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 250px;
`;

const PagePoster = styled.div`
  img {
    position: relative;
    margin-top: -80%;
    width: 130px;
    height: 200px;
    border-radius: 5px;
  }
`;

const PageContentWrapper = styled.div`
  max-width: 400px;
`;

const PageStatus = styled.div`
  padding: 5px;
  background-color: ${COLORS.STATUS};
  color: ${COLORS.PAGE_WHITE};
  border-radius: 5px;
  width: 130px;
  text-align: center;
`;

const PageTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px 10px 0px;
  text-align: center;
`;

const PageOriginalTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  font-style: italic;
  text-align: center;
`;

const PageTagline = styled.div`
  font-style: italic;
  text-align: center;
  padding: 10px;
`;

const Synopsis = styled.div`
  padding: 10px;
  background-color: ${COLORS.PAGE_WHITE};
  border-radius: 10px;
  margin: 0px 10px 10px;
`;

const PageInformation = styled.div`
  padding: 10px;
  background-color: ${COLORS.PAGE_WHITE};
  border-radius: 10px;
  margin: 0px 10px 10px;
`;

const InformationWrapper = styled.div``;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  margin-bottom: 5px;
  span {
    font-style: italic;
    color: ${COLORS.PAGE_TITLE_COLOR};
  }
`;

const PageCastWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const PageCast = styled.div`
  background-color: ${COLORS.PAGE_WHITE};
  width: 100%;
  margin: 0px 10px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  gap: 15px;
  img {
    width: 80px;
    height: 130px;
    border-radius: 10px;
  }
`;

const Page = (props: any) => {
  const [workInformation, setWorkInformation] = useState<Work>();
  const [workCast, setCast] = useState<Cast>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllCast, setShowAllCast] = useState<boolean>(false);
  const workType = props.type;
  const workId = useParams();
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
    fetch(
      `https://api.themoviedb.org/3/${workType}/${workId.workId}`,
      API_GET_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => setWorkInformation(response))
      .catch((err) => setError(`ERROR WHILE FETCHING: ${err}`));
    fetch(
      `https://api.themoviedb.org/3/${workType}/${workId.workId}/credits`,
      API_GET_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => setCast(response))
      .catch((err) => setError(`ERROR WHILE FETCHING: ${err}`));
    setLoading(false);
  }, []);

  console.log(workInformation);
  console.log(workCast);

  return (
    <div>
      {isLoading && <Styled.Loading>Loading...</Styled.Loading>}
      {error && <Styled.Error>ERROR: {error}</Styled.Error>}
      {workInformation && workCast && (
        <div>
          {workInformation.name ? (
            <div>
              <Helmet>
                <title>{workInformation.name}</title>
              </Helmet>
              <PageBackgroundWrapper>
                <PageBackground
                  background={`https://www.themoviedb.org/t/p/original${workInformation.backdrop_path}`}
                ></PageBackground>
                <div>
                  <PagePoster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${workInformation.poster_path}`}
                      alt={workInformation.name}
                    />
                  </PagePoster>
                </div>
                <PageTitle>
                  <p>{workInformation.name}</p>
                </PageTitle>
                <Synopsis>
                  <p>{workInformation.overview}</p>
                </Synopsis>
              </PageBackgroundWrapper>
            </div>
          ) : (
            <div>
              <Helmet>
                <title>{workInformation.title}</title>
              </Helmet>
              <PageBackgroundWrapper>
                <PageBackground
                  background={`https://www.themoviedb.org/t/p/original${workInformation.backdrop_path}`}
                ></PageBackground>
                <div>
                  <PagePoster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${workInformation.poster_path}`}
                      alt={workInformation.title}
                    />
                  </PagePoster>
                </div>
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
                  <Synopsis>
                    <p>{workInformation.overview}</p>
                  </Synopsis>
                  <PageInformation>
                    <InformationWrapper>
                      <Information>
                        <span>Homepage</span>
                        <a
                          href={workInformation.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {workInformation.homepage}
                        </a>
                      </Information>
                      <Information>
                        <span>IMDB</span>
                        <a
                          href={`https://www.imdb.com/title/${workInformation.imdb_id}/`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {`https://www.imdb.com/title/${workInformation.imdb_id}/`}
                        </a>
                      </Information>
                      <Information>
                        <span>Release Date</span>
                        <p>{workInformation.release_date}</p>
                      </Information>
                      <Information>
                        <span>Score</span>
                        <p>
                          {workInformation.vote_average
                            .toFixed(1)
                            .replace(".", "")}
                        </p>
                      </Information>
                      <Information>
                        <span>Genres</span>
                        {Object.values(workInformation.genres).map(
                          (genre, index) => (
                            <p key={index}>{genre.name}</p>
                          )
                        )}
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
                    </InformationWrapper>
                  </PageInformation>
                  {workCast.cast[0] && (
                    <PageCastWrapper>
                      {Object.values(workCast.cast).map((cast) => (
                        <PageCast key={cast.id}>
                          <img
                            src={
                              cast.profile_path
                                ? `https://www.themoviedb.org/t/p/original${cast.profile_path}`
                                : no_cast_image
                            }
                            alt={cast.name}
                          />
                          <div>
                            <div>
                              <p>{cast.name}</p>
                              <p>
                                {cast.character.replace(/\s*\(voice\)\s*/, "")}
                              </p>
                            </div>
                            <p>{cast.known_for_department}</p>
                          </div>
                        </PageCast>
                      ))}
                    </PageCastWrapper>
                  )}
                </PageContentWrapper>
              </PageBackgroundWrapper>
            </div>
          )}
        </div>
      )}
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Page;
