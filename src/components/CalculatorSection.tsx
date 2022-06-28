import React from "react";
import styled from "@emotion/styled";
import { Button } from "theme-ui";
import { theme } from "../theme";

interface Props {}

const MainButton = styled(Button)`
  width: 70%;
  max-width: 300px;
  padding: 1rem;
  font-family: "Press Start 2P";
  &:hover {
    background-color: ${theme.colors?.secondary};
    cursor: pointer;
  }
`;

const CalculatorSection = (props: Props) => {
  const {} = props;

  return (
    <div className="CalculatorSection">
      <MainButton bg="primary">Calculate</MainButton>
    </div>
  );
};

export default CalculatorSection;
