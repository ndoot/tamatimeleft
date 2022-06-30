import React from "react";
import styled from "@emotion/styled";
import { Button, Container, Heading } from "theme-ui";
import { theme } from "../theme";
import BlockStack from "./BlockStack";
//import BlockStack from "./BlockStack";

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

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  return (
    <div className="CalculatorSection">
      <Container>
        <Heading>Savings</Heading>

        <Heading>Income</Heading>
        <BlockStack></BlockStack>
        <Heading>Expenses</Heading>
      </Container>
      <MainButton bg="primary" onClick={scrollToTop}>Calculate</MainButton>
    </div>
  );
};

export default CalculatorSection;
