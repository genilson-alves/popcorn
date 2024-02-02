import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as Styled from "../Styled";
import { COLORS } from "../Styled";
import { FooterComponent } from "./FooterComponent";

const no_cast_image = require("../assets/no_cast_image.jpg");
const no_background = require("../assets/no_background.jpg");
const no_poster = require("../assets/no_poster.jpg");
const home = require("../assets/home.png");

type Work = {
  id: number;
  title: string;
  original_title: string;
  tagline: string;
  status: string;
  homepage: string;
  release_date: string;
  overview: string;
  vote_average: number;
  original_language: string;
  revenue: number;
  budget: number;
  runtime: number;
  imdb_id: number;
  backdrop_path: string;
  poster_path: string;
  genres: {
    [key: number]: {
      id: number;
      name: string;
    };
  };
  languages: {
    [key: number]: string;
  };
  production_companies: {
    [key: number]: {
      logo_path: string;
      name: string;
      origin_country: string;
    };
  };
  production_countries: {
    [key: number]: {
      name: string;
    };
  };
  belongs_to_collection: {
    name: string;
    poster_path: string;
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
  id: string;
};

type CollectionProps = {
  overview: string;
};

type ProviderProps = {
  provider_name: string;
  provider_id: number;
  logo_path: string;
};

type Provider = {
  ads: {
    [key: number]: ProviderProps;
  };
  buy: {
    [key: number]: ProviderProps;
  };
  flatrate: {
    [key: number]: ProviderProps;
  };
  free: {
    [key: number]: ProviderProps;
  };
  rent: {
    [key: number]: ProviderProps;
  };
};

type Similar = {
  [key: number]: {
    title: string;
    name: string;
    poster_path: string;
    id: number;
  };
};

type Content = {
  content?: Work;
  collection?: CollectionProps;
  cast?: Cast;
  similar?: Similar;
  provider?: Provider;
};

const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  padding: 10px;
  color: ${COLORS.SECTION_COLOR};
`;

const ProfileWrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: auto;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    flex-direction: column;
  }
`;

const LeftBarWrapper = styled.div`
  max-width: 1400px;
  margin-bottom: 5px;
  padding: 5px;
  flex: 1;
`;

const RightBarWrapper = styled.div`
  max-width: 1400px;
  margin: 5px;
  flex: 3;
`;

const MovieProfileImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieBackground = styled.div<{ background: string }>`
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 250px;
`;

const MoviePoster = styled.div`
  img {
    position: relative;
    margin-top: -80%;
    width: 130px;
    height: 200px;
    border-radius: 5px;
  }
  @media (min-width: 1200px) {
    img {
      position: relative;
      margin-top: -80%;
      width: 160px;
      height: 250px;
      border-radius: 5px;
    }
  }
`;

const MovieProfileInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: auto;
`;

const MovieStatus = styled.div`
  padding: 5px;
  background-color: ${COLORS.STATUS};
  color: ${COLORS.PAGE_WHITE};
  border-radius: 5px;
  width: 130px;
  text-align: center;
  @media (min-width: 1200px) {
    padding: 5px;
    background-color: ${COLORS.STATUS};
    color: ${COLORS.PAGE_WHITE};
    border-radius: 5px;
    width: 160px;
    text-align: center;
  }
`;

const MovieProfileInformation = styled.div`
  margin: 5px 0px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const MovieTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MovieOriginalTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  font-style: italic;
`;

const MovieTagline = styled.div`
  font-style: italic;
`;

const MovieInformationWrapper = styled.div``;

const Synopsis = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${COLORS.PAGE_WHITE};
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const InformationWrapper = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${COLORS.PAGE_WHITE};
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 0px;
  span {
    font-style: italic;
    color: ${COLORS.PAGE_TITLE_COLOR};
  }
`;

const DefaultComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CastContent = styled.div`
  width: 100%;
`;

const MovieCastWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MovieCast = styled.div`
  background-color: ${COLORS.PAGE_WHITE};
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  width: 100%;
  img {
    width: 80px;
    height: 130px;
    border-radius: 10px;
  }
`;

const CastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-style: italic;
    color: ${COLORS.LINK_COLOR};
  }
`;

const CastInformation = styled.div`
  padding: 5px 5px 0px 0px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
`;

const ShowMore = styled.button`
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
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

const CollectionInformationWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: ${COLORS.PAGE_WHITE};
  padding: 10px;
  border-radius: 10px;
`;

const CollectionInformation = styled.div`
  display: flex;
  @media (min-width: 1200px) {
    background-color: ${COLORS.PAGE_WHITE};
    border-radius: 10px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const CollectionPoster = styled.div`
  img {
    width: 130px;
    height: 100%;
    border-radius: 10px;
  }
`;

const CollectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 10px;
`;

const CollectionProfile = styled.div`
  span {
    color: ${COLORS.LINK_COLOR};
  }
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Homepage = styled.a`
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 10px;
  padding: 5px;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  text-decoration: none;
  img {
    width: 30px;
  }
  @media (min-width: 1200px) {
    bottom: 50px;
    right: 20%;
  }
`;

const ProviderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 5px 0px;
`;

const ProviderLogo = styled.img`
  border-radius: 10px;
  width: 40px;
`;

const SimilarContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  overflow: scroll;
  padding: 5px 0px;
`;

const SimilarContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 150px;
  img {
    width: 100%;
    height: 230px;
    border-radius: 10px;
  }
  @media (max-width: 768px) {
    width: 200px;
    img {
      width: 150px;
      height: 250px;
    }
  }
  @media (min-width: 768px) and (max-width: 1199px) {
  }
`;

const SimilarMovieTitle = styled(Link)`
  padding: 5px;
  text-decoration: none;
  color: ${COLORS.LINK_COLOR};
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const Profile = ({ content }: Content) => {
  useEffect(() => {
    document.title = `${content?.title}`;
    return () => {
      document.title = "Movie";
    };
  }, [content?.title]);

  return (
    <div>
      {content && (
        <div>
          <MovieProfileImagesWrapper>
            <MovieBackground
              background={
                content.backdrop_path
                  ? `https://www.themoviedb.org/t/p/original${content.backdrop_path}`
                  : no_background
              }
            ></MovieBackground>
            <MoviePoster>
              <img
                src={
                  content.poster_path
                    ? `https://www.themoviedb.org/t/p/original${content.poster_path}`
                    : no_poster
                }
                alt={content.title}
              />
            </MoviePoster>
          </MovieProfileImagesWrapper>
          <MovieProfileInformationWrapper>
            <MovieStatus>
              <p>{content.status}</p>
            </MovieStatus>
            <MovieProfileInformation>
              <MovieTitle>
                <p>{content.title}</p>
              </MovieTitle>
              {content.title !== content.original_title && (
                <MovieOriginalTitle>
                  <p>{content.original_title}</p>
                </MovieOriginalTitle>
              )}
              {content.tagline ? (
                <MovieTagline>
                  <p>{`"${content.tagline}"`}</p>
                </MovieTagline>
              ) : undefined}
            </MovieProfileInformation>
          </MovieProfileInformationWrapper>
        </div>
      )}
    </div>
  );
};

const LeftBar: React.FC<Content> = ({ content, provider }) => {
  return (
    <div>
      {content && (
        <MovieInformationWrapper>
          <DefaultComponent>
            <SectionTitle>Synopsis</SectionTitle>
            <Synopsis>
              <p>{content.overview ? content.overview : "No Information"}</p>
            </Synopsis>
          </DefaultComponent>
          <DefaultComponent>
            <SectionTitle>Information</SectionTitle>
            <InformationWrapper>
              <Information>
                <span>Homepage</span>
                {content.homepage &&
                /^(http:\/\/www\.|https:\/\/www\.)/.test(content.homepage) ? (
                  <a href={content.homepage} target="_blank" rel="noreferrer">
                    {content.homepage}
                  </a>
                ) : (
                  "No Information"
                )}
              </Information>
              <Information>
                <span>IMDB</span>
                {content.imdb_id ? (
                  <a
                    href={`https://www.imdb.com/title/${content.imdb_id}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {`https://www.imdb.com/title/${content.imdb_id}/`}
                  </a>
                ) : (
                  "No Information"
                )}
              </Information>
              <Information>
                <span>Release Date</span>
                <p>
                  {content.release_date
                    ? content.release_date
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Runtime</span>
                <p>
                  {content.runtime
                    ? content.runtime + " min"
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Score</span>
                <p>
                  {content.vote_average === 0 || !content.vote_average
                    ? content.vote_average.toFixed(1).replace(".", "")
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Genres</span>
                {content.genres[0]
                  ? Object.values(content.genres).map((genre, index) => (
                      <p key={index}>{genre.name}</p>
                    ))
                  : "No Information"}
              </Information>
              <Information>
                <span>Original Language</span>
                <p>{content.original_language.toUpperCase()}</p>
              </Information>
              <Information>
                <span>Budget</span>
                <p>
                  {content.budget > 0
                    ? content.budget.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Revenue</span>
                <p>
                  {content.revenue > 0
                    ? content.revenue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Production Countries</span>
                {content.production_countries[0]
                  ? Object.values(content.production_countries).map(
                      (country, index) => <p key={index}>{country.name}</p>
                    )
                  : "No Information"}
              </Information>
              <Information>
                <span>Production Companies</span>
                {content.production_companies[0]
                  ? Object.values(content.production_companies).map(
                      (company, index) => <p key={index}>{company.name}</p>
                    )
                  : "No Information"}
              </Information>
              <Information>
                <span>Where to Watch</span>
                {provider ? (
                  <div>
                    {provider.flatrate && (
                      <WatchProvider
                        title="Streaming"
                        content={provider.flatrate}
                      ></WatchProvider>
                    )}
                    {provider.buy && (
                      <WatchProvider
                        title="Buy"
                        content={provider.buy}
                      ></WatchProvider>
                    )}
                    {provider.rent && (
                      <WatchProvider
                        title="Rent"
                        content={provider.rent}
                      ></WatchProvider>
                    )}
                    {provider.ads && (
                      <WatchProvider
                        title="Watch With Ads"
                        content={provider.ads}
                      ></WatchProvider>
                    )}
                    {provider.free && (
                      <WatchProvider
                        title="Watch for Free"
                        content={provider.free}
                      ></WatchProvider>
                    )}
                  </div>
                ) : (
                  "No Information"
                )}
              </Information>
            </InformationWrapper>
          </DefaultComponent>
        </MovieInformationWrapper>
      )}
    </div>
  );
};

const WatchProvider = (props: any) => {
  return (
    <div>
      <p>{props.title}</p>
      <ProviderWrapper>
        {props.content.map((provider: ProviderProps, index: number) => (
          <div key={index}>
            <ProviderLogo
              src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
              alt={provider.provider_name}
              title={provider.provider_name}
            ></ProviderLogo>
          </div>
        ))}
      </ProviderWrapper>
    </div>
  );
};

const Collection: React.FC<Content> = ({ content, collection }) => {
  return (
    <div>
      {content && (
        <DefaultComponent>
          <SectionTitle>
            <p>Collection</p>
          </SectionTitle>
          <CollectionInformationWrapper>
            <CollectionInformation>
              <CollectionPoster>
                <img
                  src={
                    content.belongs_to_collection.poster_path
                      ? `https://www.themoviedb.org/t/p/original${content.belongs_to_collection.poster_path}`
                      : no_poster
                  }
                  alt={content.belongs_to_collection.name}
                />
              </CollectionPoster>
              <CollectionContent>
                <CollectionProfile>
                  <span>Belongs to Collection</span>
                  <p>
                    {content.belongs_to_collection.name
                      ? content.belongs_to_collection.name
                      : "No Information"}
                  </p>
                </CollectionProfile>
                <CollectionProfile>
                  <span>Overview</span>
                  <p>
                    {collection?.overview
                      ? collection.overview
                      : "No Information"}
                  </p>
                </CollectionProfile>
              </CollectionContent>
            </CollectionInformation>
          </CollectionInformationWrapper>
        </DefaultComponent>
      )}
    </div>
  );
};

const SimilarComponent: React.FC<Content> = ({ similar }) => {
  return (
    <div>
      {similar && (
        <DefaultComponent>
          <SectionTitle>Similar</SectionTitle>
          <SimilarContent>
            {Object.values(similar).map((movie, index) => (
              <SimilarContentWrapper key={index}>
                <img
                  src={
                    movie.poster_path
                      ? `https://www.themoviedb.org/t/p/original${movie.poster_path}`
                      : no_poster
                  }
                  alt={movie.title}
                />
                <SimilarMovieTitle to={`/movie/${movie.id}`}>
                  {movie.title}
                </SimilarMovieTitle>
              </SimilarContentWrapper>
            ))}
          </SimilarContent>
        </DefaultComponent>
      )}
    </div>
  );
};

const CastComponent: React.FC<Content> = ({ cast }) => {
  const [showAllCast, setShowAllCast] = useState<boolean>(false);
  return (
    <div>
      {cast && cast.cast[0] && (
        <DefaultComponent>
          <SectionTitle>
            <p>Cast</p>
          </SectionTitle>
          <CastContent>
            <MovieCastWrapper>
              {Object.values(cast.cast).map((cast, index) =>
                showAllCast || index <= 11 ? (
                  <MovieCast key={index}>
                    <img
                      src={
                        cast.profile_path
                          ? `https://www.themoviedb.org/t/p/original${cast.profile_path}`
                          : no_cast_image
                      }
                      alt={cast.name}
                    />
                    <CastWrapper>
                      <CastInformation>
                        <span>Name</span>
                        <p>{cast.name ? cast.name : "No Information"}</p>
                      </CastInformation>
                      <CastInformation>
                        <span>Role</span>
                        <p>
                          {cast.known_for_department
                            ? cast.known_for_department
                            : "No Information"}
                        </p>
                      </CastInformation>
                      <CastInformation>
                        <span>Character</span>
                        <p>
                          {cast.character.replace(/\(.*?\)/g, "")
                            ? cast.character.replace(/\(.*?\)/g, "")
                            : "No Information"}
                        </p>
                      </CastInformation>
                    </CastWrapper>
                  </MovieCast>
                ) : undefined
              )}
            </MovieCastWrapper>
          </CastContent>
          {cast.cast[12] && (
            <ShowMore
              onClick={() => {
                setShowAllCast(!showAllCast);
              }}
            >
              {showAllCast ? "Show Less" : "Show More"}
            </ShowMore>
          )}
        </DefaultComponent>
      )}
    </div>
  );
};

const MovieProfile = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movieInformation, setMovieInformation] = useState<Work>();
  const [movieCollection, setMovieCollection] = useState<CollectionProps>();
  const [watchProvider, setWatchProvider] = useState<Provider>();
  const [similarMovies, setSimilarMovies] = useState<Similar>();
  const [workCast, setCast] = useState<Cast>();
  const { id } = useParams() as Params;
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
    const MOVIE_ID = Number(id);
    if (isNaN(MOVIE_ID)) {
      navigate("/error");
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}`, API_GET_OPTIONS)
        .then((response) => response.json())
        .then((response) => {
          setMovieInformation(response);
          if (response.belongs_to_collection) {
            fetch(
              `https://api.themoviedb.org/3/search/collection?query=${response.belongs_to_collection.name}&include_adult=false&language=en-US&page=1`,
              API_GET_OPTIONS
            )
              .then((response) => response.json())
              .then((response) => setMovieCollection(response.results[0]));
          }
        })
        .catch((err) => setError(`ERROR WHILE FETCHING COLLECTION: ${err}`));
      fetch(
        `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits`,
        API_GET_OPTIONS
      )
        .then((response) => response.json())
        .then((response) => setCast(response))
        .catch((err) => {
          setError(`ERROR WHILE FETCHING CAST: ${err}`);
        });
      fetch(
        `https://api.themoviedb.org/3/movie/${MOVIE_ID}/watch/providers`,
        API_GET_OPTIONS
      )
        .then((response) => response.json())
        .then((response) => setWatchProvider(response.results.US))
        .catch((err) => {
          setError(`ERROR WHILE FETCHING WATCH PROVIDERS: ${err}`);
        });
      fetch(
        `https://api.themoviedb.org/3/movie/${MOVIE_ID}/similar?language=en-US&page=1`,
        API_GET_OPTIONS
      )
        .then((response) => response.json())
        .then((response) => setSimilarMovies(response.results.slice(0, 6)))
        .catch((err) => {
          setError(`ERROR WHILE FETCHING SIMILAR MOVIES: ${err}`);
        });
    }
    setLoading(false);
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Styled.Loading>Loading...</Styled.Loading>
      ) : error ? (
        <Styled.Error>ERROR: {error}</Styled.Error>
      ) : (
        movieInformation && (
          <div>
            <ProfileWrapper>
              <Profile content={movieInformation}></Profile>
              <ContentWrapper>
                <LeftBarWrapper>
                  <LeftBar
                    content={movieInformation}
                    provider={watchProvider}
                  ></LeftBar>
                </LeftBarWrapper>
                <RightBarWrapper>
                  <SimilarComponent similar={similarMovies}></SimilarComponent>
                  {movieInformation.belongs_to_collection && (
                    <Collection
                      content={movieInformation}
                      collection={movieCollection}
                    ></Collection>
                  )}
                  <CastComponent cast={workCast}></CastComponent>
                </RightBarWrapper>
              </ContentWrapper>
              <Homepage href="/">
                <img src={home} alt="home" />
              </Homepage>
            </ProfileWrapper>
            <FooterComponent></FooterComponent>
          </div>
        )
      )}
    </div>
  );
};

export default MovieProfile;
