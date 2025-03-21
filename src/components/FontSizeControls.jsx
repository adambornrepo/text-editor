import React, { memo, useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi2";
import { RiFontSize2 } from "react-icons/ri";
import DropdownContainer from "./DropdownContainer";

const FontSizeControls = memo(({ editor, isOpen, onToggle, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(16);

  useEffect(() => {
    if (isOpen && editor.isActive("textStyle")) {
      let size = editor.getAttributes("textStyle").fontSize;
      size = size ? size.replace("px", "") : "16";
      setSelectedSize(size);
    } else if (isOpen) {
      setSelectedSize(16);
    }
  }, [isOpen, editor]);

  const fontSizes = [
    { label: "12", value: "12px" },
    { label: "16", value: "16px" },
    { label: "20", value: "20px" },
    { label: "24", value: "24px" },
  ];

  const getActiveFontSizeStyle = (size) => {
    const currentSize = editor.getAttributes("textStyle").fontSize;
    return currentSize === size ? "bg-gray-200 hover:bg-gray-200" : "";
  };

  return (
    <DropdownContainer isOpen={isOpen} onClose={onClose}>
      <button onClick={onToggle} className="toolbox-button" title="Font Size">
        <RiFontSize2 className="toolbox-button-icon" />
      </button>

      <div className="w-fit">
        <div className="flex gap-1 p-1">
          {fontSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => {
                editor.chain().focus().setFontSize(size.value).run();
                onClose();
              }}
              className={`toolbox-dropdown-button ${getActiveFontSizeStyle(
                size.value
              )}`}
            >
              <span className="text-xs sm:text-sm">{size.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-end p-1 border-t border-gray-200">
          <input
            type="number"
            min={8}
            max={72}
            placeholder="16"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="p-1 h-5 w-full border border-gray-300 rounded text-xs"
          />
          <span className="text-xs ml-0.5">px</span>
          <button
            onClick={() => {
              if (!selectedSize) return;
              const sizeValue = parseInt(selectedSize);
              if (!isNaN(sizeValue) && sizeValue >= 8 && sizeValue <= 72) {
                editor.chain().focus().setFontSize(`${selectedSize}px`).run();
              }
            }}
            className="ml-2 h-5 shrink-0 px-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            <HiCheck className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DropdownContainer>
  );
});

FontSizeControls.displayName = "FontSizeControls";
export default FontSizeControls;
