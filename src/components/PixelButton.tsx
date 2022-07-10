import styled from "@emotion/styled";
import React, { MouseEventHandler, ReactNode } from "react";

interface Props {
  children?: ReactNode | string | number;
  onClick?: MouseEventHandler | undefined;
}

/**
 * Styling from https://codepen.io/YoannM/pen/yyExEO
 */
const StyledButton = styled.div`
  font-family: "Quantico";
  color: white;
  margin: auto;
  position: relative;
  display: inline-block;
  width: fit-content;
  vertical-align: top;

  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  line-height: 0;

  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */

  border-style: solid;
  border-width: 20px;
  -moz-border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;
  -webkit-border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;
  -o-border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;
  border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;

  &:active {
    top: 2px;
  }
  & > p {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: auto;
    text-align: center;
    margin: -20px -20px;
    line-height: 20px;
    padding: 10px 20px;

    background: #000000;
    background: linear-gradient(135deg, transparent 10px, #000000 0) top left,
      linear-gradient(225deg, transparent 10px, #000000 0) top right,
      linear-gradient(315deg, transparent 10px, #000000 0) bottom right,
      linear-gradient(45deg, transparent 10px, #000000 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    background-image: radial-gradient(
        circle at 0 0,
        rgba(204, 0, 0, 0) 14px,
        #000000 15px
      ),
      radial-gradient(circle at 100% 0, rgba(204, 0, 0, 0) 14px, #000000 15px),
      radial-gradient(
        circle at 100% 100%,
        rgba(204, 0, 0, 0) 14px,
        #000000 15px
      ),
      radial-gradient(circle at 0 100%, rgba(204, 0, 0, 0) 14px, #000000 15px);
  }
`;

const PixelButton = (props: Props) => {
  const { children, onClick } = props;
  return (
    <StyledButton onClick={onClick}>
      <p>{children}</p>
    </StyledButton>
  );
};

export default PixelButton;
