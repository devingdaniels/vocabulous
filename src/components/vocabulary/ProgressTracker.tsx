"use client";

import React from 'react';
import { Card, Text, Progress } from '@radix-ui/themes';
import { UserProgress } from '@/types/vocabulary';

interface ProgressTrackerProps {
  progress: UserProgress;
}

export default function ProgressTracker({ progress }: ProgressTrackerProps) {
  const masteryPercentage = progress.totalWords > 0
    ? Math.round((progress.masteredWords / progress.totalWords) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-zinc-800">
        <div className="flex flex-col h-full justify-between">
          <Text size="2" weight="bold" className="text-zinc-400 mb-2">
            Total Words
          </Text>
          <Text size="8" weight="bold" className="text-white">
            {progress.totalWords}
          </Text>
        </div>
      </Card>

      <Card className="p-4 bg-zinc-800">
        <div className="flex flex-col h-full justify-between">
          <Text size="2" weight="bold" className="text-zinc-400 mb-2">
            Mastered Words
          </Text>
          <div>
            <Text size="8" weight="bold" className="text-blue-400">
              {progress.masteredWords}
            </Text>
            <Progress 
              value={masteryPercentage} 
              className="mt-2" 
              style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                '--progress-background': 'rgb(59, 130, 246)'
              } as React.CSSProperties}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-zinc-800">
        <div className="flex flex-col h-full justify-between">
          <Text size="2" weight="bold" className="text-zinc-400 mb-2">
            Practice Streak
          </Text>
          <div className="flex items-baseline">
            <Text size="8" weight="bold" className="text-orange-400">
              {progress.practiceStreak}
            </Text>
            <Text size="2" className="ml-2 text-zinc-400">
              days
            </Text>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-zinc-800">
        <div className="flex flex-col h-full justify-between">
          <Text size="2" weight="bold" className="text-zinc-400 mb-2">
            Average Score
          </Text>
          <Text size="8" weight="bold" className="text-green-400">
            {progress.averageScore}%
          </Text>
        </div>
      </Card>
    </div>
  );
}
