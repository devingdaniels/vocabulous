import React, { useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import ModalDialog from "@/app/modals/Modal";
import { WordDispatch } from "@/api/word";

interface CreateWordsFormProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deckId: number;
}

export const CreateWordModal: React.FC<CreateWordsFormProps> = ({ isOpen, setOpen, deckId }) => {
  const [words, setWords] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    const wordsList = words
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    if (wordsList.length === 0) {
      setError("Please enter at least one word");
      return;
    }

    const res = await WordDispatch.createWord(wordsList, deckId);

    if (!res) {
      setError("An error occurred while adding words to the deck");
      return;
    }

    setError("");
    console.log({ words: wordsList });
    setOpen(false);
  };

  const handleWordsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWords(e.target.value);
    if (error) setError("");
  };

  useEffect(() => {
    if (!isOpen) {
      setWords("");
      setError("");
    }
  }, [isOpen]);

  return (
    <ModalDialog title="Add Words to Deck" open={isOpen} setOpen={setOpen}>
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">
            Enter Words
            <span className="text-gray-500 text-sm ml-2">(one word per line)</span>
          </label>
          <textarea
            className={`form-input min-h-[200px] resize-y ${error ? "input-error" : ""}`}
            placeholder="Enter words here...&#10;Example: Hello&#10;Example: World"
            value={words}
            onChange={handleWordsChange}
          />
          {error && <p className="form-error">{error}</p>}
        </div>

        <div className="form-footer">
          <Button color="blue" onClick={handleSubmit} className="form-button">
            Add Words
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};
