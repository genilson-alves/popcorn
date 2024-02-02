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

const NavigationContainer = styled.div`
  @media (max-width: 1199px) {
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
`;

const LogoHamburger = styled.div`
  @media (max-width: 1199px) {
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

const HamburgerButton = styled.div<{ $show: boolean }>`
  border: none;
  transition: 0.3s;
  img {
    width: 40px;
  }
  display: ${(props) => (props.$show ? "none" : "block")};
  cursor: pointer;
  @media (min-width: 1200px) {
    display: none;
  }
`;

const CloseButton = styled.div<{ $show: boolean }>`
  transition: 0.3s;
  img {
    width: 40px;
  }
  cursor: pointer;
  display: ${(props) => (props.$show ? "block" : "none")};
  @media (min-width: 1200px) {
    display: none;
  }
`;

const NavigationLinks = styled.div<{ $show: boolean }>`
  display: flex;
  @media (max-width: 1199px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 5px;
    display: ${(props) => (props.$show ? "flex" : "none")};
  }
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: auto;
    gap: 20px;
    align-items: center;
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
  @media (max-width: 1199px) {
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
  @media (max-width: 1199px) {
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
  @media (max-width: 1199px) {
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
  @media (max-width: 1199px) {
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
  @media (max-width: 1199px) {
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

  @media (max-width: 1199px) {
    background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
    color: ${COLORS.PAGE_WHITE};
    padding: 7px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1199px) {
    display: none;
    margin: 10px 0px;
  }
`;

const Sign = styled(Link)`
  text-decoration: none;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;
  padding: 15px;
  color: white;
  background-color: ${COLORS.RED};
  &:hover {
    text-decoration: underline;
  }
`;

const Navigation: React.FC = () => {
  const [showNavigation, setButtonNavigation] = useState(false);

  const handleButtonClick = () => {
    setButtonNavigation((prev) => !prev);
  };

  return (
    <NavigationWrapper>
      <NavigationContainer>
        <LogoHamburger>
          <Logo>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </Logo>
          <HamburgerButton $show={showNavigation} onClick={handleButtonClick}>
            <img src={hamburger} alt="hamburger" />
          </HamburgerButton>
          <CloseButton $show={showNavigation} onClick={handleButtonClick}>
            <img src={close} alt="close" />
          </CloseButton>
        </LogoHamburger>
        <NavigationLinks $show={showNavigation} onClick={handleButtonClick}>
          <NavigationLink to="/search" onClick={handleButtonClick}>
            Search
          </NavigationLink>
          <MobileLogin to="/login" onClick={handleButtonClick}>
            Login
          </MobileLogin>
          <Dropdown>
            <DropdownButton>Movies</DropdownButton>
            <DropdownContent>
              <DropdownOption to="/movie/top_rated" onClick={handleButtonClick}>
                Top Rated
              </DropdownOption>
              <DropdownOption to="/movie/popular" onClick={handleButtonClick}>
                Popular
              </DropdownOption>
              <DropdownOption to="/movie/upcoming" onClick={handleButtonClick}>
                Upcoming
              </DropdownOption>
              <DropdownOption
                to="/movie/now_playing"
                onClick={handleButtonClick}
              >
                Now Playing
              </DropdownOption>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownButton>TV Shows</DropdownButton>
            <DropdownContent>
              <DropdownOption to="/tv/top_rated" onClick={handleButtonClick}>
                Top Rated
              </DropdownOption>
              <DropdownOption to="/tv/popular" onClick={handleButtonClick}>
                Popular
              </DropdownOption>
              <DropdownOption to="/tv/airing_today" onClick={handleButtonClick}>
                Airing Today
              </DropdownOption>
              <DropdownOption to="/tv/on_the_air" onClick={handleButtonClick}>
                On the Air
              </DropdownOption>
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
