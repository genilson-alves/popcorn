import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Styled";
import { Link } from "react-router-dom";
const logo = require("../assets/logo.png");
const hamburger = require("../assets/hamburger.png");
const close = require("../assets/close.png");

const NavigationWrapper = styled.div`
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
`;

const NavigationContainer = styled.div<{ showMenu: boolean }>`
  @media (max-width: 768px) {
    flex-direction: ${(props) => (props.showMenu ? "column" : "row")};
    padding: 10px 20px;
    align-items: center;
  }
  @media (min-width: 1200px) {
    max-width: 1400px;
    padding: 10px;
    margin: auto;
    display: flex;
    text-align: center;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    flex-direction: ${(props) => (props.showMenu ? "column" : "row")};
    padding: 10px 20px;
    align-items: center;
  }
`;

const LogoHamburger = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  img {
    height: 50px;
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
  @media (min-width: 768px) and (max-width: 1199px) {
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
  @media (min-width: 768px) and (max-width: 1199px) {
    display: ${(props) => (props.showMenu ? "block" : "none")};
    transition: 0.3s;
    img {
      width: 40px;
    }
  }
`;

const NavigationLinks = styled.div<{ showMenu: boolean }>`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: ${(props) => (props.showMenu ? "flex" : "none")};
    gap: 5px;
  }
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: auto;
    gap: 20px;
    display: flex;
    align-items: center;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: ${(props) => (props.showMenu ? "flex" : "none")};
    gap: 5px;
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
  @media (max-width: 768px) {
    font-size: 1rem;
    color: ${COLORS.PAGE_WHITE};
    text-decoration: none;
    margin-top: 30px;
    font-weight: bold;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    font-size: 1rem;
    color: ${COLORS.PAGE_WHITE};
    text-decoration: none;
    margin-top: 30px;
    font-weight: bold;
  }
`;
const MobileLogin = styled(Link)`
  font-size: 1rem;
  color: ${COLORS.PAGE_WHITE};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    color: ${COLORS.PAGE_WHITE};
    text-decoration: none;
    font-weight: bold;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    font-size: 1rem;
    color: ${COLORS.PAGE_WHITE};
    text-decoration: none;
    font-weight: bold;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: relative;
  @media (max-width: 768px) {
    margin: 10px 0px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    margin: 10px 0px;
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
  @media (max-width: 768px) {
    padding: 5px 0px;
    font-weight: bold;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    padding: 5px 0px;
    font-weight: bold;
  }
`;

const DropdownContent = styled.div`
  display: none;
  padding: 5px;
  position: absolute;
  background-color: ${COLORS.PAGE_WHITE};
  min-width: 160px;
  z-index: 1;
  text-align: left;
  ${Dropdown}:hover & {
    display: block;
    border-radius: 10px;
  }
  @media (max-width: 768px) {
    display: block;
    position: static;
    width: 100%;
    background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: block;
    position: static;
    width: 100%;
    background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
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

  @media (max-width: 768px) {
    background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
    color: ${COLORS.PAGE_WHITE};
    padding: 7px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
    color: ${COLORS.PAGE_WHITE};
    padding: 7px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
    margin: 10px 0;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
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
    <NavigationWrapper>
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
          <MobileLogin to="/login">Login</MobileLogin>
          <Dropdown>
            <DropdownButton>Movies</DropdownButton>
            <DropdownContent>
              <DropdownOption to="/movie/top_rated" onClick={toggleMenu}>
                Top Rated
              </DropdownOption>
              <DropdownOption to="/movie/popular" onClick={toggleMenu}>
                Popular
              </DropdownOption>
              <DropdownOption to="/movie/upcoming" onClick={toggleMenu}>
                Upcoming
              </DropdownOption>
              <DropdownOption to="/movie/now_playing" onClick={toggleMenu}>
                Now Playing
              </DropdownOption>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownButton>TV Shows</DropdownButton>
            <DropdownContent>
              <DropdownOption to="/tv/top_rated">Top Rated</DropdownOption>
              <DropdownOption to="/tv/popular">Popular</DropdownOption>
              <DropdownOption to="/tv/airing_today">
                Airing Today
              </DropdownOption>
              <DropdownOption to="/tv/on_the_air">On the Air</DropdownOption>
            </DropdownContent>
          </Dropdown>
        </NavigationLinks>
        <User>
          <Sign to="/login">Sign In</Sign>
        </User>
      </NavigationContainer>
    </NavigationWrapper>
  );
};

export default Navigation;
