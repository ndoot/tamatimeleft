import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Heading } from "theme-ui";
import happycat from "./assets/happycat.gif";
import sadcat from "./assets/sadcat.gif";
import sleepcat from "./assets/sleepcat.gif";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import reportContext from "./ReportContext";
import Example from "./Example";
import SpeechBubble from "./SpeechBubble";

const StyledCatSection = styled.div`
  height: 500px;
  align-items: center;
  background-color: ${(props) => props.theme.colors?.highlight};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const StyledHeading = styled(Heading)`
  font-size: 1.2rem;
`;

const CatSection = () => {
  const { report } = useContext(reportContext);

  const [heading, cat] =
    report.dying === undefined
      ? ["Enter your current finances", sleepcat]
      : report.dying
      ? [`You have ${report.daysToLive} days to live`, sadcat]
      : ["Congrats your pet is thriving!", happycat];

  return (
    <>
      <StyledCatSection>
        <StyledHeading as="h2">
          {heading + "\n"} <br />
        </StyledHeading>
        {report.dying !== undefined && (
          <SpeechBubble>
            {report.dying
              ? report.netPerMonth < 0
                ? `Oh no! You are spending $${
                    -1 * report.netPerMonth
                  } more than you earn every month. Check out the charts below to see where you could spend less.`
                : `Oh no! You're spending more than your current savings. However, you are on track to earn $${report.netPerMonth} a month`
              : `You are currently saving ${report.savingsPercentage.toFixed(
                  2
                )}% of your income! Check out the charts below to see how you can save even more :)`}
          </SpeechBubble>
        )}
        <img src={cat} alt="cat" width={300} height={300}></img>
      </StyledCatSection>
      <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider>
    </>
  );
};

export default CatSection;
