import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TextEditor from "./TextEditor";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="container min-w-[350px] max-w-3xl mx-auto py-6 px-2">
      <TextEditor />
    </div>
  </StrictMode>
);
