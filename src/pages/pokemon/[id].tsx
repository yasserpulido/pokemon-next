import { pokemonApi } from "@/apis";
import { Layout } from "@/components";
import { Button } from "@/design-system";
import { useCapitalizeName } from "@/hooks";
import { Pokemon } from "@/types";
import styled from "@emotion/styled";
import { GetStaticProps } from "next";
import Image from "next/image";

type Props = {
  pokemon: Pokemon;
};

export default function PokemonPage({ pokemon }: Props) {
  const name = useCapitalizeName(pokemon.name);

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
            width={200}
            height={200}
          />
        </MainCard>
        <ContentCard>
          <Header>
            <h1>{name}</h1>
            <Button text="Favorite" variant="primary" />
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
});

const MainCard = styled.div({});

const ContentCard = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
});

export const getStaticPaths = async () => {
  const pokemons151 = [...Array(151)].map((_, i) => (i + 1).toString());

  return {
    paths: pokemons151.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const response: Pokemon = await pokemonApi.getPokemon(id);

  return {
    props: {
      pokemon: response,
    },
  };
};
