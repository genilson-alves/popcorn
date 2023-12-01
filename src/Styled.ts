import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Overpass', sans-serif;
  }

  body {
    background-color: #dee2e6;    
  }
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
  text-align: center;
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
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export const Popular = styled.div``;

export const UpcomingContainer = styled.div`
  display: flex;
  margin: 0px 30px;
  flex-direction: row;
  gap: 20px;
  overflow: hidden;
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
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TopRatedWrapper = styled.div`
  width: 100%;
`;

export const TopRatedInformation = styled.div`
  text-align: center;
  h2 {
    flex: 1;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 40px 0px 35px;
    button {
      margin: 0px 20px;
      background-color: #0077b6;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  span {
    font-size: 2rem;
    font-weight: bold;
    color: #6c757d;
  }
`;

export const TopRated = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 40px;
`;

export const TopRatedOverviewWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 5px;
  padding: 0px 20px;
  align-items: center;
  background-color: #f8f9fa;
  height: 100px;
`;

export const TopRatedRank = styled.div`
  width: 50px;
`;

export const TopRatedPoster = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 30px;
  img {
    height: 90px;
    border-radius: 3px;
  }
`;

export const TopRatedTitle = styled.div`
  flex: 3;
  overflow: hidden;
`;

export const TopRatedCountry = styled.div`
  flex: 1;
`;

export const TopRatedScore = styled.div`
  flex: 1;
`;

/////////////////////// PAGE CSS ////////////////////////

const CastTitle = css`
  p {
    font-style: italic;
    font-size: 0.8rem;
  }
`;

export const WorkWrapper = styled.div`
  margin-bottom: 20px;
`;

export const WorkContent = styled.div`
  background-color: #f8f9fa;
  padding-bottom: 20px;
`;

export const WorkBackground = styled.div`
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    filter: blur(3px);
    transform: scale(1.1);
  }
`;

export const WorkOverviewContent = styled.div`
  display: flex;
  max-width: 1500px;
  margin: auto;
`;

export const WorkPoster = styled.div`
  img {
    height: 400px;
    border-radius: 7px;
    margin-top: -170px;
    position: relative;
  }
`;

export const WorkStatus = styled.div`
  text-align: center;
  background-color: #000;
  padding: 10px;
  color: white;
  border-radius: 7px;
`;

export const WorkTitle = styled.div`
  font-size: 2rem;
`;

export const WorkOriginalTitle = styled.div``;

export const WorkOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

export const WorkSynopsis = styled.div``;

export const WorkGenres = styled.div`
  display: flex;
  gap: 10px;
`;

export const WorkGenreTitle = styled.div`
  background-color: #dee2e6;
  padding: 8px;
  border-radius: 5px;
  font-size: 0.9rem;
`;

export const WorkInformationWrapper = styled.div``;

export const AllWorkInformationWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
  display: flex;
`;

export const AllWorkContentWrapper = styled.div`
  flex: 5;
`;

export const WorkInformationLeftContentWrapper = styled.div`
  margin-top: 20px;
  background-color: black;
`;

export const WorkInformationLeftContentInformation = styled.div``;

export const WorkInformationRightContentWrapper = styled.div``;

export const WorkInformationRightContentInformationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 50px;
`;

export const WorkInformationRightContentInformation = styled.div``;

export const WorkInformationCast = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  width: 350px;
  height: 170px;
  text-align: center;
`;

export const CastInformation = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
`;

export const CastName = styled.div`
  ${CastTitle}
`;

export const CastCastCharacter = styled.div`
  font-weight: bold;
`;

export const CastProfile = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 100px;
  img {
    border-radius: 5px;
    height: 100%;
  }
`;

export const CastCharacter = styled.div`
  ${CastTitle}
`;

export const CastRole = styled.div`
  ${CastTitle}
`;

export const PartTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 15px;
  font-style: italic;
  color: #415a77;
`;

export const RightBarContentWrapper = styled.div`
  flex: 1;
  margin-top: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RightBarContent = styled.div`
  font-size: 0.9rem;
  color: #415a77;
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 3px;
  }
  span {
    margin-bottom: 3px;
    color: black;
  }
  a {
    text-decoration: none;
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const WorkInformationRightContentProductionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 30px;
  gap: 30px;
  img {
    width: 100px;
  }
`;

export const ProductionCompanies = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  align-items: center;
  font-weight: bold;
  gap: 15px;
`;

export const ShowAllCast = styled.div`
  width: 100%;
  text-align: center;
  button {
    cursor: pointer;
    background-color: #415a77;
    color: white;
    font-size: 1rem;
    border: none;
    padding: 10px;
    border-radius: 10px;
  }
`;

export const RouterLink = styled(Link)`
  text-decoration: none;
  color: #0077b6;
  &:hover {
    text-decoration: underline;
  }
`;

export const TypeModelWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
`;

export const TypeModel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 50px;
  padding: 30px 0px;
`;

export const TypeModelContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

export const TypeModelPoster = styled.div`
  z-index: -1;
  img {
    border-radius: 10px;
    width: 100%;
  }
`;

export const TypeModelRating = styled.div`
  position: absolute;
  margin: 5px 195px;
  font-weight: bold;
  background-color: #06d6a0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 8px;
`;

export const TypeModelTitle = styled.div`
  text-align: center;
  padding: 3px 10px;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 20px;
`;

export const PreviousButton = styled.button`
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  margin: 0px 5px;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: #0077b6;
    color: white;
    transition: 0.5s;
  }
`;

export const PaginationButtons = styled.button`
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  margin: 0px 5px;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: #0077b6;
    color: white;
    transition: 0.5s;
  }
`;

export const CurrentPage = styled.button`
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: #0077b6;
  color: white;
  margin: 0px 5px;
  border-radius: 5px;
  padding: 10px;
`;

export const PageTitle = styled.div`
  text-align: center;
  color: #0077b6;
  padding: 30px 0px 0px;
  font-size: 2rem;
  font-weight: bold;
`;
