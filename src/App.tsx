import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import Game from "./pages/Game";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [level, setLevel] = useState<number>(1);

  const handleLevel = (level: number) => {
    setLevel((prevLevel) =>
      prevLevel !== undefined && prevLevel != 3 ? prevLevel + 1 : 0
    );
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
            <Game level={level} handleLevel={handleLevel} />
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-slate-700 p-4 m-4 rounded-xl text-gray-300 relative text-4xl font-bold"
              // onClick={() => setTimeout(() => setStartGame(true), 3000)}
              onClick={() => setStartGame(true)}
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
