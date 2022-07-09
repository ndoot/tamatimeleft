import styled from "@emotion/styled";
import Block from "./Block";
import React, { JSXElementConstructor, MouseEvent, ReactElement } from "react";
import { IconButton } from "theme-ui";

interface Props {
  blockType: string;
  addFormField: (blockType: string) => void;
  delFormField: (blockType: string, idx: number) => void;
  children: ReactElement<any, string | JSXElementConstructor<any>>[];
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
  margin: auto;
  margin-bottom: 0.5rem;
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
  width: 30px;
  height: 30px;
  margin-left: 0.6rem;
  margin-top: -0.2rem;

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
  const { blockType, children, addFormField, delFormField } = props;

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
      {children.map((element, idx) => (
        <StyledBlockRow key={`block-${blockType}-${idx}`}>
          {element}
          {idx === 0 ? (
            <StyledPhantomDel></StyledPhantomDel>
          ) : (
            <StyledDelButton onClick={(e) => handleDelClick(e, idx)}>
              -
            </StyledDelButton>
          )}
        </StyledBlockRow>
      ))}
      <StyledAddButton onClick={(e) => handleAddClick(e)}>+</StyledAddButton>
    </StyledBlockStack>
  );
};

export default BlockStack;
