function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomCombinations() {
  const alphabets = "abcdefghijklmnopqrstuvwxyz1234567890";
  const index1 = getRandomInt(0, alphabets.length - 1);
  const index2 = getRandomInt(0, alphabets.length - 1);
  const index3 = getRandomInt(0, alphabets.length - 1);
  const randomCombinations = [
    alphabets[index1],
    alphabets[index2],
    alphabets[index3],
  ];
  const result = randomCombinations.join("");
  return result;
}

export default generateRandomCombinations;
