import React, { MouseEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Heading } from "theme-ui";
import BlockStack from "./BlockStack";
import { FinanceReport, FormValue } from "../interfaces";

interface Props {
  updateReport: (report: FinanceReport) => void;
}

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
  const { updateReport } = props;

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

  const onCalculateClick = (e: MouseEvent) => {
    e.preventDefault();
    const newReport = calculate(formValues);
    updateReport(newReport);
    scrollToTop();
  };

  /**
   * Given financial data, does the calculation for time left and other
   * relevant stats about financial status
   * @param formValues savings, income and expenses information
   */
  const calculate = (formValues: AllFormValues) => {
    const savings = sumOneOffFinances(formValues.savings);
    const incomePerMonth = sumRecurringFinances(formValues.income);
    const incomeOneOff = sumOneOffFinances(formValues.income);
    const expensesPerMonth = sumRecurringFinances(formValues.expenses);
    const expensesOneOff = sumOneOffFinances(formValues.expenses);
    const netPerMonth = incomePerMonth - expensesPerMonth;

    const report: FinanceReport = {
      dying: undefined,
      daysToLive: -1,
      incomeCategories: [],
      expensesCategories: [],
    };

    if (netPerMonth < 0 || incomePerMonth === 0) {
      // dying case
      report.dying = true;
      report.daysToLive = calculateDaysToLive(
        savings + incomeOneOff - expensesOneOff,
        incomePerMonth,
        expensesPerMonth
      );
    } else {
      // healthy case
      report.dying = false;
    }

    return report;
  };

  const calculateDaysToLive = (
    savings: number,
    incomePerMonth: number,
    expensesPerMonth: number
  ) => {
    const spendingPerDay = (expensesPerMonth - incomePerMonth) / 30;
    if (savings <= 0) return 0;
    return Math.round(savings / spendingPerDay);
  };

  /**
   * Sum together recurring finances by occurrence to calculate
   * monthly total
   */
  const sumRecurringFinances = (data: FormValue[]) => {
    const perMonth = data.reduce((total, item) => {
      let multiplier = 0;
      switch (item.frequency) {
        case "Monthly":
          multiplier = 1;
          break;
        case "Fortnightly":
          multiplier = 2;
          break;
        case "Weekly":
          multiplier = 4;
          break;
        case "Daily":
          multiplier = 30;
          break;
        default:
          break;
      }

      const amount = item.amount === "" ? 0 : item.amount;
      return total + amount * multiplier;
    }, 0);

    return perMonth;
  };

  /**
   * Sum together one off finances
   */
  const sumOneOffFinances = (data: FormValue[]) => {
    const oneOffs = data.filter((cur) => cur.frequency === "One-off");
    return oneOffs.reduce((total, cur) => {
      const amount = cur.amount === "" ? 0 : cur.amount;
      return total + amount;
    }, 0);
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
      <MainButton bg="primary" onClick={(e) => onCalculateClick(e)}>
        Calculate
      </MainButton>
    </div>
  );
};

export default CalculatorSection;
