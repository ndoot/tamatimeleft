import type { CSSProperties, FC } from "react";
import { memo } from "react";
import fish from './assets/fish.png'; 

const styles: CSSProperties = {
  cursor: "move",
  width: "50px",
  height: "50px"
};

export interface BoxProps {
  title: string;
  preview?: boolean;
}
interface Items {
  [propName: string]: any;
}
const items: Items = {
  "fish": [fish, 50, 50]
}

export const Box: FC<BoxProps> = memo(function Box({ title, preview }) {
  return (
    <div
      style={{ ...styles }}
      role={preview ? "BoxPreview" : "Box"}
    >
      <img src={items[title][0]} alt={title} width={items[title][1]} height={items[title][2]}></img>
    </div>
  );
});
