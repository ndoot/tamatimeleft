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
  delFormField: (blockType: string, idx: number) => void;
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
  margin: 0.3rem auto;
  font-size: 1.5rem;
  font-family: "Press Start 2P";

  &:hover {
    cursor: pointer;
  }
`;

const StyledBlockRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDelButton = styled(IconButton)`
  border-radius: 100%;
  border: solid 1px red;
  color: red;
  font-family: "Press Start 2P";
  padding-top: 0.4rem;
  flex: 0 1 40px;
  margin-left: 0.6rem;

  &:hover {
    cursor: pointer;
  }
`;

const StyledPhantomDel = styled.div`
  padding-top: 0.4rem;
  flex: 0 1 40px;
  margin-left: 0.6rem;
`;

const BlockStack = (props: Props) => {
  const { blockType, formValues, handleChange, addFormField, delFormField } =
    props;

  const handleAddClick = (e: MouseEvent) => {
    e.preventDefault();
    addFormField(blockType);
  };

  const handleDelClick = (e: MouseEvent, idx: number) => {
    e.preventDefault();
    delFormField(blockType, idx);
  };

  return (
    <StyledBlockStack>
      {formValues.map((formValueItem, idx) => (
        <StyledBlockRow key={`block-${blockType}-${idx}`}>
          <Block
            formValue={formValueItem}
            blockType={blockType}
            handleChange={handleChange}
            idx={idx}
          />
          {idx === 0 ? (
            <StyledPhantomDel></StyledPhantomDel>
          ) : (
            <StyledDelButton onClick={(e) => handleDelClick(e, idx)}>
              -
            </StyledDelButton>
          )}
        </StyledBlockRow>
      ))}
      <StyledAddButton onClick={handleAddClick}>+</StyledAddButton>
    </StyledBlockStack>
  );
};

export default BlockStack;
