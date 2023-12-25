import { useEffect, useState } from "react";
// import { createAvatar } from "@dicebear/core";
// import { shapes, icons } from "@dicebear/collection";
import Tile from "../components/Tile";

// interface PairMap {
//   key: string;
//   value: number[];
// }

const Game = () => {
  const [square, setSquare] = useState(4);
  const [urls, setUrls] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean[]>(
    Array.from({ length: square * square }, () => false)
  );
  const [pairMap, setPairMap] = useState<(string | number)[][]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const seeds = new Set<string>();
      while (seeds.size !== (square * square) / 2) {
        const seed = generateRandomCombinations();
        seeds.add(seed);
      }
      const uniqueSeeds: string[] = Array.from(seeds);
      let arr: string[] = [];
      //   console.log(seeds);
      for (let i = 0; i < uniqueSeeds.length; i++) {
        const seed = uniqueSeeds[i];
        try {
          const response = await fetch(
            `https://api.dicebear.com/7.x/icons/svg?flip=true&seed=${seed}`
          );
          const data = await response;
          arr.push(data.url);
        } catch (error) {
          console.error(error);
        }
      }
      arr = arr.concat(arr);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setUrls(arr);
      //   console.log(arr);
      const pairs = [];
      for (let i = 0; i < arr.length; i++) {
        const temp = [];
        temp.push(i);
        temp.push(arr[i].slice(-3));
        pairs.push(temp);
      }
      setPairMap(pairs);
      console.log(pairMap);
    };

    fetchData();
  }, [square]);

  const handleFlip = (index: number) => {
    const updatedIsFlipped = [...isFlipped];
    updatedIsFlipped[index] = !updatedIsFlipped[index];
    setIsFlipped(updatedIsFlipped);

    const flippedCount = isFlipped.filter((value) => value).length;

    if (flippedCount >= 2) {
      const updatedIsFlipped = Array.from(
        { length: square * square },
        () => false
      );
      setIsFlipped(updatedIsFlipped);
      updatedIsFlipped[index] = !updatedIsFlipped[index];
      setIsFlipped(updatedIsFlipped);
    }

    const flippedIndex = isFlipped
      .map((value, index) => {
        if (value) {
          return index;
        }
      })
      .filter((value) => value);
    console.log(flippedIndex);
    const code = flippedIndex.map((element) => {
      const res = pairMap.find((item) => item[0] === element);
      return res ? res[1] : undefined;
    });
    if (new Set(code).size === 1 && code.length !== 1) {
      setPoints(points + 1);
    }
  };

  return (
    <>
      <p>{points}</p>
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
            <div key={index} onClick={() => handleFlip(index)}>
              <Tile image={urls[index]} isFlipped={isFlipped[index]} />
            </div>
          );
        })}
      </div>
    </>
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
