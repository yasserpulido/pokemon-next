export const useCapitalizeName = (name: string) => {
  const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
  return capitalizeName;
};
