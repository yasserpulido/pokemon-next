import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  favoritePokemons: Array<number>;
};

export const PokemonFavorite = ({ favoritePokemons }: Props) => {
  const router = useRouter();

  const handleOnClick = (pokemon: number) => {
    router.push(`/pokemon/${pokemon}`);
  };

  return (
    <Container>
      {favoritePokemons.map((pokemon) => (
        <ImageContainer key={pokemon} onClick={() => handleOnClick(pokemon)}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon}.svg`}
            width={200}
            height={200}
            alt={pokemon.toString()}
          />
        </ImageContainer>
      ))}
    </Container>
  );
};

const Container = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
});

const ImageContainer = styled.div({
  border: "1px solid #000",
  textAlign: "center",
  padding: "1rem",
  
  ":hover": {
    boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.2)",
  },
});
