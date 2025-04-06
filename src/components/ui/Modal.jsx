import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Modal({ show, onClose, children }) {
  const [isVisible, setIsVisible] = useState(show);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const closeModal = () => {
    setIsVisible(false);
    onClose();
  };

  useOutsideClick(modalRef, closeModal);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 p-8 bg-transparent z-1000">
      <div
        ref={modalRef}
        className="w-[80%] max-w-[400px] min-h-[400px] p-8 rounded-md shadow-xl bg-gray-900">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="transition-all duration-300 ease hover:opacity-70 cursor-pointer">
            <IoMdClose size={32} color="red" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
