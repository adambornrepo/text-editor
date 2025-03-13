import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import FontSize from "@tiptap/extension-font-size";
import Link from "@tiptap/extension-link";

export const createEditorExtensions = () => [
    StarterKit,
    Underline,
    TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
    }),
    TextStyle,
    Color,
    Highlight.configure({
        multicolor: true,
    }),
    FontSize,
    Link.configure({
        openOnClick: false,
        linkOnPaste: true,
    }),
];