"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import DeckSidebar from "@/components/DeckSideBar";
import WordGrid from "@/components/WordGrid";
import { Deck } from "@/interfaces/deck.interface";

const mockDecks: Deck[] = [
  {
    id: 1,
    name: "Spanish Basics",
    description: "Basic Spanish words",
    createdBy: { firstName: "Devin", lastName: "Daniels", accessToken: "", picture: "", email: "" },
    words: [
      { id: 1, word: "Hello", translation: "Hola", example: "Some example sentence", deckId: 1 },
      { id: 2, word: "Goodbye", translation: "Adiós", example: "Some example sentence", deckId: 1 },
      {
        id: 3,
        word: "Algorithm",
        translation: "A step-by-step procedure",
        example: "Some example sentence",
        deckId: 2,
      },
      {
        id: 4,
        word: "Variable",
        translation: "A container for data",
        example: "Some example sentence",
        deckId: 2,
      },
    ],
  },
];

const AppLayout = () => {
  const router = useRouter();

  const { isAuthenticated, getStoredUser, isInitialized } = useAuth();
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);

  const user = getStoredUser();

  useEffect(() => {
    if (isInitialized && !isAuthenticated()) {
      console.log("User is not authenticated, redirecting to login page...");
      router.replace("/auth/login");
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isAuthenticated() || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar user={user} />
      <div className="flex flex-1 overflow-hidden">
        <DeckSidebar
          decks={mockDecks}
          selectedDeckId={selectedDeckId}
          setSelectedDeckId={setSelectedDeckId}
        />
        <div className="flex-1 overflow-auto bg-gray-50">
          <WordGrid selectedDeck={mockDecks.find((deck) => deck.id === selectedDeckId)} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
