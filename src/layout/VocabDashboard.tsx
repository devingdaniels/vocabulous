"use client";

import { useState } from "react";
import NavBar from "@/components/Navbar";
import DeckSidebar from "@/components/DeckSideBar";
import WordGrid from "@/components/WordGrid";
import { Deck } from "@/interfaces/deck.interface";
import { User } from "@/interfaces/user.interface";

interface DashboardProps {
  user: User;
  decks: Deck[];
}

export const VocabDashboard: React.FC<DashboardProps> = ({ user, decks }) => {
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);

  const selectedDeck = decks.find((deck) => deck.id === selectedDeckId);

  return (
    <div className="h-screen">
      <NavBar user={user} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0">
          <DeckSidebar
            decks={decks}
            selectedDeckId={selectedDeckId}
            setSelectedDeckId={setSelectedDeckId}
          />
        </aside>
        <main className="flex-1 overflow-auto bg-gray-50">
          <WordGrid selectedDeck={selectedDeck} />
        </main>
      </div>
    </div>
  );
};
