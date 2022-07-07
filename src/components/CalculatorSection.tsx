import React, { MouseEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Heading } from "theme-ui";
import BlockStack from "./BlockStack";
import { defaultFinanceReport, FinanceReport, FormValue } from "../interfaces";
import Block from "./Block";
import SavingsBlock from "./SavingsBlock";

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
   * Given a financial report, return number of coins the user is eligible for
   */
  const getNumCoins = (report: FinanceReport) => {
    if (report.dying === undefined || report.dying === true) return 0;

    return report.netPerMonth;
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
    const currentSavings = savings + incomeOneOff - expensesOneOff;

    const report = defaultFinanceReport;
    report.netPerMonth = netPerMonth;

    if (currentSavings < 0) {
      // dying case
      report.dying = true;
      report.daysToLive = 0;
    } else if (netPerMonth < 0 || incomePerMonth === 0) {
      // also dying
      report.dying = true;
      report.daysToLive = calculateDaysToLive(
        currentSavings,
        incomePerMonth,
        expensesPerMonth
      );
    } else {
      // healthy case
      report.dying = false;
    }

    return report;
  };

  const collectByCategory = (allValues: FormValue[]) => {};

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
    const perMonth = data.reduce((total, cur) => {
      let multiplier = 0;
      switch (cur.frequency) {
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

      const amount = cur.amount === "" ? 0 : parseInt(`${cur.amount}`);
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
      const amount = cur.amount === "" ? 0 : parseInt(`${cur.amount}`);
      return total + amount;
    }, 0);
  };

  return (
    <div className="CalculatorSection">
      <Heading as="h3">Savings</Heading>
      <BlockStack
        blockType="savings"
        addFormField={addFormField}
        delFormField={delFormField}
      >
        {formValues.savings.map((formValueItem, idx) => (
          <SavingsBlock
            formValue={formValueItem}
            updateForm={updateForm}
            idx={idx}
            key={`savings-${idx}`}
          />
        ))}
      </BlockStack>
      <Heading as="h3">Income</Heading>
      <BlockStack
        blockType="income"
        addFormField={addFormField}
        delFormField={delFormField}
      >
        {formValues.income.map((formValueItem, idx) => (
          <Block
            formValue={formValueItem}
            blockType="income"
            updateForm={updateForm}
            idx={idx}
            key={`income-${idx}`}
          />
        ))}
      </BlockStack>
      <Heading as="h3">Expenses</Heading>
      <BlockStack
        blockType="expenses"
        addFormField={addFormField}
        delFormField={delFormField}
      >
        {formValues.expenses.map((formValueItem, idx) => (
          <Block
            formValue={formValueItem}
            blockType="expenses"
            updateForm={updateForm}
            idx={idx}
            key={`expenses-${idx}`}
          />
        ))}
      </BlockStack>
      <MainButton bg="primary" onClick={(e) => onCalculateClick(e)}>
        Calculate
      </MainButton>
    </div>
  );
};

export default CalculatorSection;
