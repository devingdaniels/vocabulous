import React, { useState } from "react";
import { Button, TextArea } from "@radix-ui/themes";
import ModalDialog from "@/components/Modal";

interface CreateWordsFormProps {
  isCreateDeckModalShown: boolean;
  setIsCreateDeckModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateWordForm: React.FC<CreateWordsFormProps> = ({
  isCreateDeckModalShown,
  setIsCreateDeckModalShown,
}) => {
  const [wordsInput, setWordsInput] = useState<string>("");

  const handleSubmit = () => {
    // Convert textarea input to array of words
    const wordsList = wordsInput
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    console.log(wordsList);
    setIsCreateDeckModalShown(false);
  };

  return (
    <ModalDialog
      title="Add Words"
      open={isCreateDeckModalShown}
      setOpen={setIsCreateDeckModalShown}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your words (one per line):
          </label>
          <TextArea
            className="min-h-[200px]"
            placeholder="Enter words here&#10;Example&#10;Another word"
            value={wordsInput}
            onChange={(e) => setWordsInput(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          color="blue"
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-white font-medium bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Words
        </Button>
      </div>
    </ModalDialog>
  );
};

export default CreateWordForm;
