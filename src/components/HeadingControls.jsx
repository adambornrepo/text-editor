import React, { memo } from "react";
import {
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeH4,
  BsTypeH5,
  BsTypeH6,
  BsPCircle
} from "react-icons/bs";
import DropdownContainer from "./DropdownContainer";

const HeadingControls = memo(({ editor, isOpen, onToggle, onClose }) => {
  const getActiveIcon = (editor) => {
    switch (true) {
      case editor.isActive("paragraph"):
        return <BsPCircle className="toolbox-button-icon" />;
      case editor.isActive("heading", { level: 1 }):
        return <BsTypeH1 className="toolbox-button-icon" />;
      case editor.isActive("heading", { level: 2 }):
        return <BsTypeH2 className="toolbox-button-icon" />;
      case editor.isActive("heading", { level: 3 }):
        return <BsTypeH3 className="toolbox-button-icon" />;
      case editor.isActive("heading", { level: 4 }):
        return <BsTypeH4 className="toolbox-button-icon" />;
      case editor.isActive("heading", { level: 5 }):
        return <BsTypeH5 className="toolbox-button-icon" />;
      case editor.isActive("heading", { level: 6 }):
        return <BsTypeH6 className="toolbox-button-icon" />;
      default:
        return <BsPCircle className="toolbox-button-icon" />;
    }
  };

  return (
    <DropdownContainer isOpen={isOpen} onClose={onClose}>
      <button onClick={onToggle} className="toolbox-button" title="Heading">
        {getActiveIcon(editor)}
      </button>

      <div className="w-fit sm:w-24">
        <div className="p-1">
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level }).run();
                  onClose();
                }}
                className={`toolbox-dropdown-button hover:bg-gray-100 ${
                  editor.isActive("heading", { level })
                    ? "bg-stone-200 hover:bg-stone-200"
                    : ""
                }`}
              >
                {level === 1 && (
                  <BsTypeH1 className="toolbox-dropdown-button-icon" />
                )}
                {level === 2 && (
                  <BsTypeH2 className="toolbox-dropdown-button-icon" />
                )}
                {level === 3 && (
                  <BsTypeH3 className="toolbox-dropdown-button-icon" />
                )}
                {level === 4 && (
                  <BsTypeH4 className="toolbox-dropdown-button-icon" />
                )}
                {level === 5 && (
                  <BsTypeH5 className="toolbox-dropdown-button-icon" />
                )}
                {level === 6 && (
                  <BsTypeH6 className="toolbox-dropdown-button-icon" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              editor.chain().focus().setParagraph().run();
              onClose();
            }}
            className={`flex items-center justify-center w-full px-1 py-0.5 mt-1 rounded hover:bg-gray-100 cursor-pointer ${
              editor.isActive("paragraph")
                ? "bg-stone-200 hover:bg-stone-200"
                : ""
            }`}
          >
            <span className="text-center text-xs px-1">Paragraph</span>
          </button>
        </div>
      </div>
    </DropdownContainer>
  );
});

HeadingControls.displayName = "HeadingControls";
export default HeadingControls;
