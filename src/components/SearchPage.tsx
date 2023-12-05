import React, { useEffect, useState } from "react";
import { HomeNavigationBar } from "./NavigationBar";
import styled from "styled-components";
import * as Styled from "../Styled";
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

const SearchSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const SearchSection = styled.div`
  display: flex;
  background-color: white;
  border-radius: 10px;
  justify-content: space-between;
  padding: 8px;
`;

const PageTitle = styled.p`
  padding: 0px 0px 20px;
  font-size: 2.5rem;
  font-weight: bold;
`;

const SearchBar = styled.input`
  outline: none;
  padding: 0px 20px;
  border-radius: 10px;
  border: none;
  width: 500px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  background-color: black;
  color: white;
  cursor: pointer;
  padding: 15px;
  border: none;
  border-radius: 10px;
`;

const SearchWrapper = styled.div`
  max-width: 1500px;
  margin: auto;
`;

const Search = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 50px;
  padding: 30px 0px;
`;

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

const SearchPoster = styled.div`
  z-index: -1;
  img {
    border-radius: 10px;
    width: 100%;
    min-width: 250px;
    min-height: 400px;
  }
`;

const SearchRating = styled.div`
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

const SearchTitle = styled.div`
  text-align: center;
  padding: 3px 10px;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
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
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchValue}`,
      API_GET_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => setSearchData(response.results))
      .catch((err) => setError(`ERROR FETCHING: ${err}`));
  };

  console.log(POPULAR_DATA);
  console.log(SEARCH_DATA);

  return (
    <div>
      <HomeNavigationBar></HomeNavigationBar>
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
                    {work.vote_average > 0 && (
                      <SearchRating>
                        {work.vote_average === 0
                          ? "NA"
                          : work.vote_average.toFixed(1).replace(".", "")}
                      </SearchRating>
                    )}
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
                    {work.vote_average > 0 && (
                      <SearchRating>
                        {work.vote_average === 0
                          ? "NA"
                          : work.vote_average.toFixed(1).replace(".", "")}
                      </SearchRating>
                    )}
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
                    <Styled.RouterLink to={`/movie/${work.id}`}>
                      {work.title ? work.title : work.name}
                    </Styled.RouterLink>
                  </SearchTitle>
                </SearchContent>
              ))}
            </Search>
          )}
        </div>
      </SearchWrapper>
    </div>
  );
};

export default SearchPage;
