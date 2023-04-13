function getRandomColor(character: string): {
  background: string;
  foreground: string;
  character: string;
} {
  const colorWhile = Math.floor(Math.random() * 360);
  return {
    background: `hsl(${colorWhile} 100% 75%)`,
    foreground: `hsl(${colorWhile} 100% 5%)`,
    character: character,
  };
}

export default getRandomColor;
