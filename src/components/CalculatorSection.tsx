import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Heading } from "theme-ui";
import BlockStack from "./BlockStack";
import { FormValue } from "../interfaces";

interface Props {}

const MainButton = styled(Button)`
  width: 70%;
  margin: 1rem auto;
  max-width: 300px;
  padding: 1rem;
  font-family: "Press Start 2P";
  display: block;
  &:hover {
    background-color: ${(props) => props.theme.colors?.secondary};
    cursor: pointer;
  }
`;

const defaultFormValue: FormValue = {
  category: "",
  amount: "",
  frequency: "One-off",
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

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  const updateForm = (
    fieldName: string,
    fieldVal: string | number,
    blockType: string,
    idx: number
  ) => {
    const newFormValues = { ...formValues };
    newFormValues[blockType][idx][fieldName] = fieldVal;
    setFormValues(newFormValues);
  };

  const addFormField = (blockType: string) => {
    const newFormValues = { ...formValues };
    newFormValues[blockType].push({ ...defaultFormValue, blockType });
    setFormValues(newFormValues);
  };

  const delFormField = (blockType: string, idx: number) => {
    const newFormValues = { ...formValues };
    newFormValues[blockType].splice(idx, 1);
    setFormValues(newFormValues);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="CalculatorSection">
      <Heading as="h3">Savings</Heading>
      <Heading as="h3">Income</Heading>
      <BlockStack
        blockType="income"
        formValues={formValues.income}
        updateForm={updateForm}
        addFormField={addFormField}
        delFormField={delFormField}
      />
      <Heading as="h3">Expenses</Heading>
      <BlockStack
        blockType="expenses"
        formValues={formValues.expenses}
        updateForm={updateForm}
        addFormField={addFormField}
        delFormField={delFormField}
      />
      <MainButton bg="primary" onClick={() => scrollToTop()}>
        Calculate
      </MainButton>
    </div>
  );
};

export default CalculatorSection;
