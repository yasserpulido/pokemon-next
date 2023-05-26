import styled from "@emotion/styled";

import { colors } from "../theme/colors";
import { Anchor } from "../anchor";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  date: string;
  description: string;
  readMoreLink?: string;
};

export const Item = ({ description, title, date, readMoreLink }: Props) => {
  const [shortDescription, setShortDescription] = useState<string>(description);

  useEffect(() => {
    if (description.length > 200) {
      const result = description.substring(0, 200) + "...";
      setShortDescription(result);
    }
  }, [description]);

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Date>{date}</Date>
      </Header>
      <Description>{shortDescription}</Description>
      {readMoreLink !== undefined && readMoreLink.length > 0 && (
        <Footer>
          <Anchor href={readMoreLink} text="Read more" />
        </Footer>
      )}
    </Container>
  );
};

const Container = styled.div({
  border: `1px solid ${colors.DoveGrey}`,
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Header = styled.div({
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem",
});

const Title = styled.span({
  marginBottom: "0.5rem",
});

const Date = styled.span({
  fontWeight: "bold",
  fontSize: "0.8rem",
});

const Description = styled.p({
  textAlign: "end",
  lineHeight: "1.2rem",
});

const Footer = styled.div({
  textAlign: "end",
});
