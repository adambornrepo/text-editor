import React, { memo } from "react";
import { BsListUl, BsListOl, BsList } from "react-icons/bs";
import DropdownContainer from "./DropdownContainer";

const getActiveIcon = (editor) => {
  switch (true) {
    case editor.isActive("bulletList"):
      return <BsListUl className="toolbox-button-icon" />;
    case editor.isActive("orderedList"):
      return <BsListOl className="toolbox-button-icon" />;
    default:
      return <BsList className="toolbox-button-icon" />;
  }
};

const ListControls = memo(({ editor, isOpen, onToggle, onClose }) => {
  return (
    <DropdownContainer isOpen={isOpen} onClose={onClose}>
      <button onClick={onToggle} className="toolbox-button" title="List">
        {getActiveIcon(editor)}
      </button>

      <div className="w-fit">
        <div className="flex gap-1 p-1">
          <button
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
              onClose();
            }}
            className={`toolbox-dropdown-button cursor-pointer text-left px-1 hover:bg-gray-100 ${
              editor.isActive("bulletList")
                ? "bg-stone-200 hover:bg-stone-200"
                : ""
            }`}
            title="bullet list"
          >
            <BsListUl className="toolbox-dropdown-button-icon" />
          </button>
          <button
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
              onClose();
            }}
            className={`toolbox-dropdown-button cursor-pointer text-left px-1 hover:bg-gray-100 ${
              editor.isActive("orderedList")
                ? "bg-stone-200 hover:bg-stone-200"
                : ""
            }`}
            title="ordered list"
          >
            <BsListOl className="toolbox-dropdown-button-icon" />
          </button>
        </div>
      </div>
    </DropdownContainer>
  );
});

ListControls.displayName = "ListControls";
export default ListControls;
