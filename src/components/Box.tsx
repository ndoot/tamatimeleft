import type { FC } from "react";
import { memo } from "react";
import { items } from "./Items";
import styled from "@emotion/styled";

const StyledBox = styled.div`
  cursor: move;
  width: 50px;
  height: 50px;
`

export interface BoxProps {
  title: string;
  preview?: boolean;
}


export const Box: FC<BoxProps> = memo(function Box({ title, preview }) {
  return (
    <StyledBox role={preview ? "BoxPreview" : "Box"} >
      <img src={items[title]["src"]} alt={title} width={items[title]["width"]} height={items[title]["height"]}></img>
    </StyledBox>
  );
});
