import React, { useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import ModalDialog from "@/app/modals/Modal";
import * as Switch from "@radix-ui/react-switch";

interface CreateDeckFormProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateDeckModal: React.FC<CreateDeckFormProps> = ({ isOpen, setOpen }) => {
  const [deckName, setDeckName] = useState<string>("");
  const [useAI, setUseAI] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!deckName.trim()) {
      setError("Please enter a deck name");
      return;
    }

    setError("");
    console.log({ deckName, useAI, theme });
    setOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(e.target.value);
    if (error) setError("");
  };

  useEffect(() => {
    if (!isOpen) {
      setDeckName("");
      setUseAI(false);
      setTheme("");
      setError("");
    }
  }, [isOpen]);

  return (
    <ModalDialog title="Create New Deck" open={isOpen} setOpen={setOpen}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deck Name</label>
          <input
            type="text"
            className={`w-full px-4 py-2 rounded border ${
              error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            } focus:border-blue-500 focus:ring-2 transition-colors`}
            placeholder="Enter deck name"
            value={deckName}
            onChange={handleNameChange}
          />
          {error && <p className="text-red-500 text-sm mt-1 animate-fadeIn">{error}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700" htmlFor="ai-toggle">
            AI Generate Words
          </label>
          <Switch.Root
            id="ai-toggle"
            checked={useAI}
            onCheckedChange={setUseAI}
            className="w-[42px] h-[25px] bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500 transition-colors"
          >
            <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>

        {useAI && (
          <div className="animate-fadeIn">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme for AI Generation
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              placeholder="e.g., Spanish food vocabulary, Business terms..."
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          color="blue"
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-white font-medium bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
        >
          Create
        </Button>
      </div>
    </ModalDialog>
  );
};
