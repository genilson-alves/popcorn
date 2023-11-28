import * as Styled from "../Styled";
import React, { useState, useEffect } from "react";
import { HomeNavigationBar } from "./NavigationBar";

type Movies = {
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
  name: string;
};

const TypeModel = () => {
  const [POPULAR_MOVIES_DATA, setMoviesPopular] = useState<Movies[]>([]);

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
    setLoading(true);
    setError(null);
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?&page=1`,
      API_GET_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => setMoviesPopular(response.results))
      .catch((err) => setError(`ERROR 2 FETCHING : ${err}`));
    setLoading(false);
  }, []);

  return (
    <div>
      <HomeNavigationBar></HomeNavigationBar>
      <Styled.TypeModelWrapper>
        {POPULAR_MOVIES_DATA.length > 0 && (
          <Styled.TypeModel>
            {POPULAR_MOVIES_DATA.map((movies) => (
              <Styled.TypeModelContent key={movies.id}>
                <Styled.TypeModelPoster>
                  <Styled.TypeModelRating>
                    {movies.vote_average.toFixed(1).replace(".", "")}
                  </Styled.TypeModelRating>
                  <img
                    src={`https://www.themoviedb.org/t/p/original${movies.poster_path}`}
                    alt="any"
                  ></img>
                </Styled.TypeModelPoster>
                <Styled.TypeModelTitle>
                  <Styled.RouterLink to={`/movie/${movies.id}`}>
                    {movies.title}
                  </Styled.RouterLink>
                </Styled.TypeModelTitle>
              </Styled.TypeModelContent>
            ))}
          </Styled.TypeModel>
        )}
      </Styled.TypeModelWrapper>
    </div>
  );
};

export default TypeModel;
