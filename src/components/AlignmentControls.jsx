import React, { memo } from "react";
import { BsTextLeft, BsTextCenter, BsTextRight } from "react-icons/bs";
import DropdownContainer from "./DropdownContainer";

const AlignmentControls = memo(({ editor, isOpen, onToggle, onClose }) => {
  const getActiveIcon = (editor) => {
    switch (true) {
      case editor.isActive({ textAlign: "left" }):
        return <BsTextLeft className="toolbox-button-icon" />;
      case editor.isActive({ textAlign: "center" }):
        return <BsTextCenter className="toolbox-button-icon" />;
      case editor.isActive({ textAlign: "right" }):
        return <BsTextRight className="toolbox-button-icon" />;
      default:
        return <BsTextLeft className="toolbox-button-icon" />;
    }
  };

  return (
    <DropdownContainer isOpen={isOpen} onClose={onClose}>
      <button onClick={onToggle} className="toolbox-button" title="Align">
        {getActiveIcon(editor)}
      </button>

      <div className="w-fit">
        <div className="flex gap-1 p-1">
          {["left", "center", "right"].map((align) => (
            <button
              key={align}
              onClick={() => {
                editor.chain().focus().setTextAlign(align).run();
                onClose();
              }}
              className={`toolbox-dropdown-button text-center hover:bg-gray-100 ${
                editor.isActive({ textAlign: align }) ? "bg-stone-200 hover:bg-stone-200" : ""
              }`}
              title={align}
            >
              {align === "left" && (
                <BsTextLeft className="toolbox-dropdown-button-icon" />
              )}
              {align === "center" && (
                <BsTextCenter className="toolbox-dropdown-button-icon" />
              )}
              {align === "right" && (
                <BsTextRight className="toolbox-dropdown-button-icon" />
              )}
            </button>
          ))}
        </div>
      </div>
    </DropdownContainer>
  );
});

AlignmentControls.displayName = "AlignmentControls";
export default AlignmentControls;
