import React, { useEffect } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import { COLORS } from "../Styled";
import { FooterComponent } from "./FooterComponent";

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
  margin: 10px;
  @media (max-width: 768px) {
    margin: 50px 10px;
  }
`;

const LoginWrapper = styled.div`
  padding: 20px;
  justify-content: space-around;
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.PAGE_WHITE};
  a {
    color: ${COLORS.PAGE_WHITE};
    &:hover {
      opacity: 0.8;
    }
  }
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  @media (min-width: 1200px) {
    height: 600px;
    width: 600px;
  }
  @media (max-width: 768px) {
    height: 600px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 500px;
    height: 600px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  gap: 15px;
`;

const Input = styled.input`
  border: none;
  border: 1px solid gray;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  margin: 10px 0px;
`;

const SignUp = styled.a`
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${COLORS.PAGE_WHITE};
  color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const Welcome = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 10px;
`;

const LoginAccount = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
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
          <ContentWrapper>
            <Welcome>WELCOME!</Welcome>
            <LoginAccount>Login to your account</LoginAccount>
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
            <a href="/signup">Sign Up</a>
          </ContentWrapper>
        </LoginWrapper>
      </LoginContainer>
      <FooterComponent></FooterComponent>
    </Wrapper>
  );
}

export default SignIn;
