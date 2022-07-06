import styled from "@emotion/styled";
import React from "react";
import { Heading } from "theme-ui";
import { FinanceReport } from "../interfaces";

interface Props {
  report: FinanceReport;
}

const CatSection = (props: Props) => {
  const {} = props;
  const { report } = props;

  const StyledCatSection = styled.div`
  
  
  `
  return (
    <StyledCatSection>
      <Heading as="h2">
        {report.dying === undefined
          ? "Enter your current finances"
          : report.dying
          ? `You have ${report.daysToLive} days to live`
          : "Congrats your pet is thriving!"}
      </Heading>
    </StyledCatSection>
  )
};

export default CatSection;
