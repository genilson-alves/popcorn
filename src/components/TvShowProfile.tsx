import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Styled from "../Styled";
import { COLORS } from "../Styled";
import { FooterComponent } from "./FooterComponent";

const no_cast_image = require("../assets/no_cast_image.jpg");
const no_background = require("../assets/no_background.jpg");
const no_poster = require("../assets/no_poster.jpg");
const home = require("../assets/home.png");

type Work = {
  id: number;
  vote_average: number;
  name: string;
  original_name: string;
  overview: string;
  tagline: string;
  release_date: string;
  status: string;
  homepage: string;
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  poster_path: string;
  backdrop_path: string;
  in_production: boolean;
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
  networks: {
    [key: number]: {
      logo_path: string;
      name: string;
      origin_country: string;
    };
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

const TvShowProfileImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TvShowBackground = styled.div<{ background: string }>`
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 250px;
`;

const TvShowPoster = styled.div`
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

const TvShowProfileInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: auto;
`;

const TvShowStatus = styled.div`
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

const TvShowProfileInformation = styled.div`
  margin: 5px 0px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const TvShowName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TvShowOriginalName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  font-style: italic;
`;

const TvShowTagline = styled.div`
  font-style: italic;
`;

const TvShowInformationWrapper = styled.div``;

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

const TvShowCastWrapper = styled.div`
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

const TvShowCast = styled.div`
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

const SimilarContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 5px;
  overflow: scroll;
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

const SimilarTvShowName = styled(Link)`
  padding: 5px;
  text-decoration: none;
  color: ${COLORS.LINK_COLOR};
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const SeasonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: flex;
    flex-direction: column;
  }
`;

const SeasonInformation = styled.div`
  padding: 5px;
  display: flex;
  gap: 10px;
  border-radius: 10px;
  background-color: ${COLORS.PAGE_WHITE};
`;

const SeasonPosterWrapper = styled.div`
  img {
    width: 100%;
    height: 180px;
    border-radius: 10px;
  }
`;

const SeasonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  span {
    color: ${COLORS.LINK_COLOR};
    font-style: italic;
  }
  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
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

const Profile = ({ content }: Content) => {
  return (
    <div>
      {content && (
        <div>
          <TvShowProfileImagesWrapper>
            <TvShowBackground
              background={
                content.backdrop_path
                  ? `https://www.themoviedb.org/t/p/original${content.backdrop_path}`
                  : no_background
              }
            ></TvShowBackground>
            <TvShowPoster>
              <img
                src={
                  content.poster_path
                    ? `https://www.themoviedb.org/t/p/original${content.poster_path}`
                    : no_poster
                }
                alt={content.name}
              />
            </TvShowPoster>
          </TvShowProfileImagesWrapper>
          <TvShowProfileInformationWrapper>
            <TvShowStatus>
              <p>{content.status}</p>
            </TvShowStatus>
            <TvShowProfileInformation>
              <TvShowName>
                <p>{content.name}</p>
              </TvShowName>
              {content.name !== content.original_name && (
                <TvShowOriginalName>
                  <p>{content.original_name}</p>
                </TvShowOriginalName>
              )}
              {content.tagline ? (
                <TvShowTagline>
                  <p>{`"${content.tagline}"`}</p>
                </TvShowTagline>
              ) : undefined}
            </TvShowProfileInformation>
          </TvShowProfileInformationWrapper>
        </div>
      )}
    </div>
  );
};

const LeftBar: React.FC<Content> = ({ content, provider }) => {
  return (
    <div>
      {content && (
        <TvShowInformationWrapper>
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
                <span>Name</span>
                <p>{content.name ? content.name : "No Information"}</p>
              </Information>
              <Information>
                <span>Original Name</span>
                <p>
                  {content.original_name
                    ? content.original_name
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Homepage</span>
                {content.homepage &&
                content.homepage.startsWith("https://www.") ? (
                  <a href={content.homepage} target="_blank" rel="noreferrer">
                    {content.homepage}
                  </a>
                ) : (
                  "No Information"
                )}
              </Information>
              <Information>
                <span>First Air Date</span>
                <p>
                  {content.first_air_date
                    ? content.first_air_date
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Last Air Date</span>
                <p>
                  {content.last_air_date
                    ? content.last_air_date
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Number of Episodes</span>
                <p>
                  {content.number_of_episodes
                    ? content.number_of_episodes
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Number of Seasons</span>
                <p>
                  {content.number_of_seasons
                    ? content.number_of_seasons
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Score</span>
                <p>
                  {content.vote_average > 0
                    ? content.vote_average.toFixed(1).replace(".", "")
                    : "No Information"}
                </p>
              </Information>
              <Information>
                <span>Genres</span>
                {content.networks[0]
                  ? Object.values(content.genres).map((genre, index) => (
                      <p key={index}>{genre.name}</p>
                    ))
                  : "No Information"}
              </Information>
              <Information>
                <span>In Production?</span>
                <p>{content.in_production ? "Yes" : "No"}</p>
              </Information>
              <Information>
                <span>Status</span>
                <p>{content.status ? content.status : "No Information"}</p>
              </Information>
              <Information>
                <span>Networks</span>
                {content.networks[0]
                  ? Object.values(content.networks).map((network, index) => (
                      <p key={index}>{network.name}</p>
                    ))
                  : "No Information"}
              </Information>
              <Information>
                <span>Production Countries</span>
                {content.production_countries[0]
                  ? Object.values(content.production_countries).map(
                      (country, index) => (
                        <p key={index}>
                          {country.name ? country.name : "No Information"}
                        </p>
                      )
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
        </TvShowInformationWrapper>
      )}
    </div>
  );
};

const WatchProvider = (props: any) => {
  return (
    <div>
      <p>{props.title}</p>
      <ProviderWrapper>
        {props.content.map((provider: ProviderProps) => (
          <div key={provider.provider_id}>
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

const SimilarComponent: React.FC<Content> = ({ similar }) => {
  return (
    <div>
      {similar && (
        <DefaultComponent>
          <SectionTitle>Similar</SectionTitle>
          <SimilarContent>
            {Object.values(similar).map((tv) => (
              <SimilarContentWrapper key={tv.id}>
                <img
                  src={
                    tv.poster_path
                      ? `https://www.themoviedb.org/t/p/original${tv.poster_path}`
                      : no_poster
                  }
                  alt={tv.name}
                />
                <SimilarTvShowName to={`/tv/${tv.id}`}>
                  {tv.name}
                </SimilarTvShowName>
              </SimilarContentWrapper>
            ))}
          </SimilarContent>
        </DefaultComponent>
      )}
    </div>
  );
};

const Seasons: React.FC<Content> = ({ content }) => {
  return (
    <div>
      {content && (
        <DefaultComponent>
          <SectionTitle>Seasons</SectionTitle>
          <SeasonsWrapper>
            {Object.values(content.seasons).map((season) => (
              <SeasonInformation>
                <SeasonPosterWrapper>
                  <img
                    src={
                      season.poster_path
                        ? `https://www.themoviedb.org/t/p/original${season.poster_path}`
                        : no_poster
                    }
                    alt={season.name}
                  ></img>
                </SeasonPosterWrapper>
                <SeasonContent>
                  <div>
                    <span>Name</span>
                    <p>{season.name ? season.name : "No Information"}</p>
                  </div>
                  <div>
                    <span>Number of Episodes</span>
                    <p>
                      {season.episode_count
                        ? season.episode_count
                        : "No Information"}
                    </p>
                  </div>
                  <div>
                    <span>Score</span>
                    <p>
                      {season.vote_average > 0
                        ? season.vote_average
                        : "No Information"}
                    </p>
                  </div>
                  <div>
                    <span>Release Date</span>
                    <p>
                      {season.air_date ? season.air_date : "No Information"}
                    </p>
                  </div>
                </SeasonContent>
              </SeasonInformation>
            ))}
          </SeasonsWrapper>
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
            <TvShowCastWrapper>
              {Object.values(cast.cast).map((cast, index) =>
                showAllCast || index <= 11 ? (
                  <TvShowCast key={cast.id}>
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
                  </TvShowCast>
                ) : undefined
              )}
            </TvShowCastWrapper>
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

const TvShowProfile = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tvShowInformation, setTvShowInformation] = useState<Work>();
  const [watchProvider, setWatchProvider] = useState<Provider>();
  const [similarTvShows, setSimilarTvshows] = useState<Similar>();
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
    const TV_ID = Number(id);
    if (isNaN(TV_ID)) {
      navigate("/error");
    } else {
      fetch(`https://api.themoviedb.org/3/tv/${TV_ID}`, API_GET_OPTIONS)
        .then((response) => response.json())
        .then((response) => setTvShowInformation(response))
        .catch((err) => {
          setError(`ERROR WHILE FETCHING: ${err}`);
        });
      fetch(`https://api.themoviedb.org/3/tv/${TV_ID}/credits`, API_GET_OPTIONS)
        .then((response) => response.json())
        .then((response) => setCast(response))
        .catch((err) => {
          setError(`ERROR WHILE FETCHING CAST: ${err}`);
        });
      fetch(
        `https://api.themoviedb.org/3/tv/${TV_ID}/watch/providers`,
        API_GET_OPTIONS
      )
        .then((response) => response.json())
        .then((response) => setWatchProvider(response.results.US))
        .catch((err) => {
          setError(`ERROR WHILE FETCHING WATCH PROVIDERS: ${err}`);
        });
      fetch(
        `https://api.themoviedb.org/3/tv/${TV_ID}/similar?language=en-US&page=1`,
        API_GET_OPTIONS
      )
        .then((response) => response.json())
        .then((response) => setSimilarTvshows(response.results.slice(0, 6)))
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
        tvShowInformation && (
          <div>
            <ProfileWrapper>
              <Helmet>
                <title>{tvShowInformation.name}</title>
              </Helmet>
              <Profile content={tvShowInformation}></Profile>
              <ContentWrapper>
                <LeftBarWrapper>
                  <LeftBar
                    content={tvShowInformation}
                    provider={watchProvider}
                  ></LeftBar>
                </LeftBarWrapper>
                <RightBarWrapper>
                  <SimilarComponent similar={similarTvShows}></SimilarComponent>
                  <Seasons content={tvShowInformation}></Seasons>
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

export default TvShowProfile;
