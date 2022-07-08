import styled from "@emotion/styled";
import React from "react";
import Modal, { OnAfterOpenCallback } from "react-modal";
import { Button, Heading } from "theme-ui";

interface Props {
  isOpen: boolean;
  onAfterOpen?: OnAfterOpenCallback | undefined;
  onRequestClose(event: React.MouseEvent | React.KeyboardEvent): void;
}

const StyledModal = styled(Modal)`
  width: 80%;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: centre;
  background-color: ${(props) => props.theme.colors?.background};
  -webkit-animation-name: modal-animation;
  -webkit-animation-duration: 0.5s;
  animation-name: modal-animation;
  animation-duration: 0.5s;

  &:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  @-webkit-keyframes modal-animation {
    from {
      top: -100px;
      opacity: 0;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }

  @keyframes modal-animation {
    from {
      top: -100px;
      opacity: 0;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }
`;

const InstructionsModal = (props: Props) => {
  const { isOpen, onAfterOpen, onRequestClose } = props;

  return (
    <StyledModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      contentLabel="Instructions modal"
    >
      <Heading>Instructions</Heading>
      <Button onClick={(e) => onRequestClose(e)}>Close</Button>
    </StyledModal>
  );
};

export default InstructionsModal;
