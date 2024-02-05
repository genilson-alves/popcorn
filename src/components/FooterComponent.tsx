import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../Styled";
import styled from "styled-components";

const linkedin = require("../assets/linkedin.png");
const github = require("../assets/github.png");

const FooterWrapper = styled.footer`
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  color: ${COLORS.PAGE_WHITE};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  a {
    color: ${COLORS.PAGE_WHITE};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
`;

const Footer = styled.footer`
  width: 100%;
  max-width: 1400px;
`;

const FooterSectionWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  margin: 30px 20px 0px;
  gap: 10px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  @media (min-width: 769px) and (max-width: 1199px) {
    margin: 30px 20px 0px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterSectionTitle = styled.p`
  font-weight: bold;
  margin-bottom: 30px;
`;

const FooterSectionLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionLink = styled(Link)``;

const FooterLogo = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const FooterTagline = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  font-style: italic;
  line-height: 1.5rem;
  width: 50%;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const FooterContact = styled.div`
  margin: 50px 0px 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  img {
    width: 25px;
  }
`;

export const FooterComponent = () => {
  return (
    <FooterWrapper>
      <Footer>
        <FooterSectionWrapper>
          <FooterSection>
            <FooterLogo>POPCORN</FooterLogo>
            <FooterTagline>
              Navigating the World of Movies and TV Shows with Ease!
            </FooterTagline>
          </FooterSection>
          <FooterSection>
            <FooterSectionTitle>MOVIES</FooterSectionTitle>
            <FooterSectionLink>
              <SectionLink to="/movie/top_rated">Top Rated</SectionLink>
              <SectionLink to="/movie/popular">Popular</SectionLink>
              <SectionLink to="/movie/upcoming">Upcoming</SectionLink>
              <SectionLink to="/movie/now_playing">Now Playing</SectionLink>
            </FooterSectionLink>
          </FooterSection>
          <FooterSection>
            <FooterSectionTitle>TV SHOWS</FooterSectionTitle>
            <FooterSectionLink>
              <SectionLink to="/tv/top_rated">Top Rated</SectionLink>
              <SectionLink to="/tv/popular">Popular</SectionLink>
              <SectionLink to="/tv/airing_today">Airing Today</SectionLink>
              <SectionLink to="/tv/on_the_air">On The Air</SectionLink>
            </FooterSectionLink>
          </FooterSection>
          <FooterSection>
            <FooterSectionTitle>THEMOVIEDATABASE</FooterSectionTitle>
            <FooterSectionLink>
              <SectionLink to="#">Documentation</SectionLink>
              <SectionLink to="#">Website</SectionLink>
            </FooterSectionLink>
          </FooterSection>
        </FooterSectionWrapper>
        <FooterContact>
          <Link to="https://github.com/genilson-alves" target="_blank">
            <img src={github} alt="GitHub" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/genilson-alves0/"
            target="_blank"
          >
            <img src={linkedin} alt="LinkedIn" />
          </Link>
        </FooterContact>
      </Footer>
    </FooterWrapper>
  );
};
