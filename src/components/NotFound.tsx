import React from "react";
import styled from "styled-components";
import { COLORS } from "../Styled";

const PageNotFound = styled.div`
  margin: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  a {
    font-size: 1rem;
    margin-top: 10px;
    border-radius: 10px;
    background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
    border: none;
    padding: 10px;
    color: ${COLORS.PAGE_WHITE};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      opacity: 0.9;
    }
  }
`;

function NotFound() {
  return (
    <PageNotFound>
      <h1>PAGE NOT FOUND!</h1>
      <p>We are sorry to say, but the page you requested was not found.</p>
      <a href="/">Go back to the home page</a>
    </PageNotFound>
  );
}

export default NotFound;
