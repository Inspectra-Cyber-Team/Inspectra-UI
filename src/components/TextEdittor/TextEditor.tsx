import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import {useState, useEffect} from "react";

const QuillEditor = dynamic(() => import("react-quill"), {ssr: false});

const quillModules = {
    toolbar: [
        [{header: [1, 2, 3, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{list: 'ordered'}, {list: 'bullet'}],
        ['link'],
        [{align: []}],
        ['code-block'],
        ['clean'],
    ],
};

const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'align',
    'color',
    'code-block',
];

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
    const [editorContent, setEditorContent] = useState(value);

    useEffect(() => {
        setEditorContent(value);
    }, [value]);

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        onChange(content);
    };

    return (
        <div>
            <QuillEditor
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                defaultValue={editorContent}
                onChange={handleEditorChange}
                placeholder="Write something amazing..."
                className="block w-full mt-1 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-text_color_dark"
            />
        </div>
    );
};

export default TextEditor;