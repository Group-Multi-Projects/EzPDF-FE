import React, { useState, useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./FileView.scss";
import {
  ArrowDownToLine,
  Circle,
  CloudUpload,
  LetterText,
  RectangleHorizontal,
  RotateCcw,
  RotateCw,
  Triangle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button, message } from "antd";
import {
  Canvas,
  Control,
  Rect,
  TDegree,
  TPointerEvent,
  TRadian,
  Transform,
  util,
} from "fabric";
import deleteIconSvg from "@/assets/svg/delete_control.svg";
import {
  addCircle,
  addRect,
  addTriangle,
  deleteActiveObject,
} from "@/helper/shape";
import {
  addText,
  changeColor,
  changeFontFamily,
  toggleBold,
  toggleItalic,
  toggleUnderline,
} from "@/helper/addText";
// Set the PDF.js worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "./pdf-worker.js",
  import.meta.url
).toString();

const FileViewBody = () => {
  const [loading, setLoading] = useState(false);
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
    const viewport = page.getViewport({ scale, rotation });

    canvas!.height = viewport.height;
    canvas!.width = viewport.width;

    // Render PDF content
    const renderContext = {
      canvasContext: context!,
      viewport,
    };
    await page.render(renderContext).promise;

    if (pdfFabric) {
      pdfFabric.dispose();
    }

    const newFabricCanvas = new Canvas(canvasRefFabric.current!, {
      width: viewport.width,
      height: viewport.height,
      selection: true,
    });

    if (annotations[pageNumber]) {
      newFabricCanvas.loadFromJSON(annotations[pageNumber], () => {
        requestAnimationFrame(() => {
          newFabricCanvas.renderAll();
        });
      });
    } else {
      newFabricCanvas.renderAll();
    }

    setPdfFabric(newFabricCanvas);
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
        message.error("Error loading PDF file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const saveCurrentAnnotations = () => {
    if (pdfFabric) {
      setAnnotations((prev) => ({
        ...prev,
        [pageNum]: pdfFabric.toJSON(),
      }));
    }
  };

  const goToPrevPage = () => {
    if (pageNum > 1) {
      saveCurrentAnnotations();
      setPageNum((prevPageNum) => prevPageNum - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNum < totalPages) {
      saveCurrentAnnotations();
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

  // Re-render when page number, scale or rotation changes
  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum);
    }
  }, [pdfDoc, pageNum, scale, rotation]);

  return (
    <div className="pdf-viewer">
      {pdfDoc && (
        <div className="flex justify-between mb-[20px] p-[12px] bg-white rounded-[6px] shadow-md">
          <div className="flex w-full flex-wrap gap-[15px] ">
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

            <div className="flex gap-2">
              <button onClick={() => addRect(pdfFabric)}>
                <RectangleHorizontal strokeWidth={1.5} size={20} />
              </button>
              <button onClick={() => addCircle(pdfFabric)}>
                <Circle strokeWidth={1.5} size={20} />
              </button>
              <button onClick={() => addTriangle(pdfFabric)}>
                <Triangle strokeWidth={1.5} size={20} />
              </button>
              <button onClick={() => addText(pdfFabric)}>
                <LetterText strokeWidth={1.5} size={20} />
              </button>
              <button onClick={() => deleteActiveObject(pdfFabric)}>
                Delete
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => toggleBold(pdfFabric)}>B</button>
              <button onClick={() => toggleItalic(pdfFabric)}>I</button>
              <button onClick={() => toggleUnderline(pdfFabric)}>U</button>
              {/* <input type="color" onChange={()=>changeColor(pdfFabric)} />
              <select onChange={()=>changeFontFamily(pdfFabric, e)}>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
              </select> */}
            </div>
          </div>
          <div>
            <Button
              loading={loading}
              type="primary"
              className="px-3 py-5 rounded-xl"
              style={{ backgroundColor: "#4258F1" }}
              // onClick={() => setIsOpenModal(true)}
            >
              <div className="flex justify-center items-center gap-x-[8px] text-[#FFFFFF]">
                {loading ? null : <ArrowDownToLine strokeWidth={1.75} size={20}/>}
                <div>{loading ? "Saving..." : "Save"}</div>
              </div>
            </Button>
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

function deleteObject(
  _eventData: TPointerEvent,
  _transform: Transform,
  _x: number,
  _y: number
) {
  throw new Error("Function not implemented.");
}

function renderIcon(icon: string) {
  return (
    ctx: {
      save: () => void;
      translate: (arg0: any, arg1: any) => void;
      rotate: (arg0: TRadian) => void;
      drawImage: (
        arg0: any,
        arg1: number,
        arg2: number,
        arg3: any,
        arg4: any
      ) => void;
      restore: () => void;
    },
    left: any,
    top: any,
    _styleOverride: any,
    fabricObject: { angle: TDegree }
  ) => {
    const size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };
}
