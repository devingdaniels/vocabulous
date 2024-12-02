import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  description?: string;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  setOpen,
  title,
  description = "Modal content",
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-slide-up"
          aria-describedby={undefined}
        >
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">{title}</Dialog.Title>

          <Dialog.Description id={"dialog-description"} className="sr-only">
            {description}
          </Dialog.Description>
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalDialog;
