import React from "react";
import { useState, useEffect } from "react";
import * as Styled from "../Styled";
import styled from "styled-components";
import { PageNavigationBar } from "./NavigationBar";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FooterComponent } from "./FooterComponent";
const no_image = require("../assets/no_image.png");
const no_cast_image = require("../assets/no_cast_image.jpg");
const no_background = require("../assets/no_background.jpg");
const no_poster = require("../assets/no_poster.jpg");

const PagePosterBackgroundWrapper = styled.div``;

const PagePoster = styled.div`
  position: absolute;
  top: 20%;
  left: 35%;
  img {
    width: 100px;
    height: 150px;
  }
`;

const PageBackground = styled.div`
  display: inline-block;
  position: relative;
  img {
    width: 100%;
    height: 200px;
  }
`;

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
    };
  };
};

const Page = (props: any) => {
  const [workInformation, setWorkInformation] = useState<Work>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workCast, setCast] = useState<Cast>();
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
          <Helmet>
            <title>Temporary Page Title</title>
          </Helmet>
          <div>
            <PagePosterBackgroundWrapper>
              <PageBackground>
                <img src={no_background} alt="a"></img>
              </PageBackground>
              <PagePoster>
                <img src={no_poster} alt="a"></img>
              </PagePoster>
            </PagePosterBackgroundWrapper>
          </div>
        </div>
      )}
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Page;

/* {showAllCast || index < 12 ? (
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
                      {workCast.cast[11] && (
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
</Styled.CastProfile>*/
