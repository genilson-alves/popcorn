import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import { COLORS } from "../Styled";
import { FooterComponent } from "./FooterComponent";

const Wrapper = styled.div``;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const LoginWrapper = styled.div`
  background-color: ${COLORS.NAVIGATION_FOOTER_BACKGROUND_COLOR};
  width: 300px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: ${COLORS.PAGE_WHITE};
  a {
    color: ${COLORS.PAGE_WHITE};
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px 0px;
  font-size: 16px;
  background-color: ${COLORS.PAGE_BLACK};
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

function Login() {
  return (
    <Wrapper>
      <Navigation></Navigation>
      <LoginContainer>
        <LoginWrapper>
          <h1>Login</h1>
          <LoginForm>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <h5>Forgot your password?</h5>
            <Button type="submit">Login</Button>
          </LoginForm>
          <a href="/">Sign up</a>
        </LoginWrapper>
      </LoginContainer>
      <FooterComponent></FooterComponent>
    </Wrapper>
  );
}

export default Login;
