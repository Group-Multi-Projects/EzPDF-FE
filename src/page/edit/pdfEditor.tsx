import './styles.scss'
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import MenuBar from "@/component/menuBar/menuBar";
import TextStyle from "@tiptap/extension-text-style";
import Image from '@tiptap/extension-image';
import { Node, mergeAttributes } from '@tiptap/core';

// Tạo custom node cho shape
const Shape = Node.create({
  name: 'shape',
  draggable:true,
  group: 'block',

  addAttributes() {
    return {
      type: {
        default: 'rectangle', // Mặc định là hình chữ nhật
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-shape]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const shapeStyle =
      HTMLAttributes.type === 'circle'
        ? 'width: 100px; height: 100px; border-radius: 50%; background: #C754A8;'
        : 'width: 150px; height: 100px; background: #C754A8;';
    return ['div', mergeAttributes({ 'data-shape': '', style: shapeStyle }), ''];
  },
});
const EditPage = () => {
//   const [pdfContent, setPdfContent] = useState<string | null>(null);

//   // Fetch PDF content as HTML from the server
//   useEffect(() => {
//     const fetchPdf = async () => {
//       const response = await fetch("https://your-server.com/api/pdf"); // Replace with your server API
//       const data = await response.text();
//       setPdfContent(data); // Assume server returns an HTML string of the PDF
//     };
//     fetchPdf();
//   }, []);

const FakeDataHTML = `<h3 style="text-align:center">
          Devs Just Want to Have Fun by Cyndi Lauper
        </h3>
        <p style="text-align:center">
          I come home in the morning light<br>
          My mother says, <mark>“When you gonna live your life right?”</mark><br>
          Oh mother dear we’re not the fortunate ones<br>
          And devs, they wanna have fun<br>
          Oh devs just want to have fun</p>
        <p style="text-align:center">
          The phone rings in the middle of the night<br>
          My father yells, "What you gonna do with your life?"<br>
          Oh daddy dear, you know you’re still number one<br>
          But <s>girls</s>devs, they wanna have fun<br>
          Oh devs just want to have
        </p>
        <p style="text-align:center">
          That’s all they really want<br>
          Some fun<br>
          When the working day is done<br>
          Oh devs, they wanna have fun<br>
          Oh devs just wanna have fun<br>
          (devs, they wanna, wanna have fun, devs wanna have)
        </p>`
  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Color,
      TextStyle,
      Image,
      Shape
    ],
    // content: pdfContent || "<p>Loading PDF...</p>", // Default content if PDF is not yet loaded
    content: FakeDataHTML,
  });

  if (!editor) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div>

      <h1 className='text-center text-3xl m-3'>PDF Editor</h1>
      
      {/* Toolbar for editor controls */}
      <MenuBar editor={editor} />
      {/* Editor content */}
      <div className='editor-content'>
      <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditPage;
