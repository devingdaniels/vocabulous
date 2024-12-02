import React from "react";
import WordCard from "@/components/WordCard";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";

const mockWords = [
  { id: 1, front: "Hello", back: "Hola", deckId: 1 },
  { id: 2, front: "Goodbye", back: "Adiós", deckId: 1 },
  { id: 3, front: "Algorithm", back: "A step-by-step procedure", deckId: 2 },
  { id: 4, front: "Variable", back: "A container for data", deckId: 2 },
  { id: 5, front: "Thank you", back: "Gracias", deckId: 1 },
  { id: 6, front: "Good morning", back: "Buenos días", deckId: 1 },
  { id: 7, front: "Function", back: "A reusable block of code", deckId: 2 },
  { id: 8, front: "Loop", back: "Repeated execution of code", deckId: 2 },
];

const WordGrid = ({ selectedDeck }) => {
  if (!selectedDeck) {
    return (
      <div className="p-6 text-center text-gray-500">Please select a deck to view its words</div>
    );
  }

  const deckWords = mockWords.filter((word) => word.deckId === selectedDeck.id);

  return (
    <div className="flex-1 p-6 relative">
      <h1 className="text-2xl font-bold mb-6">{selectedDeck.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockWords.map((word) => (
          <WordCard key={word.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="font-medium mb-2">{word.front}</div>
            <div className="text-gray-600">{word.back}</div>
          </WordCard>
        ))}
      </div>

      <Button size="icon" className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default WordGrid;
