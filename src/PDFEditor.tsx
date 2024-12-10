import React, { useEffect, useState } from 'react';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Đặt đường dẫn tới worker của PDF.js
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

interface PDFEditorProps {
  file: File;
}

const PDFEditor: React.FC<PDFEditorProps> = ({ file }) => {
  const [pdfContent, setPdfContent] = useState<string>('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    const loadPdfContent = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc: PDFDocumentProxy = await getDocument(arrayBuffer).promise;

      // Đọc nội dung từ trang đầu tiên
      const page = await pdfDoc.getPage(1);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item: any) => item.str).join(' ');

      setPdfContent(text);
      editor?.commands.setContent(text);
    };

    loadPdfContent();
  }, [file, editor]);

  const handleSave = () => {
    if (!editor) return;
    const newContent = editor.getHTML();
    console.log('Edited Content:', newContent);
    // Thêm logic lưu nội dung vào PDF
  };

  return (
    <div style={{ padding: '20px' }}>
      <EditorContent editor={editor} />
      <button onClick={handleSave} style={{ marginTop: '10px' }}>
        Save Changes
      </button>
    </div>
  );
};

export default PDFEditor;
