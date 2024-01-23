import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import styled from "styled-components";
import * as Styled from "../Styled";
import { COLORS } from "../Styled";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FooterComponent } from "./FooterComponent";
const no_image = require("../assets/no_image.png");
const no_poster = require("../assets/no_poster.jpg");

type Movies = {
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
  name: string;
  media_type: string;
};

const SearchWrapper = styled.div`
  max-width: 1400px;
  margin: auto;
`;

const SearchSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const SearchSection = styled.div`
  background-color: ${COLORS.PAGE_WHITE};
  border-radius: 10px;
  padding: 5px;
  @media (min-width: 1200px) {
    margin: 20px;
  }
`;

const PageTitle = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 20px 0px 10px;
  @media (min-width: 1200px) {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 20px 0px 10px;
  }
`;

const SearchBar = styled.input`
  outline: none;
  border-radius: 10px;
  padding: 0px 5px;
  border: none;
  background: ${COLORS.PAGE_WHITE};
  @media (min-width: 1200px) {
    width: 500px;
  }
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const SearchButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 160px);
    gap: 0px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 160px);
    gap: 0px;
  }
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
  }
`;

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  @media (min-width: 768px) and (max-width: 1200px) {
    height: 300px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
  }
`;

const SearchPoster = styled.div`
  padding: 5px;
  img {
    width: 100%;
    height: 250px;
    border-radius: 10px;
  }
  @media (max-width: 768px) {
    padding: 3px;
    img {
      width: 100%;
      height: 240px;
      border-radius: 10px;
    }
  }
  @media (min-width: 1200px) {
    img {
      width: 100%;
      height: 330px;
      border-radius: 10px;
    }
  }
`;

const SearchTitle = styled.div`
  padding: 0px 5px;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @media (min-width: 1200px) {
    padding: 0px 10px;
  }
`;

const SearchPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [SEARCH_DATA, setSearchData] = useState<Movies[]>();
  const [POPULAR_DATA, setPopularData] = useState<Movies[]>();

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
    fetch(`https://api.themoviedb.org/3/movie/popular`, API_GET_OPTIONS)
      .then((response) => response.json())
      .then((response) => setPopularData(response.results))
      .catch((err) => setError(`ERROR FETCHING : ${err}`));
    setLoading(false);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    if (searchValue.trim() !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchValue}`,
        API_GET_OPTIONS
      )
        .then((response) => response.json())
        .then((response) => setSearchData(response.results))
        .catch((err) => setError(`ERROR FETCHING: ${err}`));
    } else {
      alert("Please enter a valid value!");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div>
      <Navigation></Navigation>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <SearchWrapper>
        <SearchSectionWrapper>
          <PageTitle>Search</PageTitle>
          <SearchSection>
            <SearchBar
              type="text"
              placeholder="Ex... Game of Thrones"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            ></SearchBar>
            <SearchButton onClick={fetchData}>Search</SearchButton>
          </SearchSection>
        </SearchSectionWrapper>
        <div>
          {SEARCH_DATA ? (
            <Search>
              {SEARCH_DATA.map((work) => (
                <SearchContent key={work.id}>
                  <SearchPoster>
                    <img
                      src={
                        work.poster_path
                          ? `https://www.themoviedb.org/t/p/original${work.poster_path}`
                          : no_poster
                      }
                      alt={work.name ? work.name : work.title}
                    ></img>
                  </SearchPoster>
                  <SearchTitle>
                    <TitleLink to={`/${work.media_type}/${work.id}`}>
                      {work.title ? work.title : work.name}
                    </TitleLink>
                  </SearchTitle>
                </SearchContent>
              ))}
            </Search>
          ) : (
            <Search>
              {POPULAR_DATA?.map((work) => (
                <SearchContent key={work.id}>
                  <SearchPoster>
                    <img
                      src={
                        work.poster_path
                          ? `https://www.themoviedb.org/t/p/original${work.poster_path}`
                          : no_image
                      }
                      alt="any"
                    ></img>
                  </SearchPoster>
                  <SearchTitle>
                    <TitleLink to={`/movie/${work.id}`}>
                      {work.title ? work.title : work.name}
                    </TitleLink>
                  </SearchTitle>
                </SearchContent>
              ))}
            </Search>
          )}
        </div>
      </SearchWrapper>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default SearchPage;
