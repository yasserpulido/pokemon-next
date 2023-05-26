import styled from "@emotion/styled";

type Props = {
  text: string;
};

export const Footerbar = ({ text }: Props) => {
  return (
    <Footer>
      <p>{text}</p>
    </Footer>
  );
};

const Footer = styled.footer({
  textAlign: "center",
  padding: "1rem",
  marginTop: "auto",
});
