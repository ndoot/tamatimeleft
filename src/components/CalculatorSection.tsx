import React from "react";
import styled from "@emotion/styled";
import { Button, Container, Heading } from "theme-ui";
import { theme } from "../theme";
import BlockStack from "./BlockStack";

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
      <Heading as="h3">Savings</Heading>
      <Heading as="h3">Income</Heading>
      <BlockStack blockType="income" />
      <Heading as="h3">Expenses</Heading>
      <BlockStack blockType="expenses" />
      <MainButton bg="primary">Calculate</MainButton>
    </div>
  );
};

export default CalculatorSection;
