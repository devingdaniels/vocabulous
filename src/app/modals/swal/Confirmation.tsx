import Swal from "sweetalert2";

export enum SwalIcon {
  warning = "warning",
  success = "success",
  error = "error",
  info = "info",
  question = "question",
}

interface SwalConfirmationProps {
  title: string;
  text: string;
  confirmButtonText: string;
  denyButtonText: string;
  icon: SwalIcon;
  confirmationText: string;
  onConfirm: () => void;
}

export const SwalConfirmation = async ({
  title,
  confirmButtonText,
  denyButtonText,
  text,
  icon,
  confirmationText,
  onConfirm,
}: SwalConfirmationProps) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      if (onConfirm) onConfirm();
      Swal.fire({
        title: "Deleted!",
        text: confirmationText,
        icon: "success",
      });
    }
  });

  return result;
};
