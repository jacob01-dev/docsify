// PopupPicker.tsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HexColorPicker } from "react-colorful";
import { motion, AnimatePresence } from "framer-motion";

interface PopupPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

const PopupPicker: React.FC<PopupPickerProps> = ({
  color,
  onChange,
  onClose,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={popupRef} className="bg-transparent p-4 rounded-lg shadow-lg">
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default PopupPicker;
