// ModalConfirm.tsx
import React from "react";

interface ModalConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-color-light rounded-[12px] shadow-lg max-w-[400px] text-center">
        <p className="py-[16px] px-[16px]">{message}</p>
        <div className="flex flex-col justify-center">
          <button
            onClick={onConfirm}
            className="text-[14px] h-[48px] font-semibold text-red-500  border-t-[1px] border-color-gray"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="text-[14px] h-[48px] border-t-[1px] border-color-gray"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
