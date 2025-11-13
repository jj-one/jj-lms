"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "./menubar";
import TextAlign from "@tiptap/extension-text-align";

export function RichTextEditor({field}: {field: any}) {
    const editor = useEditor({
        extensions: [
            // Add desired extensions here
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],

        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-0 max-w-none focus:outline-none dark:prose-invert !w-full !max-w-none",
            },
        },

        onUpdate: ({ editor }) => {
            field.onChange(JSON.stringify(editor.getJSON()));
        },

        content: field.value ? JSON.parse(field.value) : "<p>No content yet</p>",

        immediatelyRender: false,
    });

  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent editor={editor} className="border border-input rounded-b-lg p-4 min-h-[150px] focus:outline-none bg-input dark:bg-input/30" />
    </div>
  );
}