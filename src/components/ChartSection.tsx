import styled from "@emotion/styled";
import React, { useContext } from "react";
import {
  Cell,
  Legend,
  LegendProps,
  Pie,
  PieChart,
  PieLabel,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Heading, Text } from "theme-ui";
import {
  expensesCategories,
  gradientColors,
  expenseTypeColors,
} from "../constants";
import reportContext from "./ReportContext";
import { CategoryTotal } from "../interfaces";
import { Payload } from "recharts/types/component/DefaultLegendContent";
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
  const {} = props;

  const { report } = useContext(reportContext);

  const expensesData = report.expensesCategories;
  report.nonEssentialExpenses.sort((a, b) => b.total - a.total);
  report.variableExpenses.sort((a, b) => b.total - a.total);
  const topNonEssential =
    report.nonEssentialExpenses.length > 0
      ? report.nonEssentialExpenses[0]
      : undefined;
  report.incomeCategories.sort((a, b) => b.total - a.total);

  // const renderExpensesLegend = (props: LegendProps) => {
  //   const { payload } = props;
  //   return (
  //     <ul>
  //       {payload?.map((entry, idx) => (
  //         <li key={`item-${idx}`}>{getExpensesType(entry)}</li>
  //       ))}
  //     </ul>
  //   );
  // };

  return (
    <StyledChartSection>
      <StyledHeading as="h2">Your finances per month</StyledHeading>

      <StyledChartsDiv>
        <StyledSpecificChart>
          <Heading as="h4">Recurring expenses</Heading>
          {report.expensesCategories.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Legend content={<ExpensesLegend />} />
                  <Pie
                    data={expensesData}
                    cx="50%"
                    cy="50%"
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
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {topNonEssential && (
                <>
                  <Text>You could reduce your non-essential expenses:</Text>
                  {report.nonEssentialExpenses.slice(0, 3).map((entry, idx) => (
                    <Text key={`nonessential-${idx}`}>
                      <b>{entry.category}</b>
                      {`: $${entry.total}`}
                    </Text>
                  ))}
                </>
              )}
              <br />
              {report.variableExpenses.length > 0 && (
                <>
                  <Text>
                    {`You could also try reducing spending on these categories:`}
                  </Text>
                  {report.variableExpenses.slice(0, 3).map((entry, idx) => (
                    <Text key={`suggestion-${idx}`}>
                      <b>{entry.category}</b>
                      {`: $${entry.total}`}
                    </Text>
                  ))}
                </>
              )}
            </>
          ) : (
            <Text>You do not have any expenses</Text>
          )}
        </StyledSpecificChart>

        <StyledSpecificChart>
          <Heading as="h4">Recurring income</Heading>
          {report.incomeCategories.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={report.incomeCategories}
                    cx="50%"
                    cy="50%"
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
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Text>
                {`Your greatest income source is $${report.incomeCategories[0].total} for ${report.incomeCategories[0].category}.`}
              </Text>
            </>
          ) : (
            <Text>You do not have any sources of income</Text>
          )}
        </StyledSpecificChart>
      </StyledChartsDiv>
    </StyledChartSection>
  );
};

export default ChartSection;
