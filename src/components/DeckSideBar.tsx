import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface DeckSideBarProps {
  selectedDeckId: number | null;
  decks: { id: number; name: string; wordCount: number }[];
  setSelectedDeckId: React.Dispatch<React.SetStateAction<number | null>>;
}

const DeckSidebar: React.FC<DeckSideBarProps> = ({ selectedDeckId, decks, setSelectedDeckId }) => {
  return (
    <div className="w-64 border-r bg-white h-[calc(100vh-4rem)]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Your Decks</h2>
      </div>
      <ScrollArea.Root className="h-[calc(100%-4rem)] overflow-hidden">
        <ScrollArea.Viewport className="w-full h-full">
          <div className="p-2">
            {decks.map((deck) => (
              <div
                key={deck.id}
                onClick={() => setSelectedDeckId(deck.id)}
                className={`
                  h-[60px] px-3 py-2 mb-1 rounded-md cursor-pointer
                  ${
                    selectedDeckId === deck.id
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                <div className="w-full h-full">
                  <div
                    className={`font-medium leading-5 ${
                      selectedDeckId === deck.id ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {deck.name}
                  </div>
                  <div
                    className={`text-sm leading-5 mt-1 ${
                      selectedDeckId === deck.id ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {deck.wordCount} words
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-gray-100 transition-colors duration-150 ease-out hover:bg-gray-200"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-lg relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

export default DeckSidebar;
