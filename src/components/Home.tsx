import React, { useState, useEffect } from "react";
import styled from "styled-components";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const MoviesContainer = styled.div``;

const MoviesItem = styled.div``;

const Loading = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 40px;
`;

const Home: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjQ0ZjkyMzM0MmFjNWQ1ZDg5ZmY2OTY5ODI2YTE2YiIsInN1YiI6IjY1MTQ0MmY2MDQ5OWYyMDBmZTk4NDE3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B9YRXujGO1xuAEvGCyxIY38Z9ahsOTYvT94sZjn4_ZY",
    },
  };
  const MOVIE_API_URL =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  useEffect(() => {
    fetch(MOVIE_API_URL, OPTIONS)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setData(response.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("An error ocurred while fetching data.");
        console.error(error);
      });
  }, []);

  return (
    <MoviesContainer>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        data.map((movie) => (
          <MoviesItem key={movie.id}>
            <div>{movie.title}</div>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </MoviesItem>
        ))
      )}
    </MoviesContainer>
  );
};

export default Home;
