import React, { useState, useEffect } from "react";
import { COLORS } from "../Styled";
import styled from "styled-components";
import { Link } from "react-router-dom";
const logo = require("../assets/logo.png");

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
`;

const Logo = styled.img`
  height: 40px;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  a {
    color: ${COLORS.PAGE_WHITE};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUpSignInButtons = styled.div`
  display: flex;
  gap: 1rem;
  button {
    color: ${COLORS.PAGE_WHITE};
    background-color: ${COLORS.PAGE_BLACK};
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Navigation: React.FC = () => {
  return (
    <NavbarWrapper>
      <a href="/">
        <Logo src={logo} alt="Logo" />
      </a>
      <Links>
        <a href="/search">Search</a>
        <a href="/movies">Movies</a>
        <a href="/tvshows">TV Shows</a>
      </Links>
      <SignUpSignInButtons>
        <button>Sign Up</button>
        <button>Sign In</button>
      </SignUpSignInButtons>
    </NavbarWrapper>
  );
};

export default Navigation;
