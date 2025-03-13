import React from "react";
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsTypeStrikethrough,
} from "react-icons/bs";

const TextFormatToolbar = ({ editor }) => {
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbox-button ${
          editor.isActive("bold") ? "toolbox-button-active" : ""
        }`}
        title="Bold"
      >
        <BsTypeBold className="toolbox-button-icon" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbox-button ${
          editor.isActive("italic") ? "toolbox-button-active" : ""
        }`}
        title="Italic"
      >
        <BsTypeItalic className="toolbox-button-icon" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`toolbox-button ${
          editor.isActive("underline") ? "toolbox-button-active" : ""
        }`}
        title="Underline"
      >
        <BsTypeUnderline className="toolbox-button-icon" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`toolbox-button ${
          editor.isActive("strike") ? "toolbox-button-active" : ""
        }`}
        title="Strike"
      >
        <BsTypeStrikethrough className="toolbox-button-icon" />
      </button>
    </>
  );
};

TextFormatToolbar.displayName = "TextFormatToolbar";
export default TextFormatToolbar;
