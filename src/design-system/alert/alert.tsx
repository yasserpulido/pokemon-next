import { useEffect } from "react";

import styled from "@emotion/styled";
import { FormClose } from "grommet-icons";

import { maxWidth, mediaQuery } from "../theme";
import { colors } from "../theme/colors";

type AlertProps = {
  status: {
    type: "success" | "error";
    text: string;
  };
  reset: () => void;
};

const Alert = ({ status, reset }: AlertProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      reset();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [reset]);

  return (
    <Container>
      <Content status={status.type}>
        <Text>{status.text}</Text>
        <IconContainer>
          <FormClose color={colors.White} onClick={reset} />
        </IconContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  padding: "20px",
  textAlign: "center",
  width: "100%",
});

type ContentProps = {
  status: string;
};

const Content = styled.div<ContentProps>(({ status }) => ({
  backgroundColor: status === "success" ? colors.GreenBlue : colors.PersianRed,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  margin: "0 auto",

  [mediaQuery.large]: {
    maxWidth: maxWidth.large,
  },
}));

const Text = styled.p({
  fontSize: "1rem",
  color: colors.White,
});

const IconContainer = styled.div({
  cursor: "pointer",
});

export default Alert;
