import styled from "@emotion/styled";
import React, { JSXElementConstructor, ReactElement } from "react";
import { Text } from "theme-ui";

interface Props {
  children?:
    | ReactElement<any, string | JSXElementConstructor<any>>[]
    | string
    | number;
}

const StyledSpeechBubble = styled.div`
  position: relative;
  width: 30%;
  max-width: 300px;
  text-align: center;
  background-color: #fff;
  border: 5px solid #333;
  border-radius: 16px;
  padding: 20px;
  left: -250px;
  bottom: -80px;

  &:before,
  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
  }
  &:before {
    right: 30px;
    bottom: -40px;
    border: 20px solid;
    border-color: #333 #333 transparent transparent;
  }

  &:after {
    right: 36px;
    bottom: -25px;
    border: 15px solid;
    border-color: #fff #fff transparent transparent;
  }
`;

const SpeechBubble = (props: Props) => {
  const { children } = props;

  return (
    <StyledSpeechBubble>
      <Text>{children}</Text>
    </StyledSpeechBubble>
  );
};

export default SpeechBubble;
