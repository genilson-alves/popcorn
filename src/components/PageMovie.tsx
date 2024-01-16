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
`;

const SynopsisWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Synopsis = styled.div`
  padding: 10px;
  margin: 0px 10px;
  background-color: ${COLORS.PAGE_WHITE};
  border-radius: 10px;
`;

const PageInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;

const InformationWrapper = styled.div`
  background-color: ${COLORS.PAGE_WHITE};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
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
  margin: 0px 10px;
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

const SynopsisInformation = styled.div`
  @media (min-width: 1200px) {
    margin: 20px 0px 10px;
  }
`;

const PageMovie = (props: any) => {
  const [workInformation, setWorkInformation] = useState<Work>();
  const [workCast, setCast] = useState<Cast>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllCast, setShowAllCast] = useState<boolean>(false);
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
        .then((response) => setWorkInformation(response))
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
                background={`https://www.themoviedb.org/t/p/original${workInformation.backdrop_path}`}
              ></PageBackground>
              <PagePoster>
                <img
                  src={`https://www.themoviedb.org/t/p/original${workInformation.poster_path}`}
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
                  <Synopsis>{workInformation.overview}</Synopsis>
                </SynopsisWrapper>
                <PageInformation>
                  <SectionTitle>Information</SectionTitle>
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
              </SynopsisInformation>
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
                                <p>{cast.name}</p>
                              </CastProfile>
                              <CastProfile>
                                <span>Role</span>
                                <p>{cast.known_for_department}</p>
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
            </FullContentWrapper>
          </PageBackgroundWrapper>
        </div>
      )}
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default PageMovie;
