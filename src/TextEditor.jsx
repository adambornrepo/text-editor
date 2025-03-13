import TextFormatToolbar from "./components/TextFormatToolbar";
import FontSizeControls from "./components/FontSizeControls";
import LinkControls from "./components/LinkControls";
import HeadingControls from "./components/HeadingControls";
import ListControls from "./components/ListControls";
import AlignmentControls from "./components/AlignmentControls";
import TextColorControls from "./components/TextColorControls";
import HighlightColorControls from "./components/HighlightColorControls";
import { useEditor, EditorContent } from "@tiptap/react";
import { createEditorExtensions } from "./utils/editorConfig";
import { useState, useCallback, useMemo } from "react";
import { BsGithub } from "react-icons/bs";

const TextEditor = ({
  initialContent = "<p>Hello, this is a rich text editor!</p>",
}) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const closeAllMenus = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const toggleMenu = useCallback((menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  }, []);

  const extensions = useMemo(() => createEditorExtensions(), []);

  const editor = useEditor({
    extensions,
    content: initialContent,
    onFocus: closeAllMenus,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="p-1 mt-4 flex flex-col rounded-md bg-white border border-gray-300 shadow-md shadow-stone-800">
        <div className="p-1 bg-orange-100 text-orange-400 text-center font-bold tracking-wider">
          TEXT EDITOR
        </div>
      </div>
      <div className="bg-white mt-4 border border-gray-300 rounded-md shadow-md shadow-stone-800">
        <div className="flex items-center flex-wrap p-1 border-b border-stone-300 gap-1 sm:gap-2 bg-stone-100 rounded-t-md">
          <TextFormatToolbar editor={editor} />

          <div className="toolbox-divider"></div>

          <TextColorControls
            editor={editor}
            isOpen={activeMenu === "color"}
            onToggle={() => toggleMenu("color")}
            onClose={closeAllMenus}
          />

          <HighlightColorControls
            editor={editor}
            isOpen={activeMenu === "highlight"}
            onToggle={() => toggleMenu("highlight")}
            onClose={closeAllMenus}
          />

          <div className="toolbox-divider"></div>

          <FontSizeControls
            editor={editor}
            isOpen={activeMenu === "fontSize"}
            onToggle={() => toggleMenu("fontSize")}
            onClose={closeAllMenus}
          />

          <HeadingControls
            editor={editor}
            isOpen={activeMenu === "heading"}
            onToggle={() => toggleMenu("heading")}
            onClose={closeAllMenus}
          />

          <LinkControls
            editor={editor}
            isOpen={activeMenu === "link"}
            onToggle={() => toggleMenu("link")}
            onClose={closeAllMenus}
          />

          <div className="toolbox-divider"></div>

          <AlignmentControls
            editor={editor}
            isOpen={activeMenu === "align"}
            onToggle={() => toggleMenu("align")}
            onClose={closeAllMenus}
          />

          <ListControls
            editor={editor}
            isOpen={activeMenu === "list"}
            onToggle={() => toggleMenu("list")}
            onClose={closeAllMenus}
          />
        </div>

        <EditorContent
          editor={editor}
          className="prose p-2 max-h-72 overflow-hidden overflow-y-auto [&_.tiptap]:min-h-48 [&_.tiptap]:focus:outline-none [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6"
        />
      </div>
      <div className=" mt-4 flex flex-col rounded-md bg-white border border-gray-300 shadow-md shadow-stone-800">
        <div className="p-2 border-b border-stone-300 tracking-widest text-sm font-semibold">
          OUTPUT
        </div>
        <pre className="p-2 text-xs font-mono bg-stone-100 rounded text-wrap">
          <code>{editor.getHTML()}</code>
        </pre>
      </div>
      <div className="p-2 mt-4 flex flex-col rounded-md bg-white border border-gray-300 shadow-md shadow-stone-800">
        <div className="p-2 bg-sky-100 text-sky-400 text-center">
          You can contact me via{" "}
          <a
            href="https://doganmerden.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-600 hover:underline transition-colors"
          >
            dm
          </a>
        </div>
      </div>
      <a
        href="https://github.com/adambornrepo/text-editor"
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit mx-auto p-1 mt-4 flex rounded-full bg-white border border-gray-300 shadow-md shadow-stone-800 text-stone-400 hover:text-stone-600 transition-colors"
      >
        <BsGithub className="text-3xl" />
      </a>
    </>
  );
};

export default TextEditor;
