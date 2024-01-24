import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import { COLORS } from "../Styled";
import { FooterComponent } from "./FooterComponent";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  flex: 1;
`;

const LoginWrapper = styled.div`
  padding: 20px;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.PAGE_BLACK};
  a {
    color: ${COLORS.PAGE_BLACK};
  }
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  @media (min-width: 1200px) {
    height: 600px;
    width: 600px;
  }
  @media (max-width: 768px) {
    height: 500px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 500px;
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
  border-radius: 15px;
  margin: 10px 0px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #023e8a;
  color: #fff;
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

function SignUp() {
  return (
    <Wrapper>
      <Navigation></Navigation>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <LoginContainer>
        <LoginWrapper>
          <ContentWrapper>
            <Welcome>Welcome!</Welcome>
            <LoginAccount>Create your account</LoginAccount>
          </ContentWrapper>
          <LoginForm>
            <div>
              <span>E-mail</span>
              <Input type="text" placeholder="Enter your e-mail" />
              <span>Username</span>
              <Input type="text" placeholder="Enter your username" />
              <span>Password</span>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <Button type="submit">Create account</Button>
          </LoginForm>
          <ContentWrapper>
            <p>Already have an account?</p>
            <a href="/login">Sign In</a>
          </ContentWrapper>
        </LoginWrapper>
      </LoginContainer>
      <FooterComponent></FooterComponent>
    </Wrapper>
  );
}

export default SignUp;
