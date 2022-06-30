import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { Button, Heading } from "theme-ui";
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
  rate: 0,
  blockType: "",
};

interface AllFormValues {
  savings: FormValue[];
  income: FormValue[];
  expenses: FormValue[];
  [propName: string]: any;
}

const CalculatorSection = (props: Props) => {
  const {} = props;

  const [formValues, setFormValues] = useState<AllFormValues>({
    savings: [{ ...defaultFormValue, blockType: "savings" }],
    income: [{ ...defaultFormValue, blockType: "income" }],
    expenses: [{ ...defaultFormValue, blockType: "expenses" }],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    blockType: string,
    idx: number
  ) => {
    const newFormValues = { ...formValues };
    newFormValues[blockType][idx][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormField = (blockType: string) => {
    const newFormValues = { ...formValues };
    newFormValues[blockType].push({ ...defaultFormValue, blockType });
    setFormValues(newFormValues);
  };

  const removeFormField = (blockType: string, idx: number) => {
    const newFormValues = { ...formValues };
    newFormValues[blockType].splice(idx, 1);
    setFormValues(newFormValues);
  };

  return (
    <div className="CalculatorSection">
      <Heading as="h3">Savings</Heading>
      <Heading as="h3">Income</Heading>
      <BlockStack
        blockType="income"
        formValues={formValues.income}
        handleChange={handleChange}
        addFormField={addFormField}
      />
      <Heading as="h3">Expenses</Heading>
      <BlockStack
        blockType="expenses"
        formValues={formValues.expenses}
        handleChange={handleChange}
        addFormField={addFormField}
      />
      <MainButton bg="primary">Calculate</MainButton>
    </div>
  );
};

export default CalculatorSection;
