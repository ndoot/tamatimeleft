import styled from "@emotion/styled";
import React from "react";
import Modal, { OnAfterOpenCallback } from "react-modal";
import { Button, Heading, Text } from "theme-ui";

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
  border: 5px solid ${(props) => props.theme.colors?.primary};
  box-shadow: -5px 0 0 0 black, 5px 0 0 0 black, 0 -5px 0 0 black,
    0 5px 0 0 black;

  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s linear;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 1rem auto;
  width: 100px;
  &:hover {
    background-color: ${(props) => props.theme.colors?.secondary};
    cursor: pointer;
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
      <Text>Lorem ipsum I guess</Text>
      <StyledButton onClick={(e) => onRequestClose(e)}>Close</StyledButton>
    </StyledModal>
  );
};

export default InstructionsModal;
