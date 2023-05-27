import { useEffect, useState } from "react";

import { Layout } from "@/components";
import { localFavorites } from "@/utils";
import { PokemonFavorite } from "@/components/pokemon";
import styled from "@emotion/styled";

export default function FavoritePage() {
  const [favoritePokemons, setFavoritePokemons] = useState<Array<number>>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons);
  }, []);

  if (favoritePokemons.length === 0) {
    return (
      <Layout>
        <NoFound>No pokemons found.</NoFound>
      </Layout>
    );
  }

  return (
    <Layout>
      <PokemonFavorite favoritePokemons={favoritePokemons} />
    </Layout>
  );
}

const NoFound = styled.div({
  marginTop: "2rem",
  textAlign: "center",
});
