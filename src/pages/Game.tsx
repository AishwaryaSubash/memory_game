import { createContext, useEffect, useState } from "react";
import Tile from "../components/Tile";

export const GameContext = createContext({
  square: 4,
});

export interface CardInterface {
  id: number;
  image: string;
  matched: boolean;
}

const Game = ({
  level,
  handleLevel,
}: {
  level: number;
  handleLevel: (level: number) => void;
}) => {
  const [square, setSquare] = useState(4);
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [points, setPoints] = useState(0);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<CardInterface | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardInterface | null>(null);
  const [noFlip, setNoFlip] = useState<boolean>();

  // * Fetching card images
  useEffect(() => {
    const fetchData = async () => {
      const seeds = new Set<string>();
      while (seeds.size !== (square * square) / 2) {
        const seed = generateRandomCombinations();
        seeds.add(seed);
      }
      const uniqueSeeds: string[] = Array.from(seeds);
      let arr = [];
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

      arr = arr
        .concat(arr)
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ image: card, id: Math.random(), matched: false }));
      setCards(arr);
    };
    setPoints(0);
    setTurns(0);
    fetchData();
  }, [square, level]);

  // * Checking for card matches
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setNoFlip(true);
      if (
        choiceOne?.id !== choiceTwo?.id &&
        choiceOne?.image === choiceTwo?.image
      ) {
        setCards((prevCards) => {
          prevCards.map((card) => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              card.matched = true;
            }
          });
          return prevCards;
        });
        setPoints(points + 1);
        resetTurn();
        // console.log("match");
      } else {
        // console.log("no match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // * For calculating points
  useEffect(() => {
    if (points === (square * square) / 2) {
      setCards([]);
      handleLevel(level + 1);
      setSquare(4 + 2 * level);
    }
  }, [points]);

  // * Handling card choices
  const handleChoice = (card: CardInterface) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // * Reset all cards
  const resetTurn = () => {
    setNoFlip(false);
    setTurns(turns + 1);
    setChoiceTwo(null);
    setChoiceOne(null);
  };

  return (
    <>
      {cards.length != 0 ? (
        <>
          <div className="flex gap-4 justify-center items-center text-4xl font-bold">
            <p>Level</p>
            <p>{level}</p>
          </div>
          <div className="flex gap-4 items-center justify-between mb-6">
            <div className="flex gap-4 items-center justify-center mb-6">
              <p className="text-2xl">Score:</p>
              <p className="text-2xl">{points}</p>
            </div>
            <div className="flex gap-4 items-center justify-center mb-6">
              <p className="text-2xl">Turns:</p>
              <p className="text-2xl">{turns}</p>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${square}, minmax(0, 1fr))`,
            }}
            className="gap-4 w-fit h-fit"
          >
            {cards.map((card) => {
              return (
                <GameContext.Provider value={{ square }} key={card.id}>
                  <Tile
                    card={card}
                    handleChoice={handleChoice}
                    isFlipped={
                      card === choiceOne || card === choiceTwo || card.matched
                    }
                    noFlip={noFlip}
                  />
                </GameContext.Provider>
              );
            })}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={100}
            height={100}
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#481f31"
              strokeLinecap="round"
              strokeWidth={2}
            >
              <path
                strokeDasharray={60}
                strokeDashoffset={60}
                strokeOpacity={0.3}
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
              >
                <animate
                  fill="freeze"
                  attributeName="strokeDashoffset"
                  dur="1.3s"
                  values="60;0"
                />
              </path>
              <path
                strokeDasharray={15}
                strokeDashoffset={15}
                d="M12 3C16.9706 3 21 7.02944 21 12"
              >
                <animate
                  fill="freeze"
                  attributeName="strokeDashoffset"
                  dur="0.3s"
                  values="15;0"
                />
                <animateTransform
                  attributeName="transform"
                  dur="1.5s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
                />
              </path>
            </g>
          </svg>
        </div>
      )}
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
