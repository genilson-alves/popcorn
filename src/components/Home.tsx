import React from "react";
import * as Styled from "../Styled";

const logo = require("../assets/logo.png");

const NavigationComponent = () => {
  return (
    <Styled.NavigationWrapper>
      <Styled.Navigation>
        <Styled.Logo>
          <img src={logo} alt="logo" />
        </Styled.Logo>
        <Styled.NavigationLinks>
          <Styled.Media>
            <Styled.Link href="#">Search</Styled.Link>
            <Styled.Link href="#">Movies</Styled.Link>
            <Styled.Link href="#">TV Series</Styled.Link>
          </Styled.Media>
          <Styled.User>
            <Styled.Link href="#">Sign In</Styled.Link>
            <Styled.Link href="#">Sign Up</Styled.Link>
          </Styled.User>
        </Styled.NavigationLinks>
      </Styled.Navigation>
    </Styled.NavigationWrapper>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <NavigationComponent></NavigationComponent>
      <Styled.Content>
        <Styled.Something>
          <Styled.Poster>
            <img src="" alt=""></img>
          </Styled.Poster>
          <Styled.Overview>
            <Styled.Title>Title</Styled.Title>
            <Styled.Synopsis>
              Overview: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Sunt accusantium animi quae debitis dolorum molestiae ipsa saepe
              necessitatibus accusamus sed. Hic dolorum totam id numquam,
              incidunt obcaecati assumenda voluptate quidem?
            </Styled.Synopsis>
            <Styled.ReleaseDate>01.03.2003</Styled.ReleaseDate>
            <Styled.Score>
              <Styled.Rating>7.5</Styled.Rating>
              <Styled.RatingNumber>390000</Styled.RatingNumber>
            </Styled.Score>
          </Styled.Overview>
        </Styled.Something>
      </Styled.Content>
      <Styled.Footer></Styled.Footer>
    </div>
  );
};

export default Home;

// fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${process.env.REACT_APP_MOVIES_API_KEY}`,
//   },
// })
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
