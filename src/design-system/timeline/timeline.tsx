import styled from "@emotion/styled";
import { colors } from "../theme";

type Props = {
  children: React.ReactNode;
};

export const Timeline = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div({
  position: "relative",
  paddingLeft: "4rem",

  "& > div": {
    marginBottom: "1rem",
    height: "200px",
  },

  "& > div:last-child": {
    marginBottom: 0,
  },

  "> div::before": {
    content: '" "',
    backgroundColor: colors.White,
    border: `1px solid ${colors.DoveGrey}`,
    display: "inline-block",
    position: "absolute",
    marginTop: "1rem",
    left: "1.3rem",
    width: "1.5rem",
    height: "1.5rem",
    zIndex: 1,
  },

  "::before": {
    content: '" "',
    backgroundColor: colors.DoveGrey,
    display: "inline-block",
    position: "absolute",
    left: "2rem",
    width: "1px",
    height: "100%",
    zIndex: 1,
  },
});
