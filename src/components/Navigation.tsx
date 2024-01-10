import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Styled";
import { Link } from "react-router-dom";
const logo = require("../assets/logo.png");
const hamburger = require("../assets/hamburger.png");
const close = require("../assets/close.png");

const NavigationContainer = styled.div<{ showMenu: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  color: ${COLORS.FOOTER_COLOR};
  @media (max-width: 768px) {
    flex-direction: ${(props) => (props.showMenu ? "column" : "row")};
    padding: 10px 20px;
    align-items: center;
  }
`;

const Logo = styled.div`
  img {
    height: 50px;
  }
`;

const NavigationLinks = styled.div<{ showMenu: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    display: ${(props) => (props.showMenu ? "flex" : "none")};
  }
`;

const LogoHamburger = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const HamburgerButton = styled.div<{ showMenu: boolean }>`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: ${(props) => (props.showMenu ? "none" : "block")};
    transition: 0.3s;
    img {
      width: 40px;
    }
  }
`;

const CloseButton = styled.div<{ showMenu: boolean }>`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: ${(props) => (props.showMenu ? "block" : "none")};
    transition: 0.3s;
    img {
      width: 40px;
    }
  }
`;

const Dropdown = styled.div`
  position: relative;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin: 10px 0;
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

const DropdownContent = styled.div`
  display: none;
  padding: 5px;
  position: absolute;
  background-color: ${COLORS.PAGE_WHITE};
  min-width: 160px;
  z-index: 1;

  ${Dropdown}:hover & {
    display: block;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    display: block;
    position: static;
    width: 100%;
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
  @media (max-width: 768px) {
    display: none;
    margin: 10px 0;
  }
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
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <NavigationContainer showMenu={showMenu}>
      <LogoHamburger>
        <Logo>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Logo>
        <HamburgerButton showMenu={showMenu} onClick={toggleMenu}>
          <img src={hamburger} alt="hamburger" />
        </HamburgerButton>
        <CloseButton showMenu={showMenu} onClick={toggleMenu}>
          <img src={close} alt="close" />
        </CloseButton>
      </LogoHamburger>
      <NavigationLinks showMenu={showMenu}>
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
