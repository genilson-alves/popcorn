import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Styled";
import styled from "styled-components";
import { link } from "fs";
const linkedin = require("../assets/linkedin.png");
const github = require("../assets/github.png");
const mobile = require("../assets/mobile.png");
const email = require("../assets/email.png");

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  margin-top: 50px;
`;

const Footer = styled.footer`
  max-width: 1500px;
  margin: auto;
  color: ${COLORS.FOOTER_COLOR};
  display: flex;
  justify-content: space-evenly;
  padding: 30px;
  ul {
    gap: 10px;
    display: flex;
    flex-direction: column;
    list-style: none;
    li {
      display: flex;
      align-items: center;
      gap: 20px;
      img {
        width: 30px;
      }
    }
    span {
    }
    p {
      margin: 30px 0px 20px;
      font-size: 1.5rem;
      font-weight: bold;
      border-bottom: 0.5px solid ${COLORS.FOOTER_COLOR};
      padding-bottom: 20px;
    }
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  padding-left: 5px;
  color: ${COLORS.FOOTER_COLOR};
  &:hover {
    text-decoration: underline;
  }
`;

const FooterEnd = styled.div`
  color: ${COLORS.PAGE_WHITE};
  font-size: 1.2rem;
  font-style: italic;
  margin: auto;
  padding: 50px;
  max-width: 1500px;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      width: 30px;
    }
  }
`;

export const FooterComponent = () => {
  return (
    <FooterWrapper>
      <Footer>
        <ul>
          <p>Contact Me</p>
          <li>
            <img src={github} alt="GitHub"></img>
            <FooterLink to="https://github.com/genilson-alves" target="_blank">
              Genilson Alves Ferreira da Silva
            </FooterLink>
          </li>
          <li>
            <img src={linkedin} alt="LinkedIn"></img>
            <FooterLink
              to="https://linkedin.com/in/genilson-alves0"
              target="_blank"
            >
              Genilson Alves Ferreira da Silva
            </FooterLink>
          </li>
          <li>
            <img src={email} alt="E-mail"></img>
            <span>genilson.alves9555@gmail.com</span>
          </li>
          <li>
            <img src={mobile} alt="Phone"></img>
            <span>55 41 9 85319395</span>
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
          <p>TV Shows</p>
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
      </Footer>
      <FooterEnd>
        <div>
          <Link to="https://linkedin.com/in/genilson-alves0" target="_blank">
            <img src={linkedin} alt="LinkedIn"></img>
          </Link>
          <Link to="https://github.com/genilson-alves" target="_blank">
            <img src={github} alt="GitHub"></img>
          </Link>
        </div>
        <div>Brazil</div>
        <div>2023</div>
      </FooterEnd>
    </FooterWrapper>
  );
};
