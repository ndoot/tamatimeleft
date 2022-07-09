import styled from "@emotion/styled";
import React, { useContext } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Heading, Text } from "theme-ui";
import { expensesCategories } from "../constants";
import reportContext from "./ReportContext";

interface Props {}

const StyledChartSection = styled.div``;

const StyledHeading = styled(Heading)`
  font-size: 1.2rem;
`;

const StyledChartsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledSpecificChart = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

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

  const colors: { [propName: string]: string } = {
    Essential: "#0088FE",
    Variable: "#FFBB28",
    "Non-essential": "#FF8042",
  };

  const gradientColors = [
    "#CC4C33",
    "#D26B47",
    "#D8875C",
    "#DEA070",
    "#E3B785",
    "#E9CB9A",
    "#EEDCAF",
  ];

  return (
    <StyledChartSection>
      <StyledHeading as="h2">Your finances per month</StyledHeading>
      <StyledChartsDiv>
        <StyledSpecificChart>
          <Heading as="h4">Recurring income</Heading>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={report.incomeCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
                nameKey="category"
              >
                {report.incomeCategories.map((entry, idx) => (
                  <Cell
                    key={`income-cell-${idx}`}
                    color={gradientColors[idx % gradientColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </StyledSpecificChart>
        <StyledSpecificChart>
          <Heading as="h4">Recurring expenses</Heading>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={expensesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
                nameKey="category"
              >
                {expensesData.map((entry, idx) => (
                  <Cell
                    key={`expenses-cell-${idx}`}
                    fill={
                      colors[
                        entry.category in expensesCategories
                          ? expensesCategories[entry.category]
                          : "Variable"
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Text>
            {topNonEssential &&
              `Your biggest non-essential expense is $${topNonEssential.total} for ${topNonEssential.category}.`}
          </Text>
          {report.variableExpenses.length > 0 && (
            <>
              <Text>
                {`You could also try reducing spending on these categories:`}
              </Text>
              {report.variableExpenses.slice(0, 3).map((entry) => (
                <Text>{`${entry.category}: $${entry.total}`}</Text>
              ))}
            </>
          )}
        </StyledSpecificChart>
      </StyledChartsDiv>
    </StyledChartSection>
  );
};

export default ChartSection;
