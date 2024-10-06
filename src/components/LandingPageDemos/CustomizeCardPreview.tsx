// CustomCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import ColorPickerSection from "./ColorPickerSection";

interface CustomCardProps {
  title: string;
  description: string;
}

const CustomizeCardPreview: React.FC<CustomCardProps> = ({
  title,
  description,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [userColor, setUserColor] = useState("#2563eb");
  const [botColor, setBotColor] = useState("#71717a");
  const [activeColorPicker, setActiveColorPicker] = useState<
    "user" | "bot" | null
  >(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  const toggleColorPicker = (picker: "user" | "bot") => {
    setActiveColorPicker(activeColorPicker === picker ? null : picker);
  };

  const handleColorChange = (color: string, type: "user" | "bot") => {
    // const validColor = /^#[0-9A-Fa-f]{6}$/.test(color) ? color : "#000000";
    if (type === "user") {
      setUserColor(color);
    } else {
      setBotColor(color);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="lg:w-[400px]  text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="file"
              className="flex items-center space-x-4 cursor-pointer text-white"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-accent p-2 rounded-full"
              >
                <Upload size={20} />
              </motion.div>
              <span>Upload Icon</span>
            </Label>
            <Input
              id="file"
              type="file"
              accept=".png, .jpg, .jpeg, .svg"
              className="hidden"
              onChange={handleFileChange}
            />
            {fileName && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-gray-400 mt-1"
              >
                {fileName}
              </motion.div>
            )}
          </div>

          <ColorPickerSection
            label="User Message Color"
            color={userColor}
            onChange={(color) => handleColorChange(color, "user")}
            onToggle={() => toggleColorPicker("user")}
            isActive={activeColorPicker === "user"}
            onClose={() => setActiveColorPicker(null)}
          />

          <ColorPickerSection
            label="Chatbot Message Color"
            color={botColor}
            onChange={(color) => handleColorChange(color, "bot")}
            onToggle={() => toggleColorPicker("bot")}
            isActive={activeColorPicker === "bot"}
            onClose={() => setActiveColorPicker(null)}
          />
        </CardContent>
        <CardFooter className="flex justify-end mt-6">
          <Button variant={"outline"} className="mr-2">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CustomizeCardPreview;
