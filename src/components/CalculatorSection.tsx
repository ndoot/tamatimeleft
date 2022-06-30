import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { Button, Container, Heading } from "theme-ui";
import { theme } from "../theme";
import BlockStack from "./BlockStack";
import { FormValue } from "../interfaces";

interface Props {}

const MainButton = styled(Button)`
  width: 70%;
  margin: auto;
  max-width: 300px;
  padding: 1rem;
  font-family: "Press Start 2P";
  &:hover {
    background-color: ${theme.colors?.secondary};
    cursor: pointer;
  }
`;

const defaultFormValue: FormValue = {
  category: "",
  amount: undefined,
  frequency: "weekly",
  blockType: "",
};

const CalculatorSection = (props: Props) => {
  const {} = props;

  const [formValues, setFormValues] = useState([
    { ...defaultFormValue, blockType: "income" },
    { ...defaultFormValue, blockType: "expenses" },
  ]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx: number
  ) => {
    console.log(`Changing idx ${idx}`);
    const newFormValues = [...formValues];
    newFormValues[idx][e.target.name as string] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormField = (blockType: string) => {
    setFormValues([
      ...formValues,
      {...defaultFormValue, blockType}
    ]);
  };

  const removeFormField = (idx: number) => {
    const newFormValues = [...formValues];
    newFormValues.splice(idx, 1);
    setFormValues(newFormValues);
  };

  return (
    <div className="CalculatorSection">
      <Heading as="h3">Savings</Heading>
      <Heading as="h3">Income</Heading>
      <BlockStack
        blockType="income"
        formValues={formValues.filter((val) => val.blockType === "income")}
        handleChange={handleChange}
      />
      <Heading as="h3">Expenses</Heading>
      <BlockStack
        blockType="expenses"
        formValues={formValues.filter((val) => val.blockType === "expenses")}
        handleChange={handleChange}
      />
      <MainButton bg="primary">Calculate</MainButton>
    </div>
  );
};

export default CalculatorSection;
