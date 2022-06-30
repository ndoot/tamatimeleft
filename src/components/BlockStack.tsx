import styled from "@emotion/styled";
import React, { ChangeEvent, MouseEvent } from "react";
import { IconButton } from "theme-ui";
import { theme } from "../theme";
import Block from "./Block";
import { FormValue } from "../interfaces";

interface Props {
  blockType: string;
  formValues: FormValue[];
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    blockType: string,
    idx: number
  ) => void;
  addFormField: (blockType: string) => void;
}

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
  const { blockType, formValues, handleChange, addFormField } = props;

  const handleAddClick = (e: MouseEvent) => {
    e.preventDefault();
    addFormField(blockType);
  };

  return (
    <StyledBlockStack>
      {formValues.map((formValueItem, idx) => (
        <Block
          formValue={formValueItem}
          blockType={blockType}
          handleChange={handleChange}
          idx={idx}
          key={`block-${idx}`}
        />
      ))}
      <StyledAddButton onClick={handleAddClick}>+</StyledAddButton>
    </StyledBlockStack>
  );
};

export default BlockStack;
