import styled from "styled-components";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Overpass', sans-serif;
  }

  body {
    background-color: #edede9;    
  }
`;

export const Logo = styled.div`
  padding: 25px;
  img {
    max-width: 90px;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: auto;
`;

export const NavigationWrapper = styled.div`
  text-align: center;
  background-color: #0077b6;
  height: 7vh;
`;

export const NavigationLinks = styled.div`
  display: inherit;
  justify-content: space-around;
  align-items: center;
  flex: 1;
`;

export const NavigationLink = styled.a`
  font-size: 1rem;
  color: #ced4da;
  padding: 25px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const NavigationOptions = styled.div`
  display: inherit;
`;

export const NavigationUser = styled.div`
  display: inherit;
`;

export const Loading = styled.div`
  text-align: center;
  margin: 50px;
  color: blue;
  font-size: 1.5rem;
`;

export const Error = styled.div`
  text-align: center;
  margin: 50px;
  color: red;
  font-size: 1.5rem;
`;

export const Main = styled.main`
  max-width: 1800px;
  margin: auto;
`;

export const FeaturedMovies = styled.div`
  display: flex;
  min-height: 700px;
`;

export const FeaturedContent = styled.div`
  display: flex;
  padding: 50px;
  width: 100%;
`;

export const NextPrevious = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  position: relative;
  img {
    width: 50px;
  }
`;

export const FeaturedPoster = styled.div`
  img {
    width: 30vh;
    border-radius: 10px;
  }
`;

export const FeaturedOverview = styled.div`
  margin: 0px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const FeaturedInformation = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FeaturedTitle = styled.div`
  font-size: 2rem;
  margin-top: 10px;
  font-weight: bold;
  color: #0077b6;
`;

export const FeaturedSynopsis = styled.div`
  width: 100%;
`;

export const FeaturedReleaseDate = styled.div``;

export const Score = styled.div`
  font-weight: bold;
  background-color: #06d6a0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  width: 70px;
  height: 70px;
  gap: 20px;
  border-radius: 10px;
`;

export const Title = styled.div`
  margin-top: 5px;
`;

export const Poster = styled.div`
  width: 200px;
  height: 300px;
  img {
    border-radius: 7px;
    width: 100%;
    height: 100%;
  }
`;

export const SectionTitle = styled.div`
  margin: 10px 40px 0px 35px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  h1 {
    font-size: 1.3rem;
    font-weight: bold;
    color: #6c757d;
  }
`;

export const ViewMore = styled.a`
  text-decoration: none;
  font-weight: 0.8rem;
  color: #0077b6;
  & :hover {
    text-decoration: underline;
  }
`;

export const Popular = styled.div``;

export const UpcomingContainer = styled.div`
  display: flex;
  margin: 0px 30px;
  flex-direction: row;
  gap: 20px;
  overflow: scroll;
`;

export const Upcoming = styled.div`
  padding: 15px 0px;
`;

export const Airing = styled.div``;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  background-color: #0077b6;
  margin-top: 50px;
  color: #ced4da;
  height: 200px;
  div {
    margin-top: 40px;
    text-align: center;
  }
  h3 {
    padding: 10px;
  }
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: center;
    align-items: center;
    gap: 10px;
    li {
    }
    a {
      text-decoration: none;
      color: #ced4da;
    }
    & :hover {
      text-decoration: underline;
    }
  }
`;

export const TopRated = styled.div``;

export const TopRatedSeries = styled.div``;

export const TopRatedMovies = styled.div``;

export const TopRatedPoster = styled.div``;

export const TopRatedRank = styled.div``;

export const TopRatedScore = styled.div``;

export const TopRatedCountry = styled.div``;
