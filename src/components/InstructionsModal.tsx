import styled from "@emotion/styled";
import React from "react";
import Modal, { OnAfterOpenCallback } from "react-modal";
import { Button, Heading, Text } from "theme-ui";
import sleepcat from "./assets/sleepcat.gif";
import PixelButton from "./PixelButton";

interface Props {
  isOpen: boolean;
  onAfterOpen?: OnAfterOpenCallback | undefined;
  onRequestClose(event: React.MouseEvent | React.KeyboardEvent): void;
}

const StyledModal = styled(Modal)`
  width: 80%;
  max-width: 600px;
  max-height: 90vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: centre;
  background-color: ${(props) => props.theme.colors?.background};
  border: 5px solid ${(props) => props.theme.colors?.primary};
  box-shadow: -5px 0 0 0 black, 5px 0 0 0 black, 0 -5px 0 0 black,
    0 5px 0 0 black;
  overflow: auto;

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
  width: fit-content;
  border: 3px solid black;
  &:hover {
    background-color: ${(props) => props.theme.colors?.secondary};
    cursor: pointer;
  }
`;

const BiggerText = styled(Text)`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

const StyledText = styled(Text)`
  margin-bottom: 0.3rem;
`;

const StyledCat = styled.div``;

const StyledImgAndText = styled.div`
  display: flex;
  align-items: center;
`;

const Subheading = styled(Heading)`
  margin: 1.3rem auto 0.4rem auto;
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
      <Heading>Meet Gerald</Heading>
      <StyledImgAndText>
        <BiggerText>
          Gerald is a mystical pixel cat living in the Cat-culator. Gerald's
          hobbies include napping, munching on salmon, and admiring bonsai
          trees.
        </BiggerText>
        <StyledCat>
          <img src={sleepcat} alt="Gerald the cat asleep" width={"100%"} />
        </StyledCat>
      </StyledImgAndText>
      <BiggerText>Now, the fate of Gerald lies in YOUR hands.</BiggerText>
      <Subheading as="h3">How it works</Subheading>
      <StyledText>
        The Savings Cat-culator takes in your <b>Savings</b>, <b>Income</b> and{" "}
        <b>Expenses</b>.
      </StyledText>
      <StyledText>
        The more your earnings exceeds your spending, the more <b>Cat Coins</b>{" "}
        you will collect to spend on items for Gerald to enjoy!
      </StyledText>
      <StyledText>
        But <b>beware</b>. If you spend more than you earn, Gerald may not
        survive for much longer ;-;
      </StyledText>
      <StyledButton onClick={(e) => onRequestClose(e)}>
        Start budgeting
      </StyledButton>
      <PixelButton onClick={(e) => onRequestClose(e)}>
        Start budgeting
      </PixelButton>
    </StyledModal>
  );
};

export default InstructionsModal;
