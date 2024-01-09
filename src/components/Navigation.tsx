import React from "react";
import styled from "styled-components";
import { COLORS } from "../Styled";
import { Link } from "react-router-dom";
const logo = require("../assets/logo.png");

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  color: ${COLORS.FOOTER_COLOR};
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavigationLink = styled(Link)`
  font-size: 1rem;
  color: ${COLORS.PAGE_WHITE};
  text-decoration: none;
  padding: 10px 0px;
  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.div`
  img {
    height: 50px;
  }
`;

const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const DropdownContent = styled.div`
  display: none;
  padding: 5px;
  position: absolute;
  background-color: ${COLORS.PAGE_WHITE};
  min-width: 160px;
  z-index: 1;
`;

const Dropdown = styled.div`
  position: relative;
  &:hover {
    ${DropdownContent} {
      display: block;
      border-radius: 10px;
    }
  }
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${COLORS.PAGE_WHITE};
  font-size: 1rem;
  padding: 10px 0px;
  &:hover {
    text-decoration: underline;
  }
`;

const DropdownOption = styled(Link)`
  color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  background-color: ${COLORS.PAGE_WHITE};
  border-radius: 10px;
  padding: 12px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #fff;
    text-decoration: underline;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Sign = styled(Link)`
  text-decoration: none;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
  padding: 15px;
  color: white;
  background-color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Logo>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </Logo>
      <NavigationLinks>
        <NavigationLink to="/search">Search</NavigationLink>
        <Dropdown>
          <DropdownButton>Movies</DropdownButton>
          <DropdownContent>
            <DropdownOption to="/movie/top_rated">Top Rated</DropdownOption>
            <DropdownOption to="/movie/popular">Popular</DropdownOption>
            <DropdownOption to="/movie/upcoming">Upcoming</DropdownOption>
            <DropdownOption to="/movie/now_playing">Now Playing</DropdownOption>
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <DropdownButton>TV Shows</DropdownButton>
          <DropdownContent>
            <DropdownOption to="/tv/top_rated">Top Rated</DropdownOption>
            <DropdownOption to="/tv/popular">Popular</DropdownOption>
            <DropdownOption to="/tv/airing_today">Airing Today</DropdownOption>
            <DropdownOption to="/tv/on_the_air">On the Air</DropdownOption>
          </DropdownContent>
        </Dropdown>
      </NavigationLinks>
      <User>
        <Sign to="/">Sign In</Sign>
        <Sign to="/">Sign Up</Sign>
      </User>
    </NavigationContainer>
  );
};

export default Navigation;
