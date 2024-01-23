import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Styled";
import styled from "styled-components";
import { WorkInformationRightContentProductionWrapper } from "./../Styled";
const linkedin = require("../assets/linkedin.png");
const github = require("../assets/github.png");
const mobile = require("../assets/mobile.png");
const email = require("../assets/email.png");

const FooterWrapper = styled.footer`
  color: ${COLORS.FOOTER_COLOR};
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Footer = styled.footer`
  margin-bottom: 30px;
  width: 100%;
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
    flex-direction: row;
    justify-content: space-around;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    ul {
      align-items: center;
    }
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

const FooterEnd = styled.div`
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    list-style: none;
    img {
      width: 25px;
    }
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
      </Footer>
      <FooterEnd>
        <ul>
          <li>
            <FooterLink to="https://github.com/genilson-alves" target="_blank">
              <img src={github} alt="GitHub"></img>
            </FooterLink>
          </li>
          <li>
            <FooterLink
              to="https://linkedin.com/in/genilson-alves0"
              target="_blank"
            >
              <img src={linkedin} alt="LinkedIn"></img>
            </FooterLink>
          </li>
        </ul>
      </FooterEnd>
    </FooterWrapper>
  );
};
