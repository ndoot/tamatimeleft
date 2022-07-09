import React, { MouseEvent, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Heading } from "theme-ui";
import BlockStack from "./BlockStack";
import { FinanceReport, FormValue } from "../interfaces";
import { defaultFinanceReport, expensesCategories } from "../constants";
import Block from "./Block";
import SavingsBlock from "./SavingsBlock";
import reportContext from "./ReportContext";

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

const CalculatorSection = () => {
  const { report, setReport } = useContext(reportContext);

  const [formValues, setFormValues] = useState<AllFormValues>({
    savings: [{ ...defaultFormValue, blockType: "savings" }],
    income: [{ ...defaultFormValue, blockType: "income" }],
    expenses: [{ ...defaultFormValue, blockType: "expenses" }],
  });

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
    setReport({ ...newReport });
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

    const newReport = {
      ...defaultFinanceReport,
      netPerMonth,
      savings,
      incomePerMonth,
      incomeOneOff,
      expensesPerMonth,
      expensesOneOff,
      savingsPercentage: (netPerMonth / incomePerMonth) * 100,
    };

    if (currentSavings < 0) {
      // dying case
      newReport.dying = true;
      newReport.daysToLive = 0;
    } else if (netPerMonth < 0 || incomePerMonth === 0) {
      // also dying
      newReport.dying = true;
      newReport.daysToLive = calculateDaysToLive(
        currentSavings,
        incomePerMonth,
        expensesPerMonth
      );
    } else {
      // healthy case
      newReport.dying = false;
    }
    newReport.incomeCategories = collectByCategory(formValues.income);
    newReport.expensesCategories = collectByCategory(formValues.expenses);

    // list of non essential expenses
    newReport.nonEssentialExpenses = newReport.expensesCategories.filter(
      (expense) =>
        expense.category in expensesCategories &&
        expensesCategories[expense.category] === "Non-essential"
    );
    // list of variable or other expenses
    newReport.variableExpenses = newReport.expensesCategories.filter(
      (expense) =>
        !(expense.category in expensesCategories) ||
        expensesCategories[expense.category] === "Variable"
    );

    return newReport;
  };

  /**
   * Collects total recurring monthly spend for each category
   */
  const collectByCategory = (allValues: FormValue[]) => {
    const byCategoryDict: { [propName: string]: FormValue[] } = {};
    for (const x of allValues) {
      if (x.frequency === "One-off") continue;
      if (x.category in byCategoryDict) {
        byCategoryDict[x.category].push(x);
      } else {
        byCategoryDict[x.category] = [x];
      }
    }
    return Object.entries(byCategoryDict).map(([key, val]) => ({
      category: key,
      total: sumRecurringFinances(val),
    }));
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

  /**
   * Given report, identify ways that the user can improve spending
   */
  const getSuggestions = (report: FinanceReport) => {
    let messages = [];
    if (report.dying === true) {
      messages.push(
        `Oh no! You are spending $${report.netPerMonth} more than you earn every month.`
      );
    } else {
      messages.push(
        `Congrats! You are currently saving ${report.savingsPercentage.toFixed(
          2
        )}% of your income!`
      );
    }

    // figure out top spending for non-essential categories
    report.nonEssentialExpenses.sort((a, b) => b.total - a.total);
    const topNonEssential = report.nonEssentialExpenses[0];
    messages.push(
      `Your biggest non-essential expense is ${topNonEssential.total} for ${topNonEssential.category}`
    );

    report.variableExpenses.sort((a, b) => b.total - a.total);
    messages.push(`You can also think about`);

    return messages;
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
