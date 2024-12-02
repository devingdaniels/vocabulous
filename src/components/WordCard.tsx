import React from "react";

interface WordCardProps {
  children: React.ReactNode;
  className?: string;
}

const WordCard: React.FC<WordCardProps> = ({ children, className = "" }) => {
  return <div className={`rounded-lg border bg-white shadow-sm p-4 ${className}`}>{children}</div>;
};

export default WordCard;
