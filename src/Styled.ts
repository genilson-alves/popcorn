import styled from "styled-components";

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
  margin: 40px auto;
  padding: 50px;
  border-radius: 40px;
  background-color: pink;
  width: 50vw;
  height: 50vh;
`;

export const Poster = styled.div`
  border-radius: 5px;
  img {
  }
`;

export const Overview = styled.div``;

export const Title = styled.div``;

export const Synopsis = styled.div``;

export const ReleaseDate = styled.div``;

export const Score = styled.div``;

export const Rating = styled.div``;

export const RatingNumber = styled.div``;

export const Footer = styled.footer``;
