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
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const NavigationOptions = styled.div`
  display: flex;
  gap: 50px;
`;

const NavigationUser = styled.div`
  display: flex;
  gap: 50px;
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

export const HomeNavigationBar = () => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleScroll = () => {
    const threshold = 80;
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > threshold) {
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
      <Navigation>
        <Logo>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Logo>
        <NavigationOptions>
          <NavigationLink href="#">Search</NavigationLink>
          <NavigationLink href="#">Movies</NavigationLink>
          <NavigationLink href="#">TV Series</NavigationLink>
        </NavigationOptions>
        <NavigationUser>
          <NavigationLink href="#">Sign In</NavigationLink>
          <NavigationLink href="#">Sign Up</NavigationLink>
        </NavigationUser>
      </Navigation>
    </HomeNavigationWrapper>
  );
};

const PageNavigationWrapper = styled.div<{
  visible: boolean;
  transparent: boolean;
}>`
  background-color: ${(props) =>
    props.transparent ? "rgba(65, 90, 119, 0.6)" : "rgba(65, 90, 119)"};
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 80px;
  padding: 10px;
  transition: 0.2s;
  transform: translateY(${(props) => (props.visible ? "0" : "-100%")});
`;

export const PageNavigationBar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [transparent, setTransparent] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const threshold = 500;
    if (currentScrollPos > threshold) {
      setTransparent(!transparent);
    } else {
      setTransparent(transparent);
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
    <PageNavigationWrapper visible={visible} transparent={transparent}>
      <Navigation>
        <Logo>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Logo>
        <NavigationOptions>
          <NavigationLink href="#">Search</NavigationLink>
          <NavigationLink href="#">Movies</NavigationLink>
          <NavigationLink href="#">TV</NavigationLink>
        </NavigationOptions>
        <NavigationUser>
          <NavigationLink href="#">Sign In</NavigationLink>
          <NavigationLink href="#">Sign Up</NavigationLink>
        </NavigationUser>
      </Navigation>
    </PageNavigationWrapper>
  );
};
