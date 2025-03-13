import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TextEditor from "./TextEditor";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="container min-w-[340px] max-w-3xl mx-auto py-6">
      <TextEditor />
    </div>
  </StrictMode>
);
