import { useState } from "react";
import "./App.css";
import Game from "./pages/Game";
import { motion } from "framer-motion";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [level, setLevel] = useState<number>(1);

  const handleLevel = (level: number) => {
    setLevel((prevLevel) => {
      if (prevLevel != 3) return prevLevel + 1;
    });
    console.log("new level", level);
  };

  return (
    <>
      <div className="flex flex-col gap-7 items-center justify-center">
        <div className="flex gap-10 justify-center">
          <img src="/title-logo.svg" width={150} height={150} />
          <p className="text-9xl font-bold">Synapse</p>
        </div>
        <div className="pt-5">
          {startGame ? (
            <>
              <div className="flex gap-4 justify-center items-center text-4xl font-bold">
                <p>Level</p>
                <p>{level}</p>
              </div>
              <Game level={level} handleLevel={handleLevel} />
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-slate-700 p-4 m-4 rounded-xl text-gray-300 relative text-4xl font-bold"
              onClick={() => setTimeout(() => setStartGame(true), 900)}
            >
              Start Game
            </motion.button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
