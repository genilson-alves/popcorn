import React from "react";
import styled from "styled-components";

const NavigationBar = styled.nav`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SearchBar = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
`;

const NavigationLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavigationLink = styled.a`
  text-decoration: none;
  color: #fff;
`;

const Navigation = () => {
  return (
    <NavigationBar>
      <Logo>Website Logo</Logo>
      <SearchBar type="text" placeholder="Search..." />
      <NavigationLinks>
        <NavigationLink href="/">Movies</NavigationLink>
        <NavigationLink href="/">TV Shows</NavigationLink>
        <NavigationLink href="/">Popular</NavigationLink>
        <NavigationLink href="/">Sign In</NavigationLink>
        <NavigationLink href="/">Sign Up</NavigationLink>
      </NavigationLinks>
    </NavigationBar>
  );
};

export default Navigation;
