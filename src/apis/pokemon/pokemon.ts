const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async (id: string) => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  const data = await response.json();
  return data;
};

export const getPokemons = async () => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=151`);
  const data = await response.json();
  return data;
};
