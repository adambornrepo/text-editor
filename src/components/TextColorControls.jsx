import React, { useState } from "react";
import { colors, isValidColor } from "../utils/colorPalette";
import { BsPencil } from "react-icons/bs";
import { HiCheck } from "react-icons/hi2";

const TextColorControls = ({ editor, isOpen, onToggle, onClose }) => {
  const [customColor, setCustomColor] = useState("");
  const [error, setError] = useState("");

  const getActiveColorStyle = (color) => {
    const currentColor = editor.getAttributes("textStyle").color;
    return currentColor === color ? "ring-2 ring-stone-800" : "";
  };

  const handleApply = () => {
    if (!isValidColor(customColor)) {
      setError("Invalid color format");
      return;
    }
    editor.chain().focus().setColor(customColor).run();
    onClose();
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={onToggle}
          className="toolbox-button"
          title="Color"
        >
          <BsPencil className="toolbox-button-icon" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1.5 p-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="grid grid-flow-col grid-rows-4 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    onClose();
                  }}
                  className={`w-5 h-5 rounded-lg cursor-pointer ${getActiveColorStyle(
                    color
                  )}`}
                  style={{ backgroundColor: color }}
                  title={color}
                ></button>
              ))}
            </div>
            <div className="mt-1 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-1">
                <div
                  className="w-5 h-5 shrink-0 rounded border"
                  style={{
                    backgroundColor: isValidColor(customColor)
                      ? customColor
                      : "#ffffff",
                  }}
                ></div>
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    if (error) setError("");
                  }}
                  className="p-1 h-5 text-xs border rounded w-full"
                  placeholder="#f0f0f0"
                />
                <button
                  onClick={handleApply}
                  className="h-5 shrink-0 p-1 flex items-center text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  <HiCheck className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-1 text-center bg-red-50 rounded">
                {error && <p className="text-red-600 text-xs">{error}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TextColorControls;
