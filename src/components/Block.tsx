import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Card, Heading, Input, Select } from "theme-ui";
import { theme } from "../theme";

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
`


const Block = (props: Props) => {
  const {
    type
  } = props;
  let inputType = '';
  if (type === "income") {
    inputType = "Source"
  } else if (type === "expenses") {
    inputType = "Category"
  }
  return (
    <div className="Block">
      <Card>
        <EachBox as="form" onSubmit={(e) => e.preventDefault()}>
          <EachField>
            <StyledInput placeholder={inputType} ></StyledInput>
          </EachField>
          <EachField>
            <StyledInput placeholder="Amount" type="number"></StyledInput>
          </EachField>
          <EachField>
            <StyledSelect defaultValue="yo">
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
