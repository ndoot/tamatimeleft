import styled from "@emotion/styled";
import { useContext } from "react";
import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Heading, Text } from "theme-ui";
import {
  expensesCategories,
  gradientColors,
  expenseTypeColors,
} from "../constants";
import reportContext from "./ReportContext";
import { CategoryTotal } from "../interfaces";
import ExpensesLegend from "./ExpensesLegend";

interface Props {}

const StyledChartSection = styled.div``;

const StyledHeading = styled(Heading)`
  font-size: 1.2rem;
`;

const StyledChartsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
`;

const StyledSpecificChart = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BiggerText = styled(Text)`
  font-size: 1.2rem;
`;

export const getExpensesType = (entry: CategoryTotal) => {
  let type = "Other";
  if (entry.category && entry.category in expensesCategories) {
    switch (expensesCategories[entry.category]) {
      case "Essential":
        type = "Needs";
        break;
      case "Non-essential":
        type = "Wants";
        break;
      default:
        break;
    }
  }
  return type;
};

const ChartSection = (props: Props) => {
  const { report } = useContext(reportContext);

  const expensesData = report.expensesCategories;
  report.nonEssentialExpenses.sort((a, b) => b.total - a.total);
  report.variableExpenses.sort((a, b) => b.total - a.total);
  const topNonEssential =
    report.nonEssentialExpenses.length > 0
      ? report.nonEssentialExpenses[0]
      : undefined;
  report.incomeCategories.sort((a, b) => b.total - a.total);

  return (
    <StyledChartSection>
      <StyledHeading as="h2">Your finances this month</StyledHeading>

      <StyledChartsDiv>
        <StyledSpecificChart>
          <Heading as="h4">Expenses</Heading>
          {report.expensesCategories.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Legend content={<ExpensesLegend />} />
                  <Pie
                    data={expensesData}
                    cx="50%"
                    cy="45%"
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="total"
                    nameKey="category"
                  >
                    {expensesData.map((entry, idx) => (
                      <Cell
                        key={`expenses-cell-${idx}`}
                        fill={expenseTypeColors[getExpensesType(entry)]}
                      />
                    ))}
                    <LabelList
                      dataKey="category"
                      position="outside"
                      stroke="transparent"
                    />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {topNonEssential && (
                <>
                  <BiggerText>
                    You could reduce your non-essential expenses:
                  </BiggerText>
                  {report.nonEssentialExpenses.slice(0, 3).map((entry, idx) => (
                    <BiggerText key={`nonessential-${idx}`}>
                      <b>{entry.category}</b>
                      {`: $${entry.total}`}
                    </BiggerText>
                  ))}
                </>
              )}
              <br />
              {report.variableExpenses.length > 0 && (
                <>
                  <BiggerText>
                    {`You could also try reducing spending on these categories:`}
                  </BiggerText>
                  {report.variableExpenses.slice(0, 3).map((entry, idx) => (
                    <BiggerText key={`suggestion-${idx}`}>
                      <b>{entry.category}</b>
                      {`: $${entry.total}`}
                    </BiggerText>
                  ))}
                </>
              )}
            </>
          ) : (
            <BiggerText>You do not have any expenses</BiggerText>
          )}
        </StyledSpecificChart>

        <StyledSpecificChart>
          <Heading as="h4">Income</Heading>
          {report.incomeCategories.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={report.incomeCategories}
                    cx="50%"
                    cy="45%"
                    labelLine={false}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="total"
                    nameKey="category"
                  >
                    {report.incomeCategories.map((entry, idx) => (
                      <Cell
                        key={`income-cell-${idx}`}
                        fill={gradientColors[idx % gradientColors.length]}
                      />
                    ))}
                    <LabelList
                      dataKey="category"
                      position="outside"
                      stroke="transparent"
                    />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <BiggerText>
                {`Your greatest income source is $${report.incomeCategories[0].total} for`}{" "}
                <b>{`${report.incomeCategories[0].category}.`}</b>
              </BiggerText>
            </>
          ) : (
            <BiggerText>You do not have any sources of income</BiggerText>
          )}
        </StyledSpecificChart>
      </StyledChartsDiv>
    </StyledChartSection>
  );
};

export default ChartSection;
