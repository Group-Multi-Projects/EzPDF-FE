import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

const FabricCanvasApp: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasContainerRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (canvasContainerRef.current) {
      // Tạo một Fabric canvas
      const canvas = new fabric.Canvas(canvasContainerRef.current, {
        width: 800,
        height: 500,
        backgroundColor: '#f3f3f3',
      });

      // Lưu tham chiếu của canvas
      canvasRef.current = canvas;

      return () => {
        canvas.dispose(); // Cleanup khi component unmount
      };
    }
  }, []);

  const addText = () => {
    if (canvasRef.current) {
      const text = new fabric.IText('Click to edit', {
        left: 50,
        top: 50,
        fontSize: 24,
        fill: '#000',
        editable: true, // Cho phép chỉnh sửa
      });
  
      canvasRef.current.add(text); // Thêm văn bản vào canvas
      canvasRef.current.setActiveObject(text); // Đặt làm đối tượng hoạt động
  
      // Kích hoạt chế độ chỉnh sửa ngay lập tức
      text.enterEditing();
      text.selectAll();
    }
  };
  

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={addText}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow"
      >
        Add Text
      </button>
      <canvas ref={canvasContainerRef} className="border shadow"></canvas>
    </div>
  );
};

export default FabricCanvasApp;
