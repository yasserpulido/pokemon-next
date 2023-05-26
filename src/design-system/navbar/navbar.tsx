import NextLink from "next/link";

import styled from "@emotion/styled";
import { colors } from "../theme";

type Item = {
  name: string;
  link: string;
};

type Title = {
  name: string;
  color?: keyof typeof colors;
  link: string;
};

type Props = {
  title: Title;
  items?: Item[];
};

export const Navbar = ({
  title: { color = "Black", ...title },
  items = [],
}: Props) => {
  return (
    <Nav>
      <Title color={color} href="/">
        {title.name}
      </Title>
      <NavList>
        {items.map((item) => (
          <NavItem key={item.name}>
            <Link href={item.link} passHref>{item.name}</Link>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

const Nav = styled.nav(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1.5rem",
}));

type TitleProps = {
  color: keyof typeof colors;
};

const Title = styled.a(({ color }: TitleProps) => ({
  fontWeight: "bold",
  color: colors[color],
  textDecoration: "none",
}));

const NavList = styled.ul(() => ({
  display: "flex",
  listStyle: "none",
  gap: "1rem",
}));

const NavItem = styled.li(() => ({}));

const Link = styled(NextLink)(() => ({
  textDecoration: "none",
  color: colors.DoveGrey,

  "&:hover": {
    color: colors.Black,
  },
}));
