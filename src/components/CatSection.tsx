import styled from "@emotion/styled";
import React from "react";
import { Heading } from "theme-ui";
import { FinanceReport } from "../interfaces";
import happycat from './assets/happycat.gif'; 
import sadcat from './assets/sadcat.gif'; 
import sleepcat from './assets/sleepcat.gif'; 
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Example from './Example'

interface Props {
  report: FinanceReport;
}

const CatSection = (props: Props) => {
  const { report } = props;

  const StyledCatSection = styled.div`
    height: 500px;
    align-items: center;
    background-color: ${(props) => props.theme.colors?.highlight};
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `
  const [heading, cat] = (report.dying === undefined
    ? ["Enter your current finances", sleepcat]
    : report.dying
    ? [`You have ${report.daysToLive} days to live`, sadcat]
    : ["Congrats your pet is thriving!", happycat]);

  return (
    <>
    <StyledCatSection>
      <Heading as="h2">{heading}</Heading>
      <img src={cat} alt="cat" width={300} height={300}></img>
    </StyledCatSection>
    <DndProvider backend={HTML5Backend}>
      <Example />
    </DndProvider>
    </>
  )
};

export default CatSection;
