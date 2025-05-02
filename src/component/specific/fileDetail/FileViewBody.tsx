import React, { useState, useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./FileView.scss";
import {
  CloudUpload,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { message } from "antd";
import { Canvas, Rect } from "fabric";
// Set the PDF.js worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "./pdf-worker.js",
  import.meta.url
).toString();

const FileViewBody = () => {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pdfFabric, setPdfFabric] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [annotations, setAnnotations] = useState<Record<number, Object[]>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRefFabric = useRef<HTMLCanvasElement | null>(null);

  const renderPage = async (pageNumber: number) => {
    if (!pdfDoc) return;

    const page = await pdfDoc.getPage(pageNumber);
    const canvas = canvasRef.current;

    const context = canvas?.getContext("2d");
    const viewport = page.getViewport({ scale, rotation: rotation });

    canvas!.height = viewport.height;
    canvas!.width = viewport.width;

    // Render the PDF page
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
    const fabricCanvas = new Canvas(canvasRefFabric.current!, {
      width: viewport?.width,
      height: viewport?.height,
    });
    fabricCanvas.backgroundColor = "#32a852";
    setPdfFabric(fabricCanvas);
  };

  // Handle file selection
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
      message.warning("Please select a valid PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      try {
        const loadingTask = pdfjsLib.getDocument(typedArray);
        const pdf = await loadingTask.promise;

        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setPageNum(1);
      } catch (error) {
        console.error("Error loading PDF:", error);
        message.warning("Error loading PDF file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Navigation functions
  const goToPrevPage = () => {
    if (pageNum > 1) {
      setPageNum((prevPageNum) => prevPageNum - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  // Zoom functions
  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  };

  // Rotation functions
  const rotateClockwise = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setRotation((prevRotation) => (prevRotation - 90 + 360) % 360);
  };

  const addRect = () => {
    if (pdfFabric) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 50,
        fill: "#28bd4f",
      });
      pdfFabric.add(rect);
    }
  };

  // Re-render when page number, scale or rotation changes
  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum);
    }
  }, [pdfDoc, pageNum, scale, rotation]);

  return (
    <div className="pdf-viewer">
      {pdfDoc && (
        <div className="">
          <div className="flex w-full flex-wrap gap-[15px] mb-[20px] p-[12px] bg-white rounded-[6px] shadow-md">
            <div className="page-controls">
              <button onClick={goToPrevPage} disabled={pageNum <= 1}>
                Previous
              </button>
              <span className="text-[14px] text-gray-500">
                Page {pageNum} of {totalPages}
              </span>
              <button onClick={goToNextPage} disabled={pageNum >= totalPages}>
                Next
              </button>
            </div>

            <div className="zoom-controls">
              <div
                onClick={zoomOut}
                className="w-[28px] h-[28px] rounded-[6px] border-[1px] border-[#DFE1E6] flex justify-center items-center cursor-pointer"
              >
                <ZoomOut strokeWidth={1} size={20} />
              </div>
              <span className="text-[14px] text-gray-500">
                {Math.round(scale * 100)}%
              </span>
              <div
                className="w-[28px] h-[28px] rounded-[6px] border-[1px] border-[#DFE1E6] flex justify-center items-center cursor-pointer"
                onClick={zoomIn}
              >
                <ZoomIn strokeWidth={1} size={20} />
              </div>
            </div>

            <div className="rotation-controls">
              <div
                className="w-[28px] h-[28px] rounded-[6px] border-[1px] border-[#DFE1E6] flex justify-center items-center cursor-pointer"
                onClick={rotateCounterClockwise}
              >
                <RotateCcw strokeWidth={1} size={20} />
              </div>
              <div
                onClick={rotateClockwise}
                className="w-[28px] h-[28px] rounded-[6px] border-[1px] border-[#DFE1E6] flex justify-center items-center cursor-pointer"
              >
                <RotateCw strokeWidth={1} size={20} />
              </div>
            </div>
            <div>
              <button onClick={addRect}>Add shape</button>
            </div>
          </div>
        </div>
      )}

      {pdfDoc ? (
        <div className="flex flex-col items-center justify-center h-full w-full  rounded-lg cursor-pointer bg-white p-4 overflow-auto">
          <div className="relative w-fit">
            <canvas ref={canvasRef} className="block shadow-md border" />
            <div className="absolute top-0 left-0 pointer-events-auto">
              <canvas ref={canvasRefFabric} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-[90vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            style={{
              fontWeight: "bold",
              flex: "unset",
              maxWidth: "unset",
            }}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudUpload />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">Upload file here</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default FileViewBody;
