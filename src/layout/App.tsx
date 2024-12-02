"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import DeckSidebar from "@/components/DeckSideBar";
import WordGrid from "@/components/WordGrid";

const mockDecks = [
  { id: 1, name: "Spanish Basics", wordCount: 45 },
  { id: 2, name: "Programming Terms", wordCount: 32 },
  { id: 3, name: "Medical Vocabulary", wordCount: 78 },
  { id: 4, name: "Business English", wordCount: 56 },
  { id: 5, name: "Travel Phrases", wordCount: 23 },
  { id: 6, name: "Spanish Basics", wordCount: 45 },
  { id: 7, name: "Programming Terms", wordCount: 32 },
  { id: 8, name: "Medical Vocabulary", wordCount: 78 },
  { id: 9, name: "Business English", wordCount: 56 },
  { id: 10, name: "Travel Phrases", wordCount: 23 },
  { id: 11, name: "Spanish Basics", wordCount: 45 },
  { id: 12, name: "Programming Terms", wordCount: 32 },
  { id: 13, name: "Medical Vocabulary", wordCount: 78 },
  { id: 14, name: "Business English", wordCount: 56 },
  { id: 15, name: "Travel Phrases", wordCount: 23 },
  { id: 16, name: "Spanish Basics", wordCount: 45 },
  { id: 17, name: "Programming Terms", wordCount: 32 },
  { id: 18, name: "Medical Vocabulary", wordCount: 78 },
  { id: 19, name: "Business English", wordCount: 56 },
  { id: 20, name: "Travel Phrases", wordCount: 23 },
  { id: 21, name: "Spanish Basics", wordCount: 45 },
  { id: 22, name: "Programming Terms", wordCount: 32 },
  { id: 23, name: "Medical Vocabulary", wordCount: 78 },
  { id: 24, name: "Business English", wordCount: 56 },
  { id: 25, name: "Travel Phrases", wordCount: 23 },
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
        <main className="flex-1 overflow-auto bg-gray-50">
          <WordGrid selectedDeck={mockDecks.find((deck) => deck.id === selectedDeckId)} />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
