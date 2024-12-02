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
      <div className="empty-state">
        <div className="empty-state-content">
          <h1 className="empty-state-title">No Deck Selected</h1>
          <p className="empty-state-text">Select a deck from the sidebar to view its words</p>
        </div>
      </div>
    );
  }

  return (
    <div className="word-grid-container">
      <h1 className="word-grid-title">{selectedDeck.name}</h1>

      <div className="word-grid">
        {selectedDeck.words?.map((word) => (
          <WordCard key={word?.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="font-medium mb-2">{word?.word}</div>
            <div className="text-gray-600 dark:text-gray-400">{word?.example}</div>
          </WordCard>
        ))}
      </div>

      <button className="floating-action-button" aria-label="Add new word">
        <Plus className="floating-action-icon" />
      </button>
    </div>
  );
};

export default WordGrid;
