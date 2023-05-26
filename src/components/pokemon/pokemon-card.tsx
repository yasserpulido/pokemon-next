import Image from "next/image";

import { Card } from "@/design-system";
import { Result } from "@/types";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

type Props = {
  pokemon: Result;
};

export const PokemonCard = ({ pokemon }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <CardContainer onClick={handleClick}>
      <Card key={pokemon.id} title={capitalizeName(pokemon.name)}>
        <CardContent>
          <Image
            src={pokemon.img}
            alt={pokemon.name}
            width={200}
            height={200}
          />
        </CardContent>
      </Card>
    </CardContainer>
  );
};

const CardContainer = styled.div({
  ":hover": {
    boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.2)",
  },
});

const CardContent = styled.div({
  display: "flex",
  justifyContent: "center",
});
