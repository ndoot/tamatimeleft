import styled from "@emotion/styled";
import React, { useState } from "react";
import { Button, IconButton } from "theme-ui";
import Block from "./Block";

interface Props {
  blockType: string;
}

interface FormValue {
  category: string;
  amount: number;
  frequency: string;
}

const defaultFormValue: FormValue = {
  category: "",
  amount: 0.0,
  frequency: "weekly",
};

const StyledBlockStack = styled.div`
  width: 100%;
  display: grid;
  margin-left: 1rem;
  margin-right: 1rem;
  font-family: "Press Start 2P";
`;

const StyledAddButton = styled(IconButton)``;

const BlockStack = (props: Props) => {
  const { blockType } = props;

  const [formValues, setFormValues] = useState([defaultFormValue]);

  const handleChange = (idx: number) => {
    const newFormValues = [...formValues];
    // newFormValues[idx][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormField = () => {
    setFormValues([...formValues, defaultFormValue]);
  };

  const removeFormField = (idx: number) => {
    const newFormValues = [...formValues];
    newFormValues.splice(idx, 1);
    setFormValues(newFormValues);
  };

  return (
    <StyledBlockStack>
      {formValues.map((formValueItem, idx) => (
        <Block blockType={blockType} />
      ))}
      <StyledAddButton>+</StyledAddButton>
    </StyledBlockStack>
  );
};

export default BlockStack;
