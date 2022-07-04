import React from "react";
import { Heading } from "theme-ui";
import { FinanceReport } from "../interfaces";

interface Props {
  report: FinanceReport;
}

const CatSection = (props: Props) => {
  const { report } = props;

  return (
    <div className="CatSection">
      <Heading as="h2">
        {report.dying === undefined
          ? "Enter your current finances"
          : report.dying
          ? `You have ${report.daysToLive} days to live`
          : "Congrats your pet is thriving!"}
      </Heading>
    </div>
  );
};

export default CatSection;
