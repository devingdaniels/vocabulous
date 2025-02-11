"use client";

import React from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/Navbar";
import { FlashCardContainer } from "@/components/flashcard/DeckContainer";

const fakeDeck = {
  id: 1,
  name: "Spanish Basics",
  description: "Basic Spanish words",
  createdBy: {
    user_id: 1,
    firstName: "Devin",
    lastName: "Daniels",
  },
  words: [
    {
      id: 1,
      word: "Hello",
      translation: "Hola",
    },
    {
      id: 2,
      word: "Goodbye",
      translation: "Adiós",
    },
    {
      id: 3,
      word: "Apple",
      translation: "Manzana",
    },
  ],
};

const DeckPage: React.FC = () => {
  const { deckId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar user={null} />
      <main className="container mx-auto pt-8">
        <FlashCardContainer deck={fakeDeck} />
      </main>
    </div>
  );
};

export default DeckPage;
