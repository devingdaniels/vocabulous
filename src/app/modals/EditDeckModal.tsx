import React, { useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import ModalDialog from "@/app/modals/Modal";
import { DeckDispatch } from "@/api/deck";

interface EditDeckProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deckId: number;
}

export const EditDeckModal: React.FC<EditDeckProps> = ({ isOpen, setOpen, deckId }) => {
  const [deckName, setDeckName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!deckName.trim()) {
      setError("Please enter a deck name");
      return;
    }

    const response = await DeckDispatch.updateDeck(deckName, deckId);

    console.log({ deckName });
    setOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(e.target.value);
    if (error) setError("");
  };

  useEffect(() => {
    if (!isOpen) {
      setDeckName("");
      setError("");
    }
  }, [isOpen]);

  return (
    <ModalDialog title="Edit Deck Name" open={isOpen} setOpen={setOpen}>
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
      </div>
      <div className="flex justify-end mt-6">
        <Button
          color="blue"
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-white font-medium bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </ModalDialog>
  );
};
