// ColorPickerSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PopupPicker from "./PopupPicker";

interface ColorPickerSectionProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  onToggle: () => void;
  isActive: boolean;
  onClose: () => void;
}

const ColorPickerSection: React.FC<ColorPickerSectionProps> = ({
  label,
  color,
  onChange,
  onToggle,
  isActive,
  onClose,
}) => (
  <motion.div
    className="space-y-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    <Label htmlFor={label} className="text-white">
      {label}
    </Label>
    <div className="flex items-center space-x-2">
      <div
        className="w-10 h-10 rounded-md cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={onToggle}
      />
      <Input
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-white border-gray-600 focus-visible:ring-transparent focus:border-white"
      />
    </div>
    {isActive && (
      <PopupPicker color={color} onChange={onChange} onClose={onClose} />
    )}
  </motion.div>
);

export default ColorPickerSection;
