import React from "react";

const WordCard = ({ children, className = "" }) => {
  return <div className={`rounded-lg border bg-white shadow-sm p-4 ${className}`}>{children}</div>;
};

export default WordCard;
