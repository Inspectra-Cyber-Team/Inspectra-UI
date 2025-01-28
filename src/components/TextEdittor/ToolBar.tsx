"use client";

import { Toggle } from "../ui/toggle";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
  ListOrdered,
  Heading4,
  Heading5,
  Link,
  List,
} from "lucide-react";

import { TfiLayoutLineSolid } from "react-icons/tfi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";

import { useUploadFileMutation } from "@/redux/service/faqs";

export default function ToolBar({ editor }: any) {
  const [link1, setLink1] = useState("");

  const [uploadSingleFile] = useUploadFileMutation();

  if (!editor) return null;

  const handleFileSingleUpload = async (file: any) => {
    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await uploadSingleFile({ file: formData }).unwrap();

      // Check the response structure to ensure `fullUrl` exists
      if (response?.data?.fullUrl) {
        return response.data.fullUrl; // Return the full URL
      }
    } catch {
      return ""; // Return an empty string if an error occurs
    }
  };

  const addImageSingle = async () => {
    const fileInput = document.createElement("input");

    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e: any) => {
      const file = e.target.files ? e.target.files[0] : null;

      if (file) {
        // Upload the file and get the URL
        const fileUrl = await handleFileSingleUpload(file);

        if (fileUrl) {
          // Insert image directly into the editor
          editor.chain().focus().setImage({ src: fileUrl }).run();
        }
      }
    };

    // Trigger file input click to open the file picker
    fileInput.click();
  };

  const handleLinkClick = () => {
    const { selection } = editor.state;

    if (selection.empty) {
      return;
    }

    if (editor.isActive("link")) {
      const link = editor.getAttributes("link").href;
      setLink1(link);
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .setLink({
          href: link1 || "https://example.com",
          target: "_blank",
          class: "blue-link",
        })
        .run();
    }
  };

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
      tooltip: "Bold",
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
      tooltip: "Bold",
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
      tooltip: "Bold",
    },
    {
      icon: <Heading4 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      preesed: editor.isActive("heading", { level: 4 }),
      tooltip: "Bold",
    },
    {
      icon: <Heading5 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      preesed: editor.isActive("heading", { level: 5 }),
      tooltip: "Bold",
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
      tooltip: "Strike",
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
      tooltip: "Left Align",
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
      tooltip: "Center Align",
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
      tooltip: "Right Align",
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("codeBlock"),
      tooltip: "Code Block",
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
    {
      icon: <TfiLayoutLineSolid className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      preesed: editor.isActive("horizontalRule"),
      tooltip: "Horizontal Rule",
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => addImageSingle(),
      preesed: editor.isActive("image"),
      tooltip: "Image",
    },
    {
      icon: <Link className="size-4" />,
      onClick: () => {
        handleLinkClick();
      },
      preesed: editor.isActive("link"),
      tooltip: "Link",
    },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="border rounded-md p-1.5 mb-1 space-x-1 sticky top-20 z-50">
        {Options.map((option, i) => (
          <Toggle
            key={i}
            size="sm"
            pressed={option.preesed}
            onPressedChange={option.onClick}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div>{option.icon}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{option.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </Toggle>
        ))}
      </div>
    </TooltipProvider>
  );
}
