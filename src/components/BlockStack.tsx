import styled from "@emotion/styled";
import Block from "./Block";
import React, { JSXElementConstructor, MouseEvent, ReactElement } from "react";
import { IconButton, Text } from "theme-ui";

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
  background-color: ${(props) => props.theme.colors?.muted};

  &:hover {
    cursor: pointer;
    background-color: black;
    color: ${(props) => props.theme.colors?.muted};
  }
`;

const StyledBlockRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDelButton = styled(IconButton)`
  border-radius: 10px;
  border: solid 1px ${(props) => props.theme.colors?.primary};
  color: ${(props) => props.theme.colors?.primary};
  font-family: "Press Start 2P";
  padding-top: 0.3rem;
  flex: 0 1 40px;
  width: 30px;
  height: 30px;
  margin-left: 0.6rem;
  margin-top: -0.3rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors?.primary};
    color: ${(props) => props.theme.colors?.background};
  }
`;

const StyledPhantomDel = styled.div`
  padding-top: 0.4rem;
  flex: 0 1 40px;
  margin-left: 0.6rem;
`;

const StyledText = styled(Text)`
  font-family: Quantico;
  text-align: center;
  display: block;
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
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
          <StyledDelButton onClick={(e) => handleDelClick(e, idx)}>
            -
          </StyledDelButton>
        </StyledBlockRow>
      ))}
      {children.length === 0 && <StyledText>Add an entry!</StyledText>}
      <StyledAddButton onClick={(e) => handleAddClick(e)}>+</StyledAddButton>
    </StyledBlockStack>
  );
};

export default BlockStack;
