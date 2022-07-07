import type { CSSProperties, FC } from "react";
import { memo } from "react";
import happycat from './assets/test.png'; 

const styles: CSSProperties = {
  cursor: "move",
  width: "50px",
  height: "50px"
};

export interface BoxProps {
  title: string;
  preview?: boolean;
}

export const Box: FC<BoxProps> = memo(function Box({ title, preview }) {
  return (
    <div
      style={{ ...styles }}
      role={preview ? "BoxPreview" : "Box"}
    >
      <img src={happycat} alt={title} width={300} height={300}></img>
    </div>
  );
});
