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
  const [MOVIES_AIRING_DATA, setMoviesAiring] = useState<Movies[]>([]);
  const [MOVIES_UPCOMING_DATA, setMoviesUpcoming] = useState<Movies[]>([]);
  const [MOVIES_POPULAR_DATA, setMoviesPopular] = useState<Movies[]>([]);
  const [SERIES_AIRING_DATA, setSeriesAiring] = useState<Series[]>([]);
  const [SERIES_TODAY_DATA, setSeriesToday] = useState<Series[]>([]);
  const [SERIES_POPULAR_DATA, setSeriesPopular] = useState<Series[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.themoviedb.org/3/movie/now_playing", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setMoviesAiring(response.results))
      .catch((err) => setError(`ERROR 1 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/movie/popular", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setMoviesPopular(response.results))
      .catch((err) => setError(`ERROR 2 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/movie/upcoming", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setMoviesUpcoming(response.results))
      .catch((err) => setError(`ERROR 3 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/tv/on_the_air", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setSeriesAiring(response.results))
      .catch((err) => setError(`ERROR 4 FETCHING : ${err}`));
    fetch("https://api.themoviedb.org/3/tv/popular", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setSeriesPopular(response.results))
      .catch((err) => setError(`ERROR 5 FETCHING : ${err}`));
    console.log(SERIES_AIRING_DATA);
    fetch("https://api.themoviedb.org/3/tv/airing_today", API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setSeriesToday(response.results))
      .catch((err) => setError(`ERROR 6 FETCHING : ${err}`));
    setLoading(false);
  }, []);

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const handleNextMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex + 1) % MOVIES_AIRING_DATA.length
    );
  };

  const handlePreviousMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) =>
        (prevIndex - 1 + MOVIES_AIRING_DATA.length) % MOVIES_AIRING_DATA.length
    );
  };

  const API_GET_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
    },
  };

  return (
    <div>
      <NavigationComponent></NavigationComponent>
      <Styled.Main>
        {isLoading ?? <Styled.Loading>Loading...</Styled.Loading>}
        {error && <Styled.Error>ERROR: {error}</Styled.Error>}
        {MOVIES_AIRING_DATA.length > 0 && (
          <Styled.FeaturedMovies>
            {currentMovieIndex > 0 && (
              <Styled.NextPrevious onClick={handlePreviousMovie}>
                <img src={previous} alt="previous" />
              </Styled.NextPrevious>
            )}
            <Styled.FeaturedContent
              key={MOVIES_AIRING_DATA[currentMovieIndex].id}
            >
              <Styled.FeaturedPoster>
                <img
                  src={`https://www.themoviedb.org/t/p/original${MOVIES_AIRING_DATA[currentMovieIndex].poster_path}`}
                  alt={MOVIES_AIRING_DATA[currentMovieIndex].title}
                ></img>
              </Styled.FeaturedPoster>
              <Styled.FeaturedOverview>
                <Styled.FeaturedInformation>
                  <Styled.FeaturedTitle>
                    {MOVIES_AIRING_DATA[currentMovieIndex].title}
                  </Styled.FeaturedTitle>
                  <Styled.Score>
                    {MOVIES_AIRING_DATA[currentMovieIndex].vote_average.toFixed(
                      1
                    )}
                  </Styled.Score>
                </Styled.FeaturedInformation>
                <Styled.FeaturedReleaseDate>
                  <h3>Release Date:</h3>
                  {MOVIES_AIRING_DATA[currentMovieIndex].release_date}
                </Styled.FeaturedReleaseDate>
                <Styled.FeaturedSynopsis>
                  <h3>Synopsis:</h3>
                  {MOVIES_AIRING_DATA[currentMovieIndex].overview}
                </Styled.FeaturedSynopsis>
              </Styled.FeaturedOverview>
            </Styled.FeaturedContent>
            <Styled.NextPrevious onClick={handleNextMovie}>
              <img src={next} alt="next" />
            </Styled.NextPrevious>
          </Styled.FeaturedMovies>
        )}
        {MOVIES_UPCOMING_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>UPCOMING MOVIES</h1>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {MOVIES_UPCOMING_DATA.map((movie) => (
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
        {MOVIES_POPULAR_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>POPULAR MOVIES</h1>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {MOVIES_POPULAR_DATA.map((movie) => (
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
        {SERIES_TODAY_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>AIRING TODAY SERIES</h1>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {SERIES_TODAY_DATA.map((series) => (
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
        {SERIES_AIRING_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>UPCOMING SERIES</h1>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {SERIES_AIRING_DATA.map((series) => (
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
        {SERIES_POPULAR_DATA.length > 0 && (
          <div>
            <Styled.SectionTitle>
              <h1>POPULAR SERIES</h1>
            </Styled.SectionTitle>
            <Styled.UpcomingContainer>
              {SERIES_POPULAR_DATA.map((series) => (
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
      </Styled.Main>
      <Styled.Footer>Footer</Styled.Footer>
    </div>
  );
};

export default Home;
