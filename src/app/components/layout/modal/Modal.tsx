"use client";
import { useModal } from "@/app/contexts/Modal/ModalContext";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = () => {
  const { closeModal, modalContent, isOpen } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative bg-white rounded-lg p-6 max-w-lg w-full mx-4 z-50">
        <div className="absolute top-1 right-2 cursor-pointer" onClick={closeModal}><IoCloseCircleOutline size={30} color="90EE90" /> </div>
        <div>
            {modalContent}
        </div>
      </div>
    </div>
  );
};

export default Modal;
