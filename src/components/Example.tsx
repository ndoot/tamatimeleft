import type { FC } from "react";

import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";

const Example: FC = () => {
  return (
    <div>
      <Container />
      <CustomDragLayer />
    </div>
  );
};

export default Example;