"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import { all, createLowlight } from "lowlight";
import "highlight.js/styles/atom-one-dark.css";
import js from "highlight.js/lib/languages/javascript";
import { useEffect } from "react";
import ToolBar from "./ToolBar";

export default function RichTextEditor({ content, onChange }: any) {
  const lowlight = createLowlight(all);

  lowlight.register("js", js);

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
        languageClassPrefix: "language-",
        HTMLAttributes: {
          class: "hljs",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "my-4",
        },
      }),
      Highlight,
      Image,
      ImageResize,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // Use the default validation method to check if the URL is valid
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // Disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];

            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // Only allow specific protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );
            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // Disallowed domains (for phishing, etc.)
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // If all checks pass, URL is valid and allowed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md  py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when `content` prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content); // Update the editor with new content
    }
  }, [content, editor]);

  return (
    <section>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </section>
  );
}
