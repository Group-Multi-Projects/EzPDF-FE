import { useState, useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import {
  ArrowDownToLine,
  Circle,
  CircleX,
  CloudUpload,
  LetterText,
  RectangleHorizontal,
  RotateCcw,
  RotateCw,
  Save,
  Trash,
  Triangle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button, Empty, message } from "antd";
import { Canvas } from "fabric";
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
import apiService from "@/service";
import { useParams } from "react-router-dom";
// Set the PDF.js worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "./pdf-worker.js",
  import.meta.url
).toString();

const FileDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pdfDoc, setPdfDoc] = useState<any>(null); // dữ liệu pdf
  const [canvasId, setCanvasId] = useState(null);
  const [pdfFabric, setPdfFabric] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [annotations, setAnnotations] = useState<Record<number, Object[]>>({});

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showTextStyleButtons, setShowTextStyleButtons] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRefFabric = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<Canvas | null>(null);

  useEffect(() => {
    const handleSelection = () => {
      const activeObject = pdfFabric?.getActiveObject();
      setShowDeleteButton(!!activeObject); // Có object là true

      // Chỉ hiện khi là object type "text" hoặc "i-text"
      if (
        activeObject &&
        (activeObject.type === "text" || activeObject.type === "i-text")
      ) {
        setShowTextStyleButtons(true);
      } else {
        setShowTextStyleButtons(false);
      }
    };

    if (pdfFabric) {
      pdfFabric.on("selection:created", handleSelection);
      pdfFabric.on("selection:updated", handleSelection);
      pdfFabric.on("selection:cleared", () => {
        setShowDeleteButton(false);
        setShowTextStyleButtons(false);
      });
    }

    return () => {
      if (pdfFabric) {
        pdfFabric.off("selection:created", handleSelection);
        pdfFabric.off("selection:updated", handleSelection);
        pdfFabric.off("selection:cleared");
      }
    };
  }, [pdfFabric]);

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
    fabricRef.current = newFabricCanvas;
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

    const handleLoadPdfFromApi = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();

      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;

      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setPageNum(1);
    } catch (error) {
      console.error("Error loading PDF from API:", error);
      message.error("Error loading PDF file from server");
    }
  };

  const getSaveAll = async () => {
    let file_id = String(id);
    let res = await apiService.canvas.get(file_id, pageNum);
    setCanvasId(res.data.DT.id);

    let savedJson = res.data.DT.json_canvas;
    let canvas = fabricRef.current;
    if (typeof savedJson === "string") {
      savedJson = JSON.parse(savedJson);
    }
    canvas?.loadFromJSON(savedJson, () => {
      requestAnimationFrame(() => {
        canvas.requestRenderAll();
      });
    });
  };

  const saveAll = async () => {
    let canvas = fabricRef.current;
    let file_id = Number(id);
    const canvasJson = JSON.stringify(canvas?.toJSON());
    const payload = {
      file_id: file_id,
      json_canvas: canvasJson,
      page_canvas:pageNum
    };
    try {
      if (canvasId) {
        let res = await apiService.canvas.update(canvasId, {
          json_canvas: canvasJson,
        });
        if (res.data.EC === 0) {
          message.success("Lưu dữ liệu thành công");
        }
      } else {
        let res = await apiService.canvas.create(payload);
        if (res.data.EC === 0) {
          message.success("Lưu dữ liệu thành công");
        }
      }
    } catch (error) {
      console.error("Error save canvas:", error);
      message.error("Error save canvas");
    }
  };

    const deleteCanvas = async () => {
    try {
      if (canvasId) {
        let res = await apiService.canvas.delete(canvasId);
        if (res.data.EC === 0) {
          message.success("Dữ liệu của canvas đã được xóa");
        }
      }else{
        message.warning("Không tìm thấy các đối tượng trong canvas");
      }

    } catch (error) {
      console.error("Error delete canvas:", error);
      message.error("Error delete canvas");
    }
  };

  const fetchFile = async () => {
    const res = await apiService.files.getDetail(id);
    if (res?.data.EC === 0) {
      const fileUrl = res.data.DT.file_url;
      await handleLoadPdfFromApi(fileUrl);
    }
  };

  useEffect(() => {
    console.log('create canvas');
    
    if (canvasRef.current) {
      fabricRef.current = new Canvas(canvasRef.current);
    }
  }, []);

useEffect(() => {
  const loadPageAndCanvas = async () => {
    if (pdfDoc) {
      await renderPage(pageNum);       // Render PDF + tạo Fabric Canvas
      await getSaveAll();              // Sau khi đã tạo Fabric canvas → load JSON
    }
  };

  loadPageAndCanvas();
}, [pdfDoc, pageNum, scale, rotation]);





  useEffect(() => {
    fetchFile();
  }, []);

  const controlBtnClass =
    "w-[28px] h-[28px] rounded-[6px] border border-[#DFE1E6] flex justify-center items-center cursor-pointer";

  // Các nút vẽ hình
  const shapeButtons = [
    {
      onClick: () => addRect(pdfFabric),
      icon: <RectangleHorizontal strokeWidth={1.5} size={20} />,
    },
    {
      onClick: () => addCircle(pdfFabric),
      icon: <Circle strokeWidth={1.5} size={20} />,
    },
    {
      onClick: () => addTriangle(pdfFabric),
      icon: <Triangle strokeWidth={1.5} size={20} />,
    },
    {
      onClick: () => addText(pdfFabric),
      icon: <LetterText strokeWidth={1.5} size={20} />,
    },
    {
      onClick: () => deleteActiveObject(pdfFabric),
      icon: <Trash strokeWidth={1.5} size={20} />,
    },
  ];

  // Nút định dạng chữ
  const textStyleButtons = [
    { label: "B", onClick: () => toggleBold(pdfFabric) },
    { label: "I", onClick: () => toggleItalic(pdfFabric) },
    { label: "U", onClick: () => toggleUnderline(pdfFabric) },
  ];
  return (
    <div className="pdf-viewer">
      <div className="fixed top-0 left-0 right-0 z-[1050]">
      <div className="flex justify-between mb-[20px] p-[12px] bg-white rounded-[6px] shadow-md">
        <div className="flex w-full items-center flex-wrap gap-[15px] ">
          {/* Page controls */}
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

          {/* Zoom controls */}
          <div className="zoom-controls flex gap-2 items-center">
            <div className={controlBtnClass} onClick={zoomOut}>
              <ZoomOut strokeWidth={1} size={20} />
            </div>
            <span className="text-[14px] text-gray-500">
              {Math.round(scale * 100)}%
            </span>
            <div className={controlBtnClass} onClick={zoomIn}>
              <ZoomIn strokeWidth={1} size={20} />
            </div>
          </div>

          {/* Rotation controls */}
          <div className="rotation-controls flex gap-2">
            <div className={controlBtnClass} onClick={rotateCounterClockwise}>
              <RotateCcw strokeWidth={1} size={20} />
            </div>
            <div className={controlBtnClass} onClick={rotateClockwise}>
              <RotateCw strokeWidth={1} size={20} />
            </div>
          </div>

          {/* Shape buttons */}
          <div className="flex gap-2">
            {shapeButtons.map((btn, index) => {
              // Nếu là delete button thì kiểm tra showDeleteButton
              if (btn.icon.type === Trash && !showDeleteButton) return null;
              return (
                <button
                  key={index}
                  className={controlBtnClass}
                  onClick={btn.onClick}
                >
                  {btn.icon}
                </button>
              );
            })}
          </div>

          {/* Text style buttons (B, I, U) */}
          {showTextStyleButtons && (
            <div className="flex gap-2">
              {textStyleButtons.map((btn, index) => (
                <button
                  key={index}
                  className={controlBtnClass}
                  onClick={btn.onClick}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            loading={loading}
            className="px-3 py-5 rounded-xl"
            onClick={deleteCanvas}
          >
            <div className="flex justify-center items-center gap-x-[8px]">
              {loading ? null : (
                <CircleX
                  className="text-red-500"
                  strokeWidth={1.75}
                  size={20}
                />
              )}
              <div>{"Xóa dữ liệu"}</div>
            </div>
          </Button>

          <Button
            loading={loading}
            type="primary"
            className="px-3 py-5 rounded-xl"
            style={{ backgroundColor: "#4258F1" }}
            onClick={saveAll}
          >
            <div className="flex justify-center items-center gap-x-[8px] text-[#FFFFFF]">
              {loading ? null : <Save strokeWidth={1.75} size={20} />}
              <div>{loading ? "Saving..." : "Lưu"}</div>
            </div>
          </Button>
        </div>
      </div>        
      </div>


      <div className="mt-11 flex flex-col items-center justify-center h-full w-full  rounded-lg cursor-pointer bg-white p-4 overflow-auto">
        {pdfDoc ? (
          <>
            {" "}
            <div className="relative w-fit">
              <canvas ref={canvasRef} className="block shadow-md border" />
              <div className="absolute top-0 left-0 pointer-events-auto">
                <canvas ref={canvasRefFabric} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Empty description={<>File not found</>} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileDetail;
