import React, { useState, useEffect } from "react";
import * as Styled from "../Styled";

const logo = require("../assets/logo.png");
const previous = require("../assets/previous.png");
const next = require("../assets/next.png");

type Movies = {
  poster_path: string;
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

type Series = {
  name: string;
} & Omit<Movies, "title">;

const NavigationComponent = () => {
  return (
    <Styled.NavigationWrapper>
      <Styled.Navigation>
        <Styled.Logo>
          <img src={logo} alt="logo" />
        </Styled.Logo>
        <Styled.NavigationLinks>
          <Styled.NavigationOptions>
            <Styled.NavigationLink href="#">Search</Styled.NavigationLink>
            <Styled.NavigationLink href="#">Movies</Styled.NavigationLink>
            <Styled.NavigationLink href="#">TV Series</Styled.NavigationLink>
          </Styled.NavigationOptions>
          <Styled.NavigationUser>
            <Styled.NavigationLink href="#">Sign In</Styled.NavigationLink>
            <Styled.NavigationLink href="#">Sign Up</Styled.NavigationLink>
          </Styled.NavigationUser>
        </Styled.NavigationLinks>
      </Styled.Navigation>
    </Styled.NavigationWrapper>
  );
};

const Home: React.FC = () => {
  const [POPULAR_MOVIES_DATA, setMoviesPopular] = useState<Movies[]>([]);
  const [UPCOMING_MOVIES_DATA, setMoviesUpcoming] = useState<Movies[]>([]);
  const [TOP_MOVIES_DATA, setMoviesTop] = useState<Movies[]>([]);
  const [ON_AIR_SERIES_DATA, setSeriesOnAir] = useState<Series[]>([]);
  const [POPULAR_SERIES_DATA, setSeriesPopular] = useState<Series[]>([]);
  const [TOP_SERIES_DATA, setSeriesTop] = useState<Series[]>([]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.themoviedb.org/3/movie/popular", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setMoviesPopular(response.results))
      .catch((err) => setError(`ERROR 2 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/movie/upcoming", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setMoviesUpcoming(response.results))
      .catch((err) => setError(`ERROR 2 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/movie/top_rated", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setMoviesTop(response.results))
      .catch((err) => setError(`ERROR 3 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/tv/popular", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setSeriesPopular(response.results))
      .catch((err) => setError(`ERROR 4 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/tv/on_the_air", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setSeriesOnAir(response.results))
      .catch((err) => setError(`ERROR 5 FETCHING : ${err}`));

    fetch("https://api.themoviedb.org/3/tv/top_rated", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setSeriesTop(response.results))
      .catch((err) => setError(`ERROR 6 FETCHING : ${err}`));
    console.log(TOP_SERIES_DATA);
    setLoading(false);
  }, []);

  const API_GET_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
    },
  };

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const handleNextMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex + 1) % POPULAR_MOVIES_DATA.length
    );
  };

  const handlePreviousMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) =>
        (prevIndex - 1 + POPULAR_MOVIES_DATA.length) %
        POPULAR_MOVIES_DATA.length
    );
  };

  return (
    <div>
      <NavigationComponent></NavigationComponent>
      <Styled.Main>
        {isLoading ?? <Styled.Loading>Loading...</Styled.Loading>}
        {error && <Styled.Error>ERROR: {error}</Styled.Error>}
        {POPULAR_MOVIES_DATA.length > 0 && (
          <Styled.FeaturedMovies>
            {currentMovieIndex > 0 && (
              <Styled.NextPrevious onClick={handlePreviousMovie}>
                <img src={previous} alt="previous" />
              </Styled.NextPrevious>
            )}
            <Styled.FeaturedContent
              key={POPULAR_MOVIES_DATA[currentMovieIndex].id}
            >
              <Styled.FeaturedPoster>
                <img
                  src={`https://www.themoviedb.org/t/p/original${POPULAR_MOVIES_DATA[currentMovieIndex].poster_path}`}
                  alt={POPULAR_MOVIES_DATA[currentMovieIndex].title}
                ></img>
              </Styled.FeaturedPoster>
              <Styled.FeaturedOverview>
                <Styled.FeaturedInformation>
                  <Styled.FeaturedTitle>
                    {POPULAR_MOVIES_DATA[currentMovieIndex].title}
                  </Styled.FeaturedTitle>
                  <Styled.Score>
                    {POPULAR_MOVIES_DATA[
                      currentMovieIndex
                    ].vote_average.toFixed(1)}
                  </Styled.Score>
                </Styled.FeaturedInformation>
                <Styled.FeaturedReleaseDate>
                  <h3>Release Date:</h3>
                  {POPULAR_MOVIES_DATA[currentMovieIndex].release_date}
                </Styled.FeaturedReleaseDate>
                <Styled.FeaturedSynopsis>
                  <h3>Synopsis:</h3>
                  {POPULAR_MOVIES_DATA[currentMovieIndex].overview}
                </Styled.FeaturedSynopsis>
              </Styled.FeaturedOverview>
            </Styled.FeaturedContent>
            <Styled.NextPrevious onClick={handleNextMovie}>
              <img src={next} alt="next" />
            </Styled.NextPrevious>
          </Styled.FeaturedMovies>
        )}
        {UPCOMING_MOVIES_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>UPCOMING MOVIES</h1>
              <Styled.ViewMore href="#">View More</Styled.ViewMore>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {UPCOMING_MOVIES_DATA.map((movie) => (
                <Styled.Upcoming key={movie.id}>
                  <Styled.Poster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                    ></img>
                  </Styled.Poster>
                  <Styled.Title>{movie.title}</Styled.Title>
                </Styled.Upcoming>
              ))}
            </Styled.UpcomingContainer>
          </div>
        )}
        {POPULAR_SERIES_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>POPULAR SERIES</h1>
              <Styled.ViewMore href="#">View More</Styled.ViewMore>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {POPULAR_SERIES_DATA.map((series) => (
                <Styled.Upcoming key={series.id}>
                  <Styled.Poster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${series.poster_path}`}
                      alt={series.name}
                    ></img>
                  </Styled.Poster>
                  <Styled.Title>{series.name}</Styled.Title>
                </Styled.Upcoming>
              ))}
            </Styled.UpcomingContainer>
          </div>
        )}
        {ON_AIR_SERIES_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>AIRING SERIES</h1>
              <Styled.ViewMore href="#">View More</Styled.ViewMore>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {ON_AIR_SERIES_DATA.map((series) => (
                <Styled.Upcoming key={series.id}>
                  <Styled.Poster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${series.poster_path}`}
                      alt={series.name}
                    ></img>
                  </Styled.Poster>
                  <Styled.Title>{series.name}</Styled.Title>
                </Styled.Upcoming>
              ))}
            </Styled.UpcomingContainer>
          </div>
        )}
        {TOP_SERIES_DATA.length > 0 && TOP_MOVIES_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>TOP</h1>
              <Styled.ViewMore href="#">View More</Styled.ViewMore>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {TOP_SERIES_DATA.map((series) => (
                <Styled.Upcoming key={series.id}>
                  <Styled.Poster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${series.poster_path}`}
                      alt={series.name}
                    ></img>
                  </Styled.Poster>
                  <Styled.Title>{series.name}</Styled.Title>
                </Styled.Upcoming>
              ))}
            </Styled.UpcomingContainer>
            <Styled.UpcomingContainer>
              {TOP_MOVIES_DATA.map((movies) => (
                <Styled.Upcoming key={movies.id}>
                  <Styled.Poster>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${movies.poster_path}`}
                      alt={movies.title}
                    ></img>
                  </Styled.Poster>
                  <Styled.Title>{movies.title}</Styled.Title>
                </Styled.Upcoming>
              ))}
            </Styled.UpcomingContainer>
          </div>
        )}
      </Styled.Main>
      <Styled.Footer>
        <div>
          <h3>CONTACT</h3>
          <ul>
            <li>
              <a href="#">GitHub</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>API</h3>
          <ul>
            <li>
              <a href="#">Website</a>
            </li>
            <li>
              <a href="#">Documentation</a>
            </li>
          </ul>
        </div>
      </Styled.Footer>
    </div>
  );
};

export default Home;
