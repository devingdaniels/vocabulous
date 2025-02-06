"use client";

import React from 'react';
import { Card, Text, Badge } from '@radix-ui/themes';
import { Word } from '@/types/vocabulary';

interface WordListProps {
  words: Word[];
  onWordClick: (word: Word) => void;
}

export default function WordList({ words, onWordClick }: WordListProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'green';
    if (mastery >= 50) return 'yellow';
    return 'red';
  };

  if (words.length === 0) {
    return (
      <div className="bg-zinc-800 rounded-lg p-8 text-center">
        <Text className="text-zinc-400">
          You haven't added any words yet. Click the "Add New Word" button to get started!
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {words.map((word) => (
        <Card
          key={word.id}
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-zinc-800 border border-zinc-700"
          onClick={() => onWordClick(word)}
        >
          <div className="flex justify-between items-start mb-2">
            <Text size="5" weight="bold" className="text-white">
              {word.term}
            </Text>
            <Badge
              color={getDifficultyColor(word.difficulty)}
              className="uppercase"
            >
              {word.difficulty}
            </Badge>
          </div>
          
          <Text className="text-zinc-300 mb-2">{word.definition}</Text>
          
          {word.examples[0] && (
            <Text className="text-sm italic text-zinc-400 mb-4">
              &quot;{word.examples[0]}&quot;
            </Text>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <Badge color={getMasteryColor(word.mastery)}>
              Mastery: {word.mastery}%
            </Badge>
            <Text size="1" className="text-zinc-500">
              Last practiced:{' '}
              {word.lastPracticed
                ? new Date(word.lastPracticed).toLocaleDateString()
                : 'Never'}
            </Text>
          </div>
        </Card>
      ))}
    </div>
  );
}
