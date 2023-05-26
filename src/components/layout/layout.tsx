import Head from "next/head";

import styled from "@emotion/styled";
import { Footerbar, Navbar, maxWidth, mediaQuery } from "@/design-system";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Pokemon Next</title>
        <meta name="author" content="Yasser Barzotto" />
        <meta name="description" content="Information of each Pokemon" />
        <meta name="keywords" content="Pokemon, Next.js, React, TypeScript" />
      </Head>
      <Container>
        <Navbar
          title={{ name: "Pokemon Next", color: "BlueDress", link: "/" }}
          items={[{ name: "Favorites", link: "/favorites" }]}
        />
        <main>{children}</main>
        <Footerbar text="Developed by Yasser Barzotto" />
      </Container>
    </>
  );
};

const Container = styled.div({
  [mediaQuery.large]: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: maxWidth.medium,
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
});
