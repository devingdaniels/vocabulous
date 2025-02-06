"use client";

import React, { useState } from 'react';
import { Button, TextField, Select } from '@radix-ui/themes';

interface AddWordFormProps {
  onSubmit: (word: {
    term: string;
    definition: string;
    example: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }) => void;
}

export default function AddWordForm({ onSubmit }: AddWordFormProps) {
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    example: '',
    difficulty: 'medium' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      term: '',
      definition: '',
      example: '',
      difficulty: 'medium',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField.Root>
        <TextField.Input
          placeholder="Enter a word or phrase"
          value={formData.term}
          onChange={(e) => setFormData({ ...formData, term: e.target.value })}
          required
        />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          placeholder="Definition"
          value={formData.definition}
          onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
          required
        />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          placeholder="Example usage"
          value={formData.example}
          onChange={(e) => setFormData({ ...formData, example: e.target.value })}
          required
        />
      </TextField.Root>

      <Select.Root
        value={formData.difficulty}
        onValueChange={(value: 'easy' | 'medium' | 'hard') =>
          setFormData({ ...formData, difficulty: value })
        }
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Item value="easy">Easy</Select.Item>
          <Select.Item value="medium">Medium</Select.Item>
          <Select.Item value="hard">Hard</Select.Item>
        </Select.Content>
      </Select.Root>

      <Button type="submit" className="w-full">
        Add Word
      </Button>
    </form>
  );
}
