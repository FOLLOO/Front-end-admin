'use client'

import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import {useTheme} from "next-themes";

export default function Editor() {
  // Creates a new editor instance.
  const { setTheme, theme } = useTheme()
  const editor = useCreateBlockNote();

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={theme} />;
}
