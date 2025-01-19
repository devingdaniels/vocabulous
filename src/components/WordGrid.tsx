import React from "react";
import WordCard from "@/components/WordCard";
import { Plus } from "lucide-react";
import { Deck } from "@/interfaces/deck.interface";
import { CreateWordModal } from "@/app/modals/CreateWordModal";
import { BiEdit } from "react-icons/bi";
import { EditDeckModal } from "@/app/modals/EditDeckModal";
import { TbTrashXFilled } from "react-icons/tb";
import { WordDispatch } from "@/api/word";
import { RiShieldFlashLine } from "react-icons/ri";

interface WordGridProps {
  selectedDeck: Deck | undefined;
}

const WordGrid: React.FC<WordGridProps> = ({ selectedDeck }) => {
  const [isCreateWordsModalShown, setIsCreateWordsModalShown] = React.useState(false);
  const [isShowUpdateWordNameModal, setIsShowUpdateWordNameModal] = React.useState(false);

  if (!selectedDeck) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <h1 className="empty-state-title">No Deck Selected</h1>
          <p className="empty-state-text">Select a deck from the sidebar to view its words</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="word-grid-container">
        <h1 className="word-grid-title flex flex-row justify-between ">
          <div className="flex flex-row gap-3 items-center">
            <h3>{selectedDeck.name}</h3>
            <BiEdit
              onClick={() => setIsShowUpdateWordNameModal(!isShowUpdateWordNameModal)}
              className="edit-icon cursor-pointer"
            />
          </div>
          <div className="navbar word-grid-header flex flex-row">
            <div className="word-grid-header-item cursor-pointer">
              <RiShieldFlashLine onClick={() => alert("Implement flashcard page")} />
            </div>
          </div>
        </h1>

        <div className="word-grid">
          {selectedDeck.words?.map((word) => (
            <WordCard key={word?.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="font-medium mb-2 flex flex-row justify-between">
                <p className="">{word?.word}</p>
                <TbTrashXFilled
                  size={18}
                  onClick={() => WordDispatch.deleteWordById(word.id)}
                  className="delete-icon cursor-pointer hover:text-red-500 transition-transform duration-200 hover:scale-110"
                />
              </div>
              <div className="text-gray-600 dark:text-gray-400">{word?.example}</div>
            </WordCard>
          ))}
        </div>

        <button className="floating-action-button" aria-label="Add new word">
          <Plus
            className="floating-action-icon"
            onClick={() => setIsCreateWordsModalShown(!isCreateWordsModalShown)}
          />
        </button>
      </div>
      <CreateWordModal
        setOpen={setIsCreateWordsModalShown}
        isOpen={isCreateWordsModalShown}
        deckId={selectedDeck.id}
      />
      <EditDeckModal
        setOpen={setIsShowUpdateWordNameModal}
        isOpen={isShowUpdateWordNameModal}
        deckId={selectedDeck.id}
      />
    </>
  );
};

export default WordGrid;
