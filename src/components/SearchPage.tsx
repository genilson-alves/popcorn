import React, { useEffect, useState } from "react";
import { HomeNavigationBar } from "./NavigationBar";
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

const SearchWrapper = styled.div``;

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
`;

const PageTitle = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 20px 0px 10px;
`;

const SearchBar = styled.input`
  outline: none;
  border-radius: 10px;
  padding: 0px 5px;
  border: none;
  background: ${COLORS.PAGE_WHITE};
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
  gap: 20px;
`;

const SearchContent = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchPoster = styled.div`
  img {
    width: 100%;
    height: 250px;
    border-radius: 10px;
  }
`;

const SearchRating = styled.div``;

const SearchTitle = styled.div`
  padding: 5px;
  text-align: center;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
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

  console.log(POPULAR_DATA);
  console.log(SEARCH_DATA);

  return (
    <div>
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
                      alt="any"
                    ></img>
                  </SearchPoster>
                  <SearchTitle>
                    <Styled.RouterLink to={`/${work.media_type}/${work.id}`}>
                      {work.title ? work.title : work.name}
                    </Styled.RouterLink>
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
