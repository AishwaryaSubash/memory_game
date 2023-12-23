import { useEffect, useState } from "react";
// import { createAvatar } from "@dicebear/core";
// import { shapes, icons } from "@dicebear/collection";
import Tile from "../components/Tile";

const Game = () => {
  const [square, setSquare] = useState(4);
  const [urls, setUrls] = useState<string[]>([]);

  
  useEffect(() => {
    const fetchData = async () => {
      let arr = [];
      for (let i = 0; i < (square * square) / 2; i++) {
        const seed = generateRandomCombinations();
        try {
          const response = await fetch(
            `https://api.dicebear.com/7.x/icons/svg?seed=${seed}`
          );
          const data = await response;
          arr.push(data.url);
        } catch (error) {
          console.error(error);
        }
      }
      //   console.log(arr);
      arr = arr.concat(arr);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setUrls(arr);
    };

    fetchData();
  }, [square]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${square}, minmax(0, 1fr))`,
      }}
      className="gap-4 w-fit h-fit"
      // className={`${"grid-cols-4"}`}
    >
      {Array.from({ length: square * square }, (_, index) => {
        return (
          <div key={index}>
            <Tile image={urls[index]} />
          </div>
        );
      })}
    </div>
  );
};

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

export default Game;
