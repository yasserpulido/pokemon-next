import styled from "@emotion/styled";
import { colors } from "../theme";

type Props = {
  text: string;
  href: string;
};

export const Anchor = ({ text, href }: Props) => {
  return <AnchorBase href={href}>{text}</AnchorBase>;
};

const AnchorBase = styled.a({
  color: colors.BlueDress,

  "&:active": {
    color: colors.DenimBlue,
  },
});
