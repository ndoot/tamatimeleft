import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Card, Heading, Input, Select } from "theme-ui";
import { theme } from "../theme";
import { AutoComplete } from "./Autocomplete";

interface Props {
  type: string;
}

const EachBox = styled(Box)`
  width: auto;
  height: 60px;
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  border: 1px solid black;
  border-radius: 10px;
  background-color: ${theme.colors?.muted};
  font-family: "Press Start 2P";
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  background-color: white;
  width: 100%;
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
`


const Block = (props: Props) => {
  const {
    type
  } = props;
  let inputType = '';
  let data : Array<Object> = [];
  if (type === "income") {
    inputType = "Source";
    data = [
      { "name": "Work" },
      { "name": "Centrelink" }, 
    ];

  } else if (type === "expenses") {
    inputType = "Category";
    data = [
      { "name": "Entertainment" },
      { "name": "Rent" }, 
      { "name": "Utilities" }, 
      { "name": "Food" }, 
      { "name": "Internet" }, 
      { "name": "Water" }, 
      { "name": "Electricity" }, 
      { "name": "Clothing" }, 
      { "name": "Health Insurance" }, 
      { "name": "Life Insurance" }, 
      { "name": "Household Items" }, 
      { "name": "Haircuts" }, 
      { "name": "Credit Card" }, 
      { "name": "Investing" }, 
      { "name": "Loan Payment" }, 
      { "name": "Gifts" }, 
      { "name": "Charity" }, 
      { "name": "Alcohol" }, 
      { "name": "Subscriptions" }, 
    ];
  }
  return (
    <div className="Block">
      <Card>
        <EachBox as="form" onSubmit={(e) => e.preventDefault()}>
          <EachField>
          <AutoComplete
            optionsStyle={{ backgroundColor: "white" }}
            inputType = {inputType}
            data={data}
          />
          </EachField>
          <EachField>
            <StyledInput placeholder="Amount" type="number"></StyledInput>
          </EachField>
          <EachField>
            <StyledSelect>
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
