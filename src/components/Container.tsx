import update from "immutability-helper";
import type { CSSProperties, FC } from "react";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { DraggableBox } from "./DraggableBox";
import type { DragItem } from "./interfaces";
import { ItemTypes } from "./ItemTypes";

const StyledCatSection = styled.div`
    margin-top: -500px;
    height: 500px;
    align-items: center;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `

const styles: CSSProperties = {
  width: 300,
  height: 300,
  border: "1px solid black",
  position: "relative"
};

interface BoxMap {
  [key: string]: { top: number; left: number; title: string };
}

export const Container: FC = () => {
  const [boxes, setBoxes] = useState<BoxMap>({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" }
  });

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      );
    },
    [boxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);

        moveBox(item.id, left, top);
        return undefined;
      }
    }),
    [moveBox]
  );

  return (
    <StyledCatSection ref={drop}>
      {Object.keys(boxes).map((key) => (
        <DraggableBox
          key={key}
          id={key}
          {...(boxes[key] as { top: number; left: number; title: string })}
        />
      ))}
    </StyledCatSection>
  );
};
