import React, { memo } from "react";
import { BsListUl, BsListOl, BsList } from "react-icons/bs";

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
    <div className="relative">
      <button onClick={onToggle} className="toolbox-button" title="List">
        {getActiveIcon(editor)}
      </button>

      {isOpen && (
        <div className="absolute z-10 -translate-x-1/2 mt-1.5 w-fit bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="flex gap-1 p-1">
            <button
              onClick={() => {
                editor.chain().focus().toggleBulletList().run();
                onClose();
              }}
              className={`toolbox-dropdown-button  cursor-pointer text-left px-1 hover:bg-gray-100 ${
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
              className={`toolbox-dropdown-button  cursor-pointer text-left px-1 hover:bg-gray-100 ${
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
      )}
    </div>
  );
});

ListControls.displayName = "ListControls";
export default ListControls;
