import React, { useState, useEffect } from "react";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Info } from "lucide-react";

interface Word {
  id: number;
  word: string;
  translation: string;
}

interface Deck {
  id: number;
  name: string;
  description: string;
  createdBy: {
    user_id: number;
    firstName: string;
    lastName: string;
  };
  words: Word[];
}

interface FlashCardProps {
  word: Word;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

const FlashCard: React.FC<FlashCardProps> = ({ word, isFlipped, setIsFlipped }) => {
  const handleAudioClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const response = await fetch(`https://voca-speech.azurewebsites.net/pronounce/${word.word}`);

      const audioBlob = await response.blob();

      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      await audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error("Error fetching pronunciation:", error);
    }
  };

  return (
    <div className="w-96 h-60 [perspective:2000px]" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
          type: "tween",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute w-full h-full rounded-xl cursor-pointer [backface-visibility:hidden] bg-gradient-to-br from-blue-100 via-white to-purple-100 shadow-lg border border-blue-200"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-6 relative">
            <motion.div
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              {word.word}
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <div
                onClick={handleAudioClick}
                className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              >
                <Volume2 size={24} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>

        <div
          className="absolute w-full h-full rounded-xl cursor-pointer [backface-visibility:hidden] bg-gradient-to-br from-purple-100 via-white to-blue-100 shadow-lg border border-purple-200"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center justify-center h-full relative">
            <motion.div
              className="absolute bottom-4 left-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Info clicked for:", word.word);
                }}
                className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              >
                <Info size={16} className="text-white" />
              </div>
            </motion.div>

            <motion.div
              className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              {word.translation}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface DeckContainerProps {
  deck: Deck;
}

const FlashCardContainer: React.FC<DeckContainerProps> = ({ deck }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    const newIndex = currentIndex < deck.words.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setIsFlipped(false);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : deck.words.length - 1;
    setCurrentIndex(newIndex);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsFlipped(!isFlipped);
      } else if (e.code === "ArrowRight") {
        handleNext();
      } else if (e.code === "ArrowLeft") {
        handlePrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentIndex]);

  const handleRating = (difficulty: string) => {
    console.log(`Rated as ${difficulty}`);
    handleNext();
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {deck.name}
        </motion.h1>

        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          {deck.description}
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{
            scale: 0,
            opacity: 0,
            y: -20,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
            scale: {
              type: "spring",
              damping: 20,
              stiffness: 150,
            },
          }}
        >
          <FlashCard
            word={deck.words[currentIndex]}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => handleRating("easy")}
        >
          Easy
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => handleRating("medium")}
        >
          Medium
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-600 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => handleRating("hard")}
        >
          Hard
        </motion.button>
      </div>

      <div className="flex items-center gap-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <BiSkipPreviousCircle
            onClick={handlePrev}
            size={45}
            className="cursor-pointer text-blue-600 hover:text-purple-600 transition-colors"
          />
        </motion.div>

        <motion.div
          className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          animate={{ opacity: [0.5, 1] }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {currentIndex + 1} / {deck.words.length}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          <BiSkipNextCircle
            onClick={handleNext}
            size={45}
            className="cursor-pointer text-blue-600 hover:text-purple-600 transition-colors"
          />
        </motion.div>
      </div>
    </div>
  );
};

export { FlashCard, FlashCardContainer };
