import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Styled";
import styled from "styled-components";
const linkedin = require("../assets/linkedin.png");
const github = require("../assets/github.png");
const mobile = require("../assets/mobile.png");
const email = require("../assets/email.png");

const FooterWrapper = styled.footer`
  color: ${COLORS.FOOTER_COLOR};
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  padding: 30px 0px 0px;
  @media (min-width: 1200px) {
    height: 300px;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
    margin: 20px;
    li {
      display: flex;
      align-items: center;
      gap: 5px;
      img {
        width: 20px;
      }
    }
    p {
      font-weight: bold;
      margin-bottom: 3px;
    }
  }
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: auto;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: ${COLORS.FOOTER_COLOR};
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export const FooterComponent = () => {
  return (
    <FooterWrapper>
      <Footer>
        <ul>
          <p>Movies</p>
          <li>
            <FooterLink to="/movie/top_rated">Top Rated</FooterLink>
          </li>
          <li>
            <FooterLink to="/movie/popular">Popular</FooterLink>
          </li>
          <li>
            <FooterLink to="/movie/upcoming">Upcoming</FooterLink>
          </li>
          <li>
            <FooterLink to="/movie/now_playing">Now Playing</FooterLink>
          </li>
        </ul>
        <ul>
          <p>Tv Shows</p>
          <li>
            <FooterLink to="/tv/popular">Popular</FooterLink>
          </li>
          <li>
            <FooterLink to="/tv/top_rated">Top Rated</FooterLink>
          </li>
          <li>
            <FooterLink to="/tv/airing_today">Airing Today</FooterLink>
          </li>
          <li>
            <FooterLink to="/tv/on_the_air">On The Air</FooterLink>
          </li>
        </ul>
        <ul>
          <p>TheMovieDatabase</p>
          <li>
            <FooterLink to="https://www.themoviedb.org/" target="_blank">
              Website
            </FooterLink>
          </li>
          <li>
            <FooterLink
              to="https://developer.themoviedb.org/docs"
              target="_blank"
            >
              Documentation
            </FooterLink>
          </li>
        </ul>
        <ul>
          <p>Contact</p>
          <li>
            <img src={github} alt="GitHub"></img>
            <FooterLink to="https://github.com/genilson-alves" target="_blank">
              GitHub
            </FooterLink>
          </li>
          <li>
            <img src={linkedin} alt="LinkedIn"></img>
            <FooterLink
              to="https://linkedin.com/in/genilson-alves0"
              target="_blank"
            >
              LinkedIn
            </FooterLink>
          </li>
        </ul>
      </Footer>
    </FooterWrapper>
  );
};
