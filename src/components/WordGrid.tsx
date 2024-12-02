import React from "react";
import WordCard from "@/components/WordCard";
import { Plus } from "lucide-react";
import { Deck } from "@/interfaces/deck.interface";

interface WordGridProps {
  selectedDeck: Deck | undefined;
}

const WordGrid: React.FC<WordGridProps> = ({ selectedDeck }) => {
  if (!selectedDeck) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">No Deck Selected</h1>
          <p className="text-xl text-gray-400">Select a deck from the sidebar to view its words</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 relative">
      <h1 className="text-2xl font-bold mb-6">{selectedDeck?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedDeck?.words?.map((word) => (
          <WordCard key={word?.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="font-medium mb-2">{word?.word}</div>
            <div className="text-gray-600">{word?.example}</div>
          </WordCard>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer">
        <Plus className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default WordGrid;
