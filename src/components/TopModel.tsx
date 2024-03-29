import * as Styled from "../Styled";
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { FooterComponent } from "./FooterComponent";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../Styled";

const no_poster = require("../assets/no_poster.jpg");

type Movies = {
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
  name: string;
};

const PageTitle = styled.div`
  text-align: center;
  color: ${COLORS.SECTION_COLOR};
  margin: 50px;
  font-size: 2.5rem;
  font-weight: bold;
`;

const TopModelLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.LINK_COLOR};
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const TopModelWrapper = styled.div`
  max-width: 1400px;
  margin: auto;
`;

const TopModelContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin: 5px 0px 50px;
  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    align-items: center;
    justify-content: center;
  }
`;

const TopModelContent = styled.div`
  @media (max-width: 768px) {
    width: 150px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 200px;
    text-align: center;
  }
  @media (min-width: 1200px) {
    width: 200px;
    height: 350px;
    border-radius: 10px;
  }
`;

const TopModelPoster = styled.div`
  display: inline-block;
  position: relative;
  img {
    border-radius: 10px;
    width: 100%;
    height: 250px;
  }
  @media (min-width: 1200px) {
    img {
      width: 100%;
      height: 300px;
    }
  }
`;

const TopModelRating = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 10px;
  border-radius: 7px;
  background-color: ${COLORS.RATING_BACKGROUND_COLOR};
  font-weight: bold;
  font-size: 1.1rem;
`;

const TopModelTitle = styled.div`
  text-align: center;
  padding: 2px 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 20px;
`;

const PreviousButton = styled.button`
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: ${COLORS.PAGE_WHITE};
  margin: 0px 5px;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: ${COLORS.LINK_COLOR};
    color: ${COLORS.PAGE_WHITE};
    transition: 0.5s;
  }
`;

const PaginationButtons = styled.button`
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: ${COLORS.PAGE_WHITE};
  margin: 0px 5px;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: ${COLORS.LINK_COLOR};
    color: ${COLORS.PAGE_WHITE};
    transition: 0.5s;
  }
`;

const CurrentPage = styled.button`
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: ${COLORS.LINK_COLOR};
  color: ${COLORS.PAGE_WHITE};
  margin: 0px 5px;
  border-radius: 5px;
  padding: 10px;
`;

const TopModel = (props: any) => {
  const [workData, setWorkData] = useState<Movies[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const workType = props.type;
  const pageType = props.page_type;
  const pageTitle = props.title;

  const API_GET_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
    },
  };

  useEffect(() => {
    document.title = `${props.title}`;
    return () => {
      document.title = `${props.title}`;
    };
  }, [props.title]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `https://api.themoviedb.org/3/${workType}/${pageType}?&page=${currentPage}`,
      API_GET_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => setWorkData(response.results))
      .catch((err) => setError(`ERROR FETCHING : ${err}`));
    setLoading(false);
  }, [currentPage, workType, pageType]);

  console.log(workData);

  return (
    <div>
      <Navigation></Navigation>
      {isLoading ? (
        <Styled.Loading>Loading...</Styled.Loading>
      ) : error ? (
        <Styled.Error>ERROR: {error}</Styled.Error>
      ) : (
        <TopModelWrapper>
          <PageTitle>{pageTitle}</PageTitle>
          {workData.length > 0 && (
            <TopModelContentWrapper>
              {workData.map((work) => (
                <TopModelContent key={work.id}>
                  <TopModelPoster>
                    <TopModelRating>
                      {work.vote_average === 0 || !work.vote_average
                        ? "NA"
                        : work.vote_average.toFixed(1).replace(".", "")}
                    </TopModelRating>
                    <img
                      src={
                        work.poster_path
                          ? `https://www.themoviedb.org/t/p/original${work.poster_path}`
                          : no_poster
                      }
                      alt={work.title ? work.title : work.name}
                    ></img>
                  </TopModelPoster>
                  <TopModelTitle>
                    <TopModelLink to={`/${workType}/${work.id}`}>
                      {work.title ? work.title : work.name}
                    </TopModelLink>
                  </TopModelTitle>
                </TopModelContent>
              ))}
            </TopModelContentWrapper>
          )}
          <Pagination>
            {currentPage > 1 && (
              <PreviousButton
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                Previous
              </PreviousButton>
            )}
            {currentPage > 1 && (
              <PaginationButtons
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                {currentPage - 1}
              </PaginationButtons>
            )}
            <CurrentPage>{currentPage}</CurrentPage>
            <PaginationButtons
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              {currentPage + 1}
            </PaginationButtons>
            <PaginationButtons
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </PaginationButtons>
          </Pagination>
        </TopModelWrapper>
      )}
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default TopModel;
