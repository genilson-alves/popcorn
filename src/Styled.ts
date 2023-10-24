import styled from "styled-components";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Overpass', sans-serif;
  }

  body {
    color: black;
    background-color: #edede9;    
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: blue;
  font-size: 2rem;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: red;
  font-size: 2rem;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: auto;
`;

export const NavigationWrapper = styled.div`
  text-align: center;
  background-color: #0077b6;
  height: 7vh;
`;

export const NavigationLinks = styled.div`
  display: inherit;
  justify-content: space-around;
  align-items: center;
  flex: 1;
`;

export const Content = styled.main`
  max-width: 1700px;
  margin: auto;
`;

export const Logo = styled.div`
  padding: 25px;
  img {
    max-width: 90px;
  }
`;

export const Media = styled.div`
  display: inherit;
`;

export const User = styled.div`
  display: inherit;
`;

export const Link = styled.a`
  font-size: 1rem;
  color: #ced4da;
  padding: 25px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Something = styled.div`
  display: flex;
  margin: auto;
  padding: 50px;
  border-radius: 40px;
`;

export const Poster = styled.div`
  flex: 1;
  img {
    width: 100%;
    border-radius: 10px;
  }
`;

export const Overview = styled.div`
  flex: 4;
  margin: 0px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Information = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #0077b6;
`;

export const Synopsis = styled.div``;

export const ReleaseDate = styled.div``;

export const Score = styled.div`
  font-weight: bold;
  background-color: #06d6a0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  width: 70px;
  height: 70px;
  gap: 20px;
  border-radius: 10px;
`;

export const Footer = styled.footer``;
