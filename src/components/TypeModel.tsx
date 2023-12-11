import * as Styled from "../Styled";
import React, { useState, useEffect } from "react";
import { HomeNavigationBar } from "./NavigationBar";
import { Helmet } from "react-helmet";
import { FooterComponent } from "./FooterComponent";

type Movies = {
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
  name: string;
};

const TypeModel = (props: any) => {
  const [POPULAR_MOVIES_DATA, setMoviesPopular] = useState<Movies[]>([]);
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
    setLoading(true);
    setError(null);
    fetch(
      `https://api.themoviedb.org/3/${workType}/${pageType}?&page=${currentPage}`,
      API_GET_OPTIONS
    )
      .then((response) => response.json())
      .then((response) => setMoviesPopular(response.results))
      .catch((err) => setError(`ERROR FETCHING : ${err}`));
    setLoading(false);
    console.log(POPULAR_MOVIES_DATA);
  }, [currentPage, workType, pageType]);

  return (
    <div>
      <HomeNavigationBar></HomeNavigationBar>
      <Styled.TypeModelWrapper>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Styled.PageTitle>{pageTitle}</Styled.PageTitle>
        {POPULAR_MOVIES_DATA.length > 0 && (
          <Styled.TypeModel>
            {POPULAR_MOVIES_DATA.map((work) => (
              <Styled.TypeModelContent key={work.id}>
                <Styled.TypeModelPoster>
                  <Styled.TypeModelRating>
                    {work.vote_average === 0
                      ? "NA"
                      : work.vote_average.toFixed(1).replace(".", "")}
                  </Styled.TypeModelRating>
                  <img
                    src={`https://www.themoviedb.org/t/p/original${work.poster_path}`}
                    alt="any"
                  ></img>
                </Styled.TypeModelPoster>
                <Styled.TypeModelTitle>
                  <Styled.RouterLink to={`/${workType}/${work.id}`}>
                    {work.title ? work.title : work.name}
                  </Styled.RouterLink>
                </Styled.TypeModelTitle>
              </Styled.TypeModelContent>
            ))}
          </Styled.TypeModel>
        )}
        <Styled.Pagination>
          {currentPage > 1 && (
            <Styled.PreviousButton
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </Styled.PreviousButton>
          )}
          {currentPage > 2 && (
            <Styled.PaginationButtons
              onClick={() => {
                setCurrentPage(currentPage - 2);
              }}
            >
              {currentPage - 2}
            </Styled.PaginationButtons>
          )}
          {currentPage > 1 && (
            <Styled.PaginationButtons
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              {currentPage - 1}
            </Styled.PaginationButtons>
          )}
          <Styled.CurrentPage>{currentPage}</Styled.CurrentPage>
          <Styled.PaginationButtons
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            {currentPage + 1}
          </Styled.PaginationButtons>
          <Styled.PaginationButtons
            onClick={() => {
              setCurrentPage(currentPage + 2);
            }}
          >
            {currentPage + 2}
          </Styled.PaginationButtons>
          <Styled.PaginationButtons
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </Styled.PaginationButtons>
        </Styled.Pagination>
      </Styled.TypeModelWrapper>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default TypeModel;
