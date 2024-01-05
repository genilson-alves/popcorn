import React, { useState, useEffect } from "react";
import { HomeNavigationBar } from "./NavigationBar";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FooterComponent } from "./FooterComponent";
import { COLORS } from "../Styled";
import styled from "styled-components";

type Movies = {
  poster_path: string;
  id: number;
  title: string;
  vote_average: number;
  name: string;
};

const TypeModelWrapper = styled.div``;
const TypeModelPageTitle = styled.div``;
const TypeModelContent = styled.div``;
const TypeModelPoster = styled.div``;
const TypeModelRating = styled.div``;
const TypeModelTitle = styled.div``;
const TypeModelLink = styled(Link)``;
const Pagination = styled.div``;
const PreviousButton = styled.button``;
const PaginationButtons = styled.button``;
const CurrentPage = styled.button``;

const TypeModel = (props: any) => {
  return (
    <div>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default TypeModel;
