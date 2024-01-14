import { createContext, useEffect, useState } from "react";
import Tile from "../components/Tile";
import generateRandomCombinations from "../utils";

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
        // console.log("matched");
      } else {
        // console.log("unmatched");
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
          <div className="flex gap-4 justify-center items-center text-4xl font-bold max-sm:text-xl">
            <p>Level</p>
            <p>{level}</p>
          </div>
          <div className="flex w-full gap-4 items-center justify-between mb-6 text-2xl max-sm:text-base">
            <div className="flex gap-4 items-center justify-center mb-6">
              <p>Score:</p>
              <p>{points}</p>
            </div>
            <div className="flex gap-4 items-center justify-center mb-6">
              <p>Turns:</p>
              <p>{turns}</p>
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
        <div className="w-full h-full flex flex-col justify-center items-center self-center">
          {level !== 1 && (
            <p className="text-2xl">
              Congratulations!! Moving to Level {level} ...
            </p>
          )}
          <img src="/loading.svg" />
        </div>
      )}
    </>
  );
};

export default Game;
