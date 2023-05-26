import { ReactNode, useEffect, useRef, useState } from "react";

import styled from "@emotion/styled";

import { Heading } from "../heading";

type Props = {
  header: string;
  content: ReactNode;
  children: ReactNode;
};

const Modal = ({ header, content, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  return (
    <Background>
      <Container ref={ref} width={width} height={height}>
        <Header>
          <Heading size="h6">{header}</Heading>
        </Header>
        <Content>
          <p>{content}</p>
        </Content>
        <Footer>{children}</Footer>
      </Container>
    </Background>
  );
};

const Background = styled.div({
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.2)",
  zIndex: 1000,
  cursor: "pointer",
});

type ContainerProps = {
  width: number;
  height: number;
};

const Container = styled.div<ContainerProps>(({ width, height }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "30rem",
  height: "fit-content",
  margin: `-${height / 2}px 0 0 -${width / 2}px`,
  display: "flex",
  flexDirection: "column",
  pointerEvents: "auto",
  backgroundColor: "#fff",
  backgroundClip: "padding-box",
  border: "1px solid black",
  outline: "0",
}));

const Header = styled.div({
  padding: "1rem 1rem 0.5rem 1rem",
  fontWeight: "bold",
});

const Content = styled.div({
  padding: "0.5rem 1rem 0.5rem 1rem",
});

const Footer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0.5rem 1rem 1rem 1rem",
  gap: "1rem",
});

export default Modal;
