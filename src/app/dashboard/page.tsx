"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button, Dialog, Tabs } from '@radix-ui/themes';
import AddWordForm from '@/components/vocabulary/AddWordForm';
import WordList from '@/components/vocabulary/WordList';
import ProgressTracker from '@/components/vocabulary/ProgressTracker';
import { Word, UserProgress } from '@/types/vocabulary';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<Word[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    totalWords: 0,
    masteredWords: 0,
    practiceStreak: 0,
    averageScore: 0,
  });

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleAddWord = (wordData: {
    term: string;
    definition: string;
    example: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }) => {
    const newWord: Word = {
      id: Date.now().toString(),
      term: wordData.term,
      definition: wordData.definition,
      examples: [wordData.example],
      difficulty: wordData.difficulty,
      mastery: 0,
      tags: [],
      createdAt: new Date(),
      userId: user?.uid || '',
    };

    setWords((prev) => [...prev, newWord]);
    setProgress((prev) => ({
      ...prev,
      totalWords: prev.totalWords + 1,
    }));
  };

  const handleWordClick = (word: Word) => {
    // TODO: Implement word details view
    console.log('Word clicked:', word);
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-zinc-900">
      <nav className="bg-black p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Vocabulous</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{user.email}</span>
            <Button onClick={logout} color="red">
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-white mb-8">
          Welcome, {user.displayName || user.email}!
        </h2>

        <div className="mb-8">
          <ProgressTracker progress={progress} />
        </div>

        <Tabs.Root defaultValue="vocabulary">
          <Tabs.List className="bg-zinc-800 p-1 rounded-lg">
            <Tabs.Trigger value="vocabulary" className="px-4 py-2 text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-zinc-700 rounded">
              My Vocabulary
            </Tabs.Trigger>
            <Tabs.Trigger value="practice" className="px-4 py-2 text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-zinc-700 rounded">
              Practice
            </Tabs.Trigger>
          </Tabs.List>

          <div className="mt-6">
            <Tabs.Content value="vocabulary">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Your Words ({words.length})
                </h3>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Add New Word
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content style={{ backgroundColor: '#27272a' }}>
                    <Dialog.Title className="text-white">Add a New Word</Dialog.Title>
                    <AddWordForm onSubmit={handleAddWord} />
                  </Dialog.Content>
                </Dialog.Root>
              </div>

              <WordList words={words} onWordClick={handleWordClick} />
            </Tabs.Content>

            <Tabs.Content value="practice">
              <div className="bg-zinc-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Practice Session
                </h3>
                <p className="text-zinc-400 mb-4">
                  Ready to practice your vocabulary? Choose a practice mode below:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    size="3" 
                    disabled={words.length === 0}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                  >
                    Flashcards
                  </Button>
                  <Button 
                    size="3" 
                    disabled={words.length === 0}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                  >
                    Multiple Choice
                  </Button>
                </div>
                {words.length === 0 && (
                  <p className="text-yellow-400 mt-4">
                    Add some words to your vocabulary to start practicing!
                  </p>
                )}
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </main>
  );
}
