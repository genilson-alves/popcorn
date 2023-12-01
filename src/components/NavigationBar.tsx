import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const logo = require("../assets/logo.png");

const Logo = styled.div`
  img {
    max-width: 90px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: auto;
`;

const NavigationLink = styled.a`
  font-size: 1rem;
  color: #ced4da;
  padding: 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const NavigationOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavigationUser = styled.div`
  display: flex;
  gap: 50px;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const DropdownLink = styled(Link)`
  color: #415a77;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: #f1f1f1;
    border-radius: 10px;
  }
`;
const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${DropdownContent} {
      transition: 1s;
      display: block;
    }
  }
`;

const DropdownSearch = styled.input`
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #f1f1f1;
`;

const PageNavigationWrapper = styled.div`
  background-color: rgba(65, 90, 119, 0.6);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 80px;
  padding: 10px;
`;

const HomeNavigationWrapper = styled.div<{
  visible: boolean;
  position: boolean;
}>`
  background-color: #415a77;
  position: ${(props) => (props.position ? "static" : "fixed")};
  z-index: 1;
  height: 80px;
  width: 100%;
  padding: 10px;
  transition: 0.2s;
  transform: translateY(${(props) => (props.visible ? "0" : "-100%")});
`;

const NavigationComponent = () => {
  return (
    <Navigation>
      <Logo>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </Logo>
      <NavigationOptions>
        <DropdownMenu>
          <NavigationLink href="#">Search</NavigationLink>
          <DropdownContent>
            <DropdownSearch type="text" />
          </DropdownContent>
        </DropdownMenu>
        <DropdownMenu>
          <NavigationLink href="#">Movies</NavigationLink>
          <DropdownContent>
            <DropdownLink to="/movie/top_rated">Top Rated</DropdownLink>
            <DropdownLink to="/movie/popular">Popular</DropdownLink>
            <DropdownLink to="/movie/upcoming">Upcoming</DropdownLink>
            <DropdownLink to="/movie/now_playing">Now Playing</DropdownLink>
          </DropdownContent>
        </DropdownMenu>
        <DropdownMenu>
          <NavigationLink href="#">TV Shows</NavigationLink>
          <DropdownContent>
            <DropdownLink to="/tv/top_rated">Top Rated</DropdownLink>
            <DropdownLink to="/tv/popular">Popular</DropdownLink>
            <DropdownLink to="/tv/airing_today">Airing Today</DropdownLink>
            <DropdownLink to="/tv/on_the_air">On the Air</DropdownLink>
          </DropdownContent>
        </DropdownMenu>
      </NavigationOptions>
      <NavigationUser>
        <NavigationLink href="#">Sign In</NavigationLink>
        <NavigationLink href="#">Sign Up</NavigationLink>
      </NavigationUser>
    </Navigation>
  );
};

export const HomeNavigationBar = () => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > 100) {
      setPosition(false);
    } else {
      setPosition(true);
    }
    if (prevScrollPos > currentScrollPos) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <HomeNavigationWrapper visible={visible} position={position}>
      <NavigationComponent></NavigationComponent>
    </HomeNavigationWrapper>
  );
};

export const PageNavigationBar = () => {
  return (
    <PageNavigationWrapper>
      <NavigationComponent></NavigationComponent>
    </PageNavigationWrapper>
  );
};
