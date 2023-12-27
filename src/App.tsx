// import { useState } from "react";
import "./App.css";
import MemoryGame from "./components/MemoryGame";
// import Game from "./pages/Game";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col gap-7 items-center justify-center">
        <p className="text-3xl font-bold">Synapse</p>
        <MemoryGame />
      </div>
    </>
  );
}

export default App;
