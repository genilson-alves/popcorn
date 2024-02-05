import React, { useEffect } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import { COLORS } from "../Styled";
import { FooterComponent } from "./FooterComponent";
const logo = require("../assets/logo.png");

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${COLORS.PAGE_WHITE};
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  @media (max-width: 768px) {
    margin: 50px 10px;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  a {
    color: #0047ab;
    &:hover {
      opacity: 0.8;
    }
  }
  img {
    width: 50px;
  }
  @media (max-width: 768px) {
    border: none;
    height: 600px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 500px;
    height: 600px;
  }
  @media (min-width: 1200px) {
    height: 600px;
    width: 600px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  gap: 20px;
  span {
    color: ${COLORS.SECTION_COLOR};
  }
`;

const Input = styled.input`
  border: none;
  border: 1px solid ${COLORS.SECTION_COLOR};
  outline: none;
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  margin: 10px 0px;
  &:focus {
    border: 2px solid #0047ab;
  }
`;

const SignUp = styled.a`
  font-size: 0.8rem;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #0047ab;
  color: ${COLORS.PAGE_WHITE};
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;

const Welcome = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function SignIn() {
  useEffect(() => {
    document.title = `Sign In`;
    return () => {
      document.title = "Sign In";
    };
  }, []);
  return (
    <Wrapper>
      <Navigation></Navigation>
      <LoginContainer>
        <LoginWrapper>
          <img src={logo} alt="logo"></img>
          <ContentWrapper>
            <Welcome>Welcome!</Welcome>
          </ContentWrapper>
          <LoginForm>
            <div>
              <span>E-mail or Username</span>
              <Input type="text" placeholder="Enter your username" />
              <span>Password</span>
              <Input type="password" placeholder="Enter your password" />
              <SignUp href="#">Forgot your password?</SignUp>
            </div>
            <Button type="submit">Login</Button>
          </LoginForm>
          <ContentWrapper>
            <p>Doesn't have an account yet?</p>
            <a href="/signup">Create an account</a>
          </ContentWrapper>
        </LoginWrapper>
      </LoginContainer>
      <FooterComponent></FooterComponent>
    </Wrapper>
  );
}

export default SignIn;
