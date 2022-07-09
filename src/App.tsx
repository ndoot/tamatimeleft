import React, { useEffect, useState, createContext, useContext } from "react";
import { Divider, Heading } from "theme-ui";
import "./App.css";
import CalculatorSection from "./components/CalculatorSection";
import CatSection from "./components/CatSection";
import styled from "@emotion/styled";
import { FinanceReport } from "./interfaces";
import { defaultFinanceReport } from "./constants";
import reportContext from "./components/ReportContext";
import ChartSection from "./components/ChartSection";

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
  const [report, setReport] = useState<FinanceReport>(defaultFinanceReport);

  /*useEffect(() => {
    console.log(fullReport);
  }, [fullReport]);*/

  return (
    <reportContext.Provider value={{ report, setReport }}>
      <StyledApp>
        <Heading>Savings Cat-culator</Heading>
        <CatSection />
        <Divider />
        {report.dying !== undefined && <ChartSection />}
        <Divider />
        <CalculatorSection />
      </StyledApp>
    </reportContext.Provider>
  );
};

export default App;
