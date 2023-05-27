import { pokemonApi } from "@/apis";
import { Pokemon } from "@/types";

export const getPokemonInfo = async (nameOrId: string) => {
  const response: Pokemon = await pokemonApi.getPokemon(nameOrId);

  return {
    id: response.id,
    name: response.name,
    sprites: response.sprites,
  };
};
