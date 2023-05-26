import { useState } from "react";

import styled from "@emotion/styled";
import { Add } from "grommet-icons";

import { colors } from "../theme";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Panel = ({ children, title }: Props) => {
  const [panelIsOpen, setPanelIsOpen] = useState<boolean>(false);
  
  return (
    <Container>
      <Header onClick={() => setPanelIsOpen(!panelIsOpen)}>
        <Title>{title}</Title>
        <Add size="small" color="white" />
      </Header>
      {panelIsOpen && <Content>{children}</Content>}
    </Container>
  );
};

const Container = styled.div({
  width: "100%",
});

const Header = styled.div({
  alignItems: "center",
  color: colors.White,
  backgroundColor: colors.DoveGrey,
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem 1rem",
  cursor: "pointer",
});

const Title = styled.span({
  textTransform: "uppercase",
});

const Content = styled.div({
  border: `1px solid ${colors.DoveGrey}`,
  borderTop: "none",
  padding: "1rem",
});

export default Panel;
