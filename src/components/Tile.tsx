import { motion } from "framer-motion";
import { CardInterface, GameContext } from "../pages/Game";
import { useContext, useEffect, useState } from "react";

interface TileProps {
  card: CardInterface;
  handleChoice: (card: CardInterface) => void;
  isFlipped: boolean;
  noFlip: boolean | undefined;
}

const Tile: React.FC<TileProps> = ({
  card,
  handleChoice,
  isFlipped,
  noFlip,
}) => {
  const handleClick = () => {
    if (!noFlip) handleChoice(card);
  };
  const { square } = useContext(GameContext);
  const [size, setSize] = useState(128);

  useEffect(() => {
    setSize(512 / square);
  }, [size, square]);

  return (
    <motion.div
      className={`flex w-[${size}px] h-[${size}px] items-center justify-center bg-[#A79273] rounded-2xl cursor-pointer overflow-hidden max-lg:w-[${
        size / 2
      }px] max-lg:h-[${size / 2}px] max-lg:rounded-lg`}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 360 }}
      transition={{ duration: 0.6, animationDirection: "normal" }}
      onClick={handleClick}
    >
      {isFlipped ? (
        <img src={card.image} alt="icon" />
      ) : (
        <img src="/pattern.jpg" alt="mystery" width={size} height={size} />
      )}
    </motion.div>
  );
};

export default Tile;
