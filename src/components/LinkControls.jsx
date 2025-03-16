import React, { memo, useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { HiArrowPathRoundedSquare, HiPlus, HiTrash } from "react-icons/hi2";
import DropdownContainer from "./DropdownContainer";

const LinkControls = memo(({ editor, isOpen, onToggle, onClose }) => {
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    if (isOpen && editor.isActive("link")) {
      setLinkUrl(editor.getAttributes("link").href || "");
    } else if (isOpen) {
      setLinkUrl("");
    }
  }, [isOpen, editor, setLinkUrl]);

  const setLink = () => {
    if (linkUrl && linkUrl.trim() !== "") {
      let url = linkUrl.trim();
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      if (editor.state.selection.empty) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      } else {
        editor.chain().focus().setLink({ href: url }).run();
      }
    } else {
      editor.chain().focus().unsetLink().run();
    }
    onClose();
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    onClose();
  };

  return (
    <DropdownContainer isOpen={isOpen} onClose={onClose}>
      <button
        onClick={onToggle}
        className={`toolbox-button ${
          editor.isActive("link") ? "toolbox-button-active" : ""
        }`}
        title="Link"
      >
        <BsLink45Deg className="toolbox-button-icon" />
      </button>

      <div className="w-48">
        <div className="flex items-center gap-1 p-1.5">
          <label className="block text-xs font-medium text-gray-700">
            URL
          </label>
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="p-1 h-5 text-xs border rounded w-full"
          />
          <button
            onClick={setLink}
            className="h-5 shrink-0 px-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            {editor.isActive("link") ? (
              <HiArrowPathRoundedSquare className="w-4 h-4" />
            ) : (
              <HiPlus className="w-4 h-4" />
            )}
          </button>
          {editor.isActive("link") && (
            <button
              onClick={removeLink}
              className="h-5 shrink-0 px-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </DropdownContainer>
  );
});

LinkControls.displayName = "LinkControls";
export default LinkControls;
