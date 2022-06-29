import React from "react";
import { Divider, Heading } from "theme-ui";
import "./App.css";
import CalculatorSection from "./components/CalculatorSection";
import CatSection from "./components/CatSection";
import styled from "@emotion/styled";

const StyledApp = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  & > div {
    width: 100%;
  }
`;

const App = () => {
  return (
    <StyledApp>
      <Heading>Savings Cat-culator</Heading>
      <CatSection />
      <Divider />
      <CalculatorSection />
    </StyledApp>
  );
};

export default App;
