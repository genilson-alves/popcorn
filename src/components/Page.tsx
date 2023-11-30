import React from "react";
import { useState, useEffect } from "react";
import * as Styled from "../Styled";
import { PageNavigationBar } from "./NavigationBar";
import { useParams } from "react-router-dom";
const no_image = require("../assets/no_image.jpg");
const no_cast_image = require("../assets/no_cast_image.jpg");

type WorkSeries = {
  backdrop_path: string;
  poster_path: string;
  name: string;
  title: string;
  original_name: string;
  original_title: string;
  overview: string;
  original_language: string;
  status: string;
  homepage: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  number_of_episodes: number;
  number_of_seasons: number;
  runtime: number;
  imdb_id: number;
  revenue: number;
  id: number;
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
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  release_date: string;
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
    };
  };
};

const Page = (props: any) => {
  const [workInformation, setWorkInformation] = useState<WorkSeries>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workCast, setCast] = useState<Cast>();
  const [showAllCast, setShowAllCast] = useState<boolean>(false);
  const workType = props.type;
  const movieId = useParams();

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
      `https://api.themoviedb.org/3/${workType}/${movieId.workId}`,
      API_GET_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => setWorkInformation(response))
      .catch((err) => setError(`ERROR WHILE FETCHING: ${err}`));
    fetch(
      `https://api.themoviedb.org/3/${workType}/${movieId.workId}/credits`,
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
      <PageNavigationBar></PageNavigationBar>
      {isLoading && <Styled.Loading>Loading...</Styled.Loading>}
      {error && <Styled.Error>ERROR: {error}</Styled.Error>}
      {workInformation && workCast && (
        <Styled.WorkWrapper>
          <Styled.WorkContent>
            <Styled.WorkBackground>
              <img
                src={`https://www.themoviedb.org/t/p/original${workInformation.backdrop_path}`}
                alt={
                  workInformation.name
                    ? workInformation.name
                    : workInformation.title
                }
              ></img>
            </Styled.WorkBackground>
            <Styled.WorkOverviewContent>
              <Styled.WorkPoster>
                <img
                  src={`https://www.themoviedb.org/t/p/original${workInformation.poster_path}`}
                  alt={
                    workInformation.name
                      ? workInformation.name
                      : workInformation.title
                  }
                ></img>
                <Styled.WorkStatus>{workInformation.status}</Styled.WorkStatus>
              </Styled.WorkPoster>
              <Styled.WorkOverview>
                <Styled.WorkTitle>
                  {workInformation.name || workInformation.original_name
                    ? workInformation.name || workInformation.original_name
                    : workInformation.title || workInformation.original_title}
                </Styled.WorkTitle>
                <Styled.WorkOriginalTitle>
                  {workInformation.original_name
                    ? workInformation.original_name
                    : workInformation.original_title}
                </Styled.WorkOriginalTitle>
                <Styled.WorkSynopsis>
                  {workInformation.overview}
                </Styled.WorkSynopsis>
                <Styled.WorkGenres>
                  {Object.entries(workInformation.genres).map(
                    ([key, genre]) => (
                      <Styled.WorkGenreTitle key={key}>
                        {genre.name}
                      </Styled.WorkGenreTitle>
                    )
                  )}
                </Styled.WorkGenres>
              </Styled.WorkOverview>
            </Styled.WorkOverviewContent>
          </Styled.WorkContent>
          <Styled.AllWorkInformationWrapper>
            <Styled.AllWorkContentWrapper>
              <Styled.WorkInformationRightContentWrapper>
                {workInformation.seasons && (
                  <div>
                    <Styled.PartTitle>Seasons</Styled.PartTitle>
                    <Styled.WorkInformationRightContentInformationWrapper>
                      {Object.entries(workInformation.seasons).map(
                        ([key, season]) => (
                          <Styled.WorkInformationRightContentInformation
                            key={key}
                          >
                            <Styled.WorkInformationCast>
                              <Styled.CastProfile>
                                <img
                                  src={
                                    season.poster_path
                                      ? `https://www.themoviedb.org/t/p/original${season.poster_path}`
                                      : no_image
                                  }
                                  alt={season.name}
                                ></img>
                              </Styled.CastProfile>
                              <Styled.CastInformation>
                                <Styled.CastName>
                                  <p>Name</p>
                                  {season.name}
                                </Styled.CastName>
                                <Styled.CastRole>
                                  <p>Episodes</p>
                                  {season.episode_count}
                                </Styled.CastRole>
                                <Styled.CastCharacter>
                                  <p>Score</p>
                                  {season.vote_average}
                                </Styled.CastCharacter>
                              </Styled.CastInformation>
                            </Styled.WorkInformationCast>
                          </Styled.WorkInformationRightContentInformation>
                        )
                      )}
                    </Styled.WorkInformationRightContentInformationWrapper>
                  </div>
                )}
                {workCast.cast[0] && <Styled.PartTitle>Cast</Styled.PartTitle>}
                <Styled.WorkInformationRightContentInformationWrapper>
                  {Object.entries(workCast.cast).map(([key, cast], index) => (
                    <Styled.WorkInformationRightContentInformation key={key}>
                      {showAllCast || index < 12 ? (
                        <Styled.WorkInformationCast>
                          <Styled.CastProfile>
                            <img
                              src={
                                cast.profile_path
                                  ? `https://www.themoviedb.org/t/p/original${cast.profile_path}`
                                  : no_cast_image
                              }
                              alt={cast.name}
                            ></img>
                          </Styled.CastProfile>
                          <Styled.CastInformation>
                            <Styled.CastName>
                              <p>Name</p>
                              {cast.name}
                            </Styled.CastName>
                            <Styled.CastRole>
                              <p>Role</p>
                              {cast.known_for_department}
                            </Styled.CastRole>
                            <Styled.CastCharacter>
                              <p>Character</p>
                              {cast.character.replace("(voice)", "")}
                            </Styled.CastCharacter>
                          </Styled.CastInformation>
                        </Styled.WorkInformationCast>
                      ) : null}
                    </Styled.WorkInformationRightContentInformation>
                  ))}
                </Styled.WorkInformationRightContentInformationWrapper>
                {showAllCast && (
                  <Styled.ShowAllCast>
                    <button
                      onClick={() => {
                        setShowAllCast(!showAllCast);
                      }}
                    >
                      {showAllCast ? "Show Less" : "Show More"}
                    </button>
                  </Styled.ShowAllCast>
                )}
                <Styled.PartTitle>Production Companies</Styled.PartTitle>
                <Styled.WorkInformationRightContentProductionWrapper>
                  {Object.entries(workInformation.production_companies).map(
                    ([key, companies]) => (
                      <Styled.ProductionCompanies key={key}>
                        {companies.name}
                        <img
                          src={
                            companies.logo_path
                              ? `https://www.themoviedb.org/t/p/original${companies.logo_path}`
                              : no_image
                          }
                          alt={companies.name}
                        ></img>
                      </Styled.ProductionCompanies>
                    )
                  )}
                </Styled.WorkInformationRightContentProductionWrapper>
                {workInformation.networks && (
                  <div>
                    <Styled.PartTitle>Networks</Styled.PartTitle>
                    <Styled.WorkInformationRightContentProductionWrapper>
                      {Object.entries(workInformation.networks).map(
                        ([key, networks]) => (
                          <Styled.ProductionCompanies key={key}>
                            {networks.name}
                            <img
                              src={
                                networks.logo_path
                                  ? `https://www.themoviedb.org/t/p/original${networks.logo_path}`
                                  : no_image
                              }
                              alt={networks.name}
                            ></img>
                          </Styled.ProductionCompanies>
                        )
                      )}
                    </Styled.WorkInformationRightContentProductionWrapper>
                  </div>
                )}
              </Styled.WorkInformationRightContentWrapper>
            </Styled.AllWorkContentWrapper>
            <Styled.RightBarContentWrapper>
              {workInformation.name ? (
                <Styled.RightBarContent>
                  <p>Title</p>
                  <span>{workInformation.name}</span>
                </Styled.RightBarContent>
              ) : (
                <Styled.RightBarContent>
                  <p>Title</p>
                  <span>{workInformation.title}</span>
                </Styled.RightBarContent>
              )}
              {workInformation.original_name ? (
                <Styled.RightBarContent>
                  <p>Original Title</p>
                  <span>{workInformation.original_name}</span>
                </Styled.RightBarContent>
              ) : (
                <Styled.RightBarContent>
                  <p>Original Title</p>
                  <span>{workInformation.original_title}</span>
                </Styled.RightBarContent>
              )}
              <Styled.RightBarContent>
                <p>Homepage</p>
                <a
                  href={workInformation.homepage}
                  target="_blank"
                  rel="noreferrer"
                >
                  {workInformation.homepage}
                </a>
              </Styled.RightBarContent>
              {workInformation.imdb_id && (
                <Styled.RightBarContent>
                  <p>IMDB</p>
                  <a
                    href={`https://www.imdb.com/title/${workInformation.imdb_id}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`https://www.imdb.com/title/${workInformation.imdb_id}/`}
                  </a>
                </Styled.RightBarContent>
              )}
              {workInformation.revenue > 0 && (
                <Styled.RightBarContent>
                  <p>Budget</p>
                  <span>
                    {workInformation.budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </Styled.RightBarContent>
              )}
              {workInformation.revenue > 0 && (
                <Styled.RightBarContent>
                  <p>Revenue</p>
                  <span>
                    {workInformation.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </Styled.RightBarContent>
              )}
              {workInformation.number_of_episodes && (
                <Styled.RightBarContent>
                  <p>Number of Episodes</p>
                  <span>{workInformation.number_of_episodes}</span>
                </Styled.RightBarContent>
              )}
              {workInformation.number_of_seasons && (
                <Styled.RightBarContent>
                  <p>Number of Seasons</p>
                  <span>{workInformation.number_of_seasons}</span>
                </Styled.RightBarContent>
              )}
              {workInformation.episode_run_time && (
                <Styled.RightBarContent>
                  <p>Episodes Duration</p>
                  <span>{workInformation.episode_run_time[0]} min</span>
                </Styled.RightBarContent>
              )}
              {workInformation.runtime && (
                <Styled.RightBarContent>
                  <p>Episodes Duration</p>
                  <span>{workInformation.runtime} min</span>
                </Styled.RightBarContent>
              )}
              <Styled.RightBarContent>
                <p>Genres</p>
                {Object.entries(workInformation.genres).map(([key, genre]) => (
                  <span key={key}>{genre.name}</span>
                ))}
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Status</p>
                <span>{workInformation.status}</span>
              </Styled.RightBarContent>
              {workInformation.first_air_date && (
                <Styled.RightBarContent>
                  <p>First Air Date</p>
                  <span>{workInformation.first_air_date}</span>
                </Styled.RightBarContent>
              )}
              {workInformation.last_air_date && (
                <Styled.RightBarContent>
                  <p>Last Air Date</p>
                  <span>{workInformation.last_air_date}</span>
                </Styled.RightBarContent>
              )}
              {workInformation.release_date && (
                <Styled.RightBarContent>
                  <p>Release Date</p>
                  <span>{workInformation.release_date}</span>
                </Styled.RightBarContent>
              )}
              <Styled.RightBarContent>
                <p>Rate Average</p>
                <span>{workInformation.vote_average.toFixed(1)}</span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Rated by</p>
                <span>
                  {workInformation.vote_count.toLocaleString("en-US")} users
                </span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Original Language</p>
                <span>{workInformation.original_language.toUpperCase()}</span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Spoken Languages</p>
                {Object.entries(workInformation.spoken_languages).map(
                  ([key, spoken_languages]) => (
                    <span key={key}>{spoken_languages.english_name}</span>
                  )
                )}
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Production Companies</p>
                {Object.entries(workInformation.production_companies).map(
                  ([key, companies]) => (
                    <span key={key}>{companies.name}</span>
                  )
                )}
              </Styled.RightBarContent>
              {workInformation.networks && (
                <Styled.RightBarContent>
                  <p>Networks</p>
                  {Object.entries(workInformation.networks).map(
                    ([key, network]) => (
                      <span key={key}>{network.name}</span>
                    )
                  )}
                </Styled.RightBarContent>
              )}
            </Styled.RightBarContentWrapper>
          </Styled.AllWorkInformationWrapper>
        </Styled.WorkWrapper>
      )}
    </div>
  );
};

export default Page;
