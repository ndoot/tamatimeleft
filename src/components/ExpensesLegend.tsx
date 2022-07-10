import styled from "@emotion/styled";
import React from "react";
import { Text } from "theme-ui";
import { expenseTypeColors } from "../constants";

interface Props {}

const StyledExpensesLegend = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  left: 5px;
  bottom: 5px;
`;

const LegendList = styled.ul`
  padding: 0px;
  margin: 0px;
  text-align: center;
`;

const LegendItem = styled.li`
  display: inline-block;
  margin-right: 10px;
  color: ${(props) => props.color};
`;

const LegendSquare = styled.svg`
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
`;

const ExpensesLegend = (props: Props) => {
  const {} = props;

  return (
    <StyledExpensesLegend>
      <LegendList>
        {Object.entries(expenseTypeColors).map(([type, color]) => (
          <LegendItem key={`legend-item-${type}`} color={color}>
            <LegendSquare width="14" height="14" viewBox="0 0 32 32">
              <path stroke="none" fill={color} d="M0,4h32v24h-32z"></path>
            </LegendSquare>
            <Text>{type}</Text>
          </LegendItem>
        ))}
      </LegendList>
    </StyledExpensesLegend>
  );
};

export default ExpensesLegend;
