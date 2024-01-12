import { useState } from "react";
import { motion } from "framer-motion";
import Game from "./pages/Game";
import Footer from "./components/Footer";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [level, setLevel] = useState<number>(1);

  const handleLevel = () => {
    setLevel((prevLevel) =>
      prevLevel !== undefined && prevLevel != 3 ? prevLevel + 1 : 1
    );
    // console.log("New Level", level);
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center h-full w-full">
        <div className="flex flex-col gap-7 my-8 items-center justify-center max-sm:gap-4">
          <div className="flex gap-10 justify-center max-lg:items-center">
            <img
              src="/title-logo.svg"
              className="w-[150px] h-[150px] max-lg:w-[90px] max-lg:h-[90px] max-sm:w-[60px] max-sm:h-[60px]"
            />
            <div className="flex flex-col items-center justify-center">
              <p className="text-9xl font-bold max-lg:text-6xl max-sm:text-4xl">
                Unmatched
              </p>
              <p className="text-2xl max-sm:text-base">Flip. Match. Win.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-5 w-11/12">
            {startGame ? (
              <Game level={level} handleLevel={handleLevel} />
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-slate-700 text-gray-300 p-4 m-4 rounded-xl relative text-4xl font-bold max-lg:text-2xl max-lg:p-2 max-lg:m-2"
                onClick={() => setTimeout(() => setStartGame(true), 1000)}
              >
                Start Game
              </motion.button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
