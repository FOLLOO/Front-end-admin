import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold, Code,
  Italic, Link2,
  Redo,
  Strikethrough,
  Underline,
  Undo
} from 'lucide-react';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { createPortal } from "react-dom";

import { $isLinkNode,toggleLink, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import {useCallback, useEffect, useRef, useState} from 'react';

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}


export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
    // const node = getSelectedNode(selection);
    // const parent = node.getParent();
    // if ($isLinkNode(parent) || $isLinkNode(node)) {
    //   setIsLink(true);
    // } else {
    //   setIsLink(false);
    // }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  // const insertLink = useCallback(() => {
  //   if (!isLink) {
  //     editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
  //   } else {
  //     editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  //   }
  // }, [editor, isLink]);


  const insertLink = (text: string, link: string) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const { anchor, focus } = selection;
        // inserting just the link text at the current selection
        selection.insertText(text);

        // selecting the inserted text
        anchor.offset -= text.length;
        focus.offset = anchor.offset + text.length;

        // transforming selection into a link
        toggleLink(link);
      }
    });
  };


  const buttonStyle = "toolbar-item border-2 border-muted rounded-md spaced bg-background hover:bg-accent hover:border-primary"
  return (
    <div className="toolbar rounded-xl bg-card border" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className={buttonStyle}
        aria-label="Undo">
        <Undo/>
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className={buttonStyle}
        aria-label="Redo">
        <Redo/>
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={buttonStyle + (isBold ? 'bg-accent border-primary' : '')}
        aria-label="Format Bold">
        <Bold/>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={buttonStyle + (isItalic ? 'bg-accent border-primary' : '')}
        aria-label="Format Italics">
        <Italic />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={buttonStyle + (isUnderline ? 'bg-accent border-primary' : '')}
        aria-label="Format Underline">
        <Underline />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={buttonStyle + (isStrikethrough ? ' bg-accent border-primary' : '')}
        aria-label="Format Strikethrough">
        <Strikethrough/>
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className={buttonStyle}
        aria-label="Left Align">
        <AlignLeft/>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className={buttonStyle}
        aria-label="Center Align">
        <AlignCenter/>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className={buttonStyle}
        aria-label="Right Align">
        <AlignRight/>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className={buttonStyle}
        aria-label="Justify Align">
        <AlignJustify/>
      </button>

      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
        className={buttonStyle + (isCode ? "bg-accent border-primary" : "")}
        aria-label="Insert Code"
      >
        <Code />
      </button>
      <button
        onClick={() => insertLink('asdfasdf', 'asdfasdfasdf')}
        className={buttonStyle + (isLink ? "bg-accent border-primary" : "")}
        aria-label="Insert Link"
      >
        <Link2 />
      </button>
      {/*{isLink &&*/}
      {/*  createPortal(<FloatingLinkEditor editor={editor} />, document.body)}*/}
    </div>
  );
}
