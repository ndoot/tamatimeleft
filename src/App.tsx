import React, { useEffect, useState } from "react";
import { Divider, Heading } from "theme-ui";
import "./App.css";
import CalculatorSection from "./components/CalculatorSection";
import CatSection from "./components/CatSection";
import styled from "@emotion/styled";
import { defaultFinanceReport, FinanceReport } from "./interfaces";
import InstructionsModal from "./components/InstructionsModal";

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
  const [fullReport, setFullReport] =
    useState<FinanceReport>(defaultFinanceReport);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  useEffect(() => {
    console.log(fullReport);
  }, [fullReport]);

  return (
    <div>
      <StyledApp>
        <Heading>Savings Cat-culator</Heading>
        <CatSection report={fullReport} />
        <Divider />
        <CalculatorSection updateReport={(report) => setFullReport(report)} />
      </StyledApp>
      <InstructionsModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default App;
