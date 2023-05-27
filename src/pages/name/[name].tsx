import { useEffect, useState } from "react";

import { GetStaticProps } from "next";
import Image from "next/image";

import styled from "@emotion/styled";

import { pokemonApi } from "@/apis";
import { Layout } from "@/components";
import { Button } from "@/design-system";
import { useCapitalizeName } from "@/hooks";
import { Pokemon } from "@/types";
import { getPokemonInfo, localFavorites } from "@/utils";

type Props = {
  pokemon: Pokemon;
};

export default function PokemonByNamePage({ pokemon }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const name = useCapitalizeName(pokemon.name);

  useEffect(() => {
    setIsFavorite(localFavorites.isFavorite(pokemon.id));
  }, [pokemon.id]);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <Layout>
      <CardsContainer>
        <MainCard>
          <Image
            src={
              pokemon.sprites.other?.dream_world.front_default ||
              "/no-image.png"
            }
            alt={pokemon.name}
            fill
          />
        </MainCard>
        <ContentCard>
          <Header>
            <h1>{name}</h1>
            <Button
              text={isFavorite ? "Remove from favorites" : "Add to favorites"}
              variant="primary"
              onClick={onToggleFavorite}
            />
          </Header>
          <SecondariesCards>
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <Image
              src={pokemon.sprites.back_default}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <Image
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <Image
              src={pokemon.sprites.back_shiny}
              alt={pokemon.name}
              width={100}
              height={100}
            />
          </SecondariesCards>
        </ContentCard>
      </CardsContainer>
    </Layout>
  );
}

const CardsContainer = styled.div({
  display: "flex",
  border: "1px solid black",
  padding: "1rem",
  margin: "1rem",
  minHeight: "200px",
});

const MainCard = styled.div({
  width: "100%",
  height: "inherit",
  position: "relative",
});

const ContentCard = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const SecondariesCards = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1rem",
  flex: 1,
  alignItems: "center",
});

export const getStaticPaths = async () => {
  const data = await pokemonApi.getPokemons();

  const pokemonName: string[] = data.results.map(
    (pokemon: { name: string; url: string }) => pokemon.name
  );

  return {
    paths: pokemonName.map((name) => ({ params: { name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};
