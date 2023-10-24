import React, { useState, useEffect } from "react";
import * as Styled from "../Styled";

const logo = require("../assets/logo.png");

type Movie = {
  poster_path: string;
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

const NavigationComponent = () => {
  return (
    <Styled.NavigationWrapper>
      <Styled.Navigation>
        <Styled.Logo>
          <img src={logo} alt="logo" />
        </Styled.Logo>
        <Styled.NavigationLinks>
          <Styled.Media>
            <Styled.Link href="#">Search</Styled.Link>
            <Styled.Link href="#">Movies</Styled.Link>
            <Styled.Link href="#">TV Series</Styled.Link>
          </Styled.Media>
          <Styled.User>
            <Styled.Link href="#">Sign In</Styled.Link>
            <Styled.Link href="#">Sign Up</Styled.Link>
          </Styled.User>
        </Styled.NavigationLinks>
      </Styled.Navigation>
    </Styled.NavigationWrapper>
  );
};

const Home: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setData(response.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {isLoading ?? <Styled.Loading>Loading...</Styled.Loading>}
      {error && <Styled.Error>ERROR: {error}</Styled.Error>}
      {data.length > 0 && (
        <div>
          <NavigationComponent></NavigationComponent>
          <Styled.Content>
            {data.map((movies) => (
              <div key={movies.id}>
                <Styled.Something>
                  <Styled.Poster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${movies.poster_path}`}
                      alt={movies.title}
                    ></img>
                  </Styled.Poster>
                  <Styled.Overview>
                    <Styled.Information>
                      <Styled.Title>{movies.title}</Styled.Title>
                      <Styled.Score>{movies.vote_average}</Styled.Score>
                    </Styled.Information>
                    <Styled.ReleaseDate>
                      <h3>Release Date:</h3>
                      {movies.release_date}
                    </Styled.ReleaseDate>
                    <Styled.Synopsis>
                      <h3>Synopsis:</h3>
                      {movies.overview}
                    </Styled.Synopsis>
                  </Styled.Overview>
                </Styled.Something>
              </div>
            ))}
          </Styled.Content>
          <Styled.Footer></Styled.Footer>
        </div>
      )}
    </div>
  );
};

export default Home;
