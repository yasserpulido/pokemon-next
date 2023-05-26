import { GetStaticProps } from "next";

import styled from "@emotion/styled";

import { pokemonApi } from "@/apis";
import { Layout } from "@/components/layout";
import { PokemonListResponse, Result } from "@/types";
import { PokemonCard } from "@/components";

type Props = {
  pokemons: Result[];
};

export default function Home({ pokemons }: Props) {
  return (
    <Layout>
      <Container>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response: PokemonListResponse = await pokemonApi.getPokemons();

  const pokemons = response.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

const Container = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
});
