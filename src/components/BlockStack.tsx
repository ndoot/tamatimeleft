import React from "react";
import styled from "@emotion/styled";
import { Button } from "theme-ui";
import { theme } from "../theme";
import Block from "./Block";

interface Props {}

const StyledBlockStack = styled.div`
  width: 100%;
  display: grid;
  margin-left: 1rem;
  margin-right: 1rem;
  font-family: "Press Start 2P";
`

const BlockStack = (props: Props) => {
  //const {} = props;

  return (
    <div className="BlockStack">
      <StyledBlockStack>
        <Block type="expenses"></Block>
        <Block type="expenses"></Block>
      </StyledBlockStack>
    </div>
  );
};

export default BlockStack;
