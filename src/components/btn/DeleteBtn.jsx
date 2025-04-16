import { useState, useRef, useLayoutEffect, useTransition } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function DeleteBtn({ iconSize = 24, onDelete, children }) {
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const timerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClick = () => {
    startTransition(() => {
      if (hasConfirmed) {
        onDelete && onDelete();
        setHasConfirmed(false);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else {
        setHasConfirmed(true);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setHasConfirmed(false);
          timerRef.current = null;
        }, 2000);
      }
    });
  };

  useLayoutEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const unconfirm = () => {
    setHasConfirmed(false);
  };

  useOutsideClick(buttonRef, unconfirm);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="flex justify-center items-center gap-x-2 transition-all duration-300 ease hover:opacity-70 cursor-pointer">
      <span>
        {hasConfirmed ? (
          <IoCheckmark size={iconSize} color="red" />
        ) : (
          <FaRegTrashCan size={iconSize} color="red" />
        )}
      </span>
      <>{children}</>
    </button>
  );
}
