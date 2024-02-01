import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const COLORS = {
  BODY_BACKGROUND_COLOR: "#dee2e6",
  NAVIGATION_FOOTER_BACKGROUND_COLOR: "#0077b6",
  PAGE_TITLE_COLOR: "#0077b6",
  LINK_COLOR: "#0077b6",
  FOOTER_COLOR: "#ced4da",
  RATING_BACKGROUND_COLOR: "#06d6a0",
  SECTION_COLOR: "#6c757d",
  PAGE_WHITE: "#f8f9fa",
  PAGE_BLACK: "#000000",
  STATUS: "#003566",
  RED: "#e43e54",
};

export const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Overpass', sans-serif;
  }
  body {
    background-color: ${COLORS.BODY_BACKGROUND_COLOR};    
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
