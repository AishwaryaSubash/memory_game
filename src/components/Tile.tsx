import { motion } from "framer-motion";

const Tile = ({ image, isFlipped }) => {
  return (
    <motion.div
      className="h-32 w-32 flex items-center justify-center bg-[#A79273] rounded-2xl cursor-pointer"
      //   onClick={handleFlip}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 360 }}
      //   animate={controls}
      transition={{ duration: 0.6, animationDirection: "normal" }}
    >
      {isFlipped ? (
        <img
          src={image}
          alt="icon"
          width={128}
          height={128}
          className="rounded-2xl cursor-pointer"
        />
      ) : (
        <p className="text-6xl">?</p>
      )}
      {/* <p className="text-6xl">?</p>
      <p>hi</p> */}
    </motion.div>
  );
};

export default Tile;
