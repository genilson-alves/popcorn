import React, { useState, useEffect } from "react";
import styled from "styled-components";

const logo = require("../assets/logo.png");

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: auto;
`;

const NavigationWrapper = styled.div`
  text-align: center;
  background-color: #495057;
  height: 7vh;
`;

const NavigationLinks = styled.div`
  display: inherit;
  justify-content: space-around;
  align-items: center;
  flex: 1;
`;

const Content = styled.main`
  max-width: 1700px;
  margin: auto;
`;

const Logo = styled.div`
  padding: 25px;
  img {
    max-width: 90px;
  }
`;

const Media = styled.div`
  display: inherit;
`;

const User = styled.div`
  display: inherit;
`;

const Link = styled.a`
  font-size: 1rem;
  color: #ced4da;
  padding: 25px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const NavigationComponent = () => {
  return (
    <NavigationWrapper>
      <Navigation>
        <Logo>
          <img src={logo} />
        </Logo>
        <NavigationLinks>
          <Media>
            <Link href="#">Search</Link>
            <Link href="#">Movies</Link>
            <Link href="#">TV Series</Link>
          </Media>
          <User>
            <Link href="#">Sign In</Link>
            <Link href="#">Sign Up</Link>
          </User>
        </NavigationLinks>
      </Navigation>
    </NavigationWrapper>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <NavigationComponent></NavigationComponent>
      <Content>Hello</Content>
    </div>
  );
};

export default Home;
