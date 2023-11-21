import React from "react";
import { useState, useEffect } from "react";
import * as Styled from "../Styled";
const no_image = require("../assets/no_image.png");

type Work = {
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  original_title?: string;
  overview: string;
  original_language: string;
  status: string;
  homepage: string;
  vote_average: number;
  vote_count: number;
  number_of_episodes: number;
  number_of_seasons: number;
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

const Page = () => {
  const [workInformation, setWorkInformation] = useState<Work>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workCast, setCast] = useState<Cast>();

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
    fetch(`https://api.themoviedb.org/3/tv/1399`, API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setWorkInformation(response))
      .catch((err) => setError(`ERROR WHILE FETCHING: ${err}`));
    fetch(`https://api.themoviedb.org/3/tv/1399/credits`, API_GET_OPTIONS)
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
        <Styled.WorkWrapper>
          <Styled.WorkContent>
            <Styled.WorkBackground>
              <img
                src={`https://www.themoviedb.org/t/p/original${workInformation.backdrop_path}`}
                alt={workInformation.name}
              ></img>
            </Styled.WorkBackground>
            <Styled.WorkOverviewContent>
              <Styled.WorkPoster>
                <img
                  src={`https://www.themoviedb.org/t/p/original${workInformation.poster_path}`}
                  alt={workInformation.name}
                ></img>
                <Styled.WorkStatus>{workInformation.status}</Styled.WorkStatus>
              </Styled.WorkPoster>
              <Styled.WorkOverview>
                <Styled.WorkTitle>
                  {workInformation.name || workInformation.original_title}
                </Styled.WorkTitle>
                <Styled.WorkOriginalTitle>
                  {workInformation.original_name}
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
                <Styled.PartTitle>Seasons</Styled.PartTitle>
                <Styled.WorkInformationRightContentInformationWrapper>
                  {Object.entries(workInformation.seasons).map(
                    ([key, season]) => (
                      <Styled.WorkInformationRightContentInformation key={key}>
                        <Styled.WorkInformationCast>
                          <Styled.CastProfile>
                            <img
                              src={`https://www.themoviedb.org/t/p/original${season.poster_path}`}
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
                <Styled.PartTitle>Cast</Styled.PartTitle>
                <Styled.WorkInformationRightContentInformationWrapper>
                  {Object.entries(workCast.cast).map(([key, cast]) => (
                    <Styled.WorkInformationRightContentInformation
                      style={{ justifyContent: "baseline" }}
                      key={key}
                    >
                      <Styled.WorkInformationCast>
                        <Styled.CastProfile>
                          <img
                            src={`https://www.themoviedb.org/t/p/original${cast.profile_path}`}
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
                    </Styled.WorkInformationRightContentInformation>
                  ))}
                </Styled.WorkInformationRightContentInformationWrapper>
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
              </Styled.WorkInformationRightContentWrapper>
            </Styled.AllWorkContentWrapper>
            <Styled.RightBarContentWrapper>
              <Styled.RightBarContent>
                <p>Title</p>
                <span>{workInformation.name}</span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Original Title</p>
                <span>{workInformation.original_name}</span>
              </Styled.RightBarContent>
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
              <Styled.RightBarContent>
                <p>Number of Episodes</p>
                <span>{workInformation.number_of_episodes}</span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Number of Seasons</p>
                <span>{workInformation.number_of_seasons}</span>
              </Styled.RightBarContent>
              {workInformation.episode_run_time[0] && (
                <Styled.RightBarContent>
                  <p>Episodes Duration</p>
                  <span>{workInformation.episode_run_time[0]} min</span>
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
              <Styled.RightBarContent>
                <p>First Air Date</p>
                <span>{workInformation.first_air_date}</span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Last Air Date</p>
                <span>{workInformation.last_air_date}</span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Rate Average</p>
                <span>{workInformation.vote_average.toFixed(1)}</span>
              </Styled.RightBarContent>
              <Styled.RightBarContent>
                <p>Rated by</p>
                <span>{workInformation.vote_count} users</span>
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
              <Styled.RightBarContent>
                <p>Networks</p>
                {Object.entries(workInformation.networks).map(
                  ([key, network]) => (
                    <span key={key}>{network.name}</span>
                  )
                )}
              </Styled.RightBarContent>
            </Styled.RightBarContentWrapper>
          </Styled.AllWorkInformationWrapper>
        </Styled.WorkWrapper>
      )}
    </div>
  );
};

export default Page;
