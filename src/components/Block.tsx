import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { Box, Card, Input, Select } from "theme-ui";
import { theme } from "../theme";
import { FormValue } from "../interfaces";

interface Props {
  blockType: string;
  formValue: FormValue;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    blockType: string,
    idx: number
  ) => void;
  idx: number;
}

const EachBox = styled(Box)`
  width: auto;
  height: 60px;
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  border: 1px solid black;
  font-family: "Press Start 2P";
`;

const StyledInput = styled(Input)`
  width: 95%;
  height: 40px;
  font-family: "Press Start 2P";
`;

const StyledSelect = styled(Select)`
  height: 40px;
  font-family: "Press Start 2P";
`;

const EachField = styled.div`
  padding: 10px;
  height: 30px;
  width: 100%;
`;

const Block = (props: Props) => {
  const { blockType, formValue, handleChange, idx } = props;

  let inputType = "";
  if (blockType === "income") {
    inputType = "Source";
  } else if (blockType === "expenses") {
    inputType = "Category";
  }

  return (
    <div className="Block">
      <Card>
        <EachBox as="form" onSubmit={(e) => e.preventDefault()}>
          <EachField>
            <StyledInput
              placeholder={inputType}
              value={formValue.category}
              name="category"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, blockType, idx)
              }
            ></StyledInput>
          </EachField>
          <EachField>
            <StyledInput
              placeholder="Amount"
              type="number"
              value={formValue.amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, blockType, idx)
              }
              name="amount"
            ></StyledInput>
          </EachField>
          <EachField>
            <StyledSelect
              value={formValue.frequency}
              name="frequency"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChange(e, blockType, idx)
              }
            >
              <option>One-off</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Fortnightly</option>
              <option>Monthly</option>
            </StyledSelect>
          </EachField>
        </EachBox>
      </Card>
    </div>
  );
};

export default Block;
