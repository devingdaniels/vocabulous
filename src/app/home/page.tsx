// This is the home page that will the user will be redirected to after login (set in next.config.js)
"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { VocabDashboard } from "@/layout/VocabDashboard";
import { Deck } from "@/interfaces/deck.interface";
import { getUserInfo } from "@/api/auth";

const mockDecks: Deck[] = [
  {
    id: 1,
    name: "Spanish Basics",
    description: "Basic Spanish words",
    createdBy: {
      user_id: 1,
      firstName: "Devin",
      lastName: "Daniels",
      accessToken: "",
      picture: "",
      email: "",
    },
    words: [
      {
        id: 1,
        word: "Helo",
        translation: "Hola",
        example: "Some example sentence",
        deckId: 1,
      },
      {
        id: 2,
        word: "Goodbye",
        translation: "Adiós",
        example: "Some example sentence",
        deckId: 1,
      },
      {
        id: 3,
        word: "Apple",
        translation: "Manzana",
        example: "Some example sentence",
        deckId: 1,
      },
      {
        id: 4,
        word: "House",
        translation: "Casa",
        example: "Some example sentence",
        deckId: 1,
      },
      {
        id: 5,
        word: "Car",
        translation: "Coche",
        example: "Some example sentence",
        deckId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Programming Terms",
    description: "Common programming terms",
    createdBy: {
      user_id: 1,
      firstName: "Devin",
      lastName: "Daniels",
      accessToken: "",
      picture: "",
      email: "",
    },
    words: [
      {
        id: 1,
        word: "Algorithm",
        translation: "A step-by-step procedure",
        example: "Some example sentence",
        deckId: 2,
      },
      {
        id: 2,
        word: "Variable",
        translation: "A container for data",
        example: "Some example sentence",
        deckId: 2,
      },
      {
        id: 3,
        word: "Function",
        translation: "A block of code that performs a task",
        example: "Some example sentence",
        deckId: 2,
      },
      {
        id: 4,
        word: "Loop",
        translation: "A programming structure that repeats a block of code",
        example: "Some example sentence",
        deckId: 2,
      },
      {
        id: 5,
        word: "Array",
        translation: "A data structure to store multiple values",
        example: "Some example sentence",
        deckId: 2,
      },
    ],
  },
  {
    id: 3,
    name: "French Basics",
    description: "Basic French words",
    createdBy: {
      user_id: 1,
      firstName: "Devin",
      lastName: "Daniels",
      accessToken: "",
      picture: "",
      email: "",
    },
    words: [
      {
        id: 1,
        word: "Bonjour",
        translation: "Hello",
        example: "Some example sentence",
        deckId: 3,
      },
      {
        id: 2,
        word: "Merci",
        translation: "Thank you",
        example: "Some example sentence",
        deckId: 3,
      },
      {
        id: 3,
        word: "S'il vous plaît",
        translation: "Please",
        example: "Some example sentence",
        deckId: 3,
      },
    ],
  },
  {
    id: 4,
    name: "German Basics",
    description: "Basic German words",
    createdBy: {
      user_id: 1,
      firstName: "Devin",
      lastName: "Daniels",
      accessToken: "",
      picture: "",
      email: "",
    },
    words: [
      {
        id: 1,
        word: "Hallo",
        translation: "Hello",
        example: "Some example sentence",
        deckId: 4,
      },
      {
        id: 2,
        word: "Tschüss",
        translation: "Goodbye",
        example: "Some example sentence",
        deckId: 4,
      },
      {
        id: 3,
        word: "Hund",
        translation: "Dog",
        example: "Some example sentence",
        deckId: 4,
      },
    ],
  },
];

const App: React.FC = () => {
  const router = useRouter();

  const { isAuthenticated, getStoredUser, isInitialized } = useAuth();
  const user = getStoredUser();

  useEffect(() => {
    if (isInitialized && !isAuthenticated()) {
      console.log("User is not authenticated, redirecting to login page...");
      // router.replace("/auth/login");
      // return;
    }

    const userInfo = getUserInfo();
    console.log("userInfo", userInfo);
  }, [isInitialized, isAuthenticated, router]);

  if (!isAuthenticated() || !user) {
    console.log("User is not authenticated or user is null, returning ");
    return null;
  }

  return (
    <>
      <VocabDashboard user={user} decks={mockDecks} />
    </>
  );
};

export default App;
