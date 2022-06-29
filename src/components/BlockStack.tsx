import styled from "@emotion/styled";
import React, {
  BaseSyntheticEvent,
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import { Button, IconButton } from "theme-ui";
import { theme } from "../theme";
import Block from "./Block";
import { FormValue } from "../interfaces";

interface Props {
  blockType: string;
}

const defaultFormValue: FormValue = {
  category: "",
  amount: undefined,
  frequency: "weekly",
};

const StyledBlockStack = styled.div`
  width: 100%;
  display: grid;
  row-gap: 0.6rem;
  font-family: "Press Start 2P";
`;

const StyledAddButton = styled(IconButton)`
  border: solid 1px black;
  padding: 1rem 1.8rem 0.8rem 1.8rem;
  margin: 0.6rem auto;
  font-size: 1.5rem;
  font-family: "Press Start 2P";

  &:hover {
    cursor: pointer;
  }
`;

const BlockStack = (props: Props) => {
  const { blockType } = props;

  const [formValues, setFormValues] = useState([defaultFormValue]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newFormValues = [...formValues];
    newFormValues[idx][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (
    e: ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    const newFormValues = [...formValues];
    newFormValues[idx][e.target.name] = e.target.value;
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
        <Block
          formValue={formValueItem}
          blockType={blockType}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          idx={idx}
          key={`block-${idx}`}
        />
      ))}
      <StyledAddButton onClick={addFormField}>+</StyledAddButton>
    </StyledBlockStack>
  );
};

export default BlockStack;
