import "./style.scss";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { RootState, AppDispatch } from "@/store";
import { uploadFile } from "@/store/upload_slice";
import {
  faArrowDown,
  faCircle,
  faCircleXmark,
  faFont,
  faImage,
  faPenToSquare,
  faSquare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShapeType } from "@/type";
import { ButtonTool } from "@/component/specific/tool";

const Edit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data } = useSelector((state: RootState) => state.upload);
  const { isLoading_convert } = useSelector(
    (state: RootState) => state.convert
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAddingShape, setIsAddingShape] = useState(false);
  const [contentEditable, setContentEditable] = useState(false);
  const editContainer = useRef<HTMLDivElement | null>(null);
  const [shapeType, setShapeType] = useState<ShapeType>("square");
  const [uploadedFileName, setUploadedFileName] = useState<string | undefined>(
    ""
  );
  const [requestType, setRequestType] = useState<string>("editfile");
  const [actionType, setActionType] = useState<
    "shape" | "image" | "text" | "draw"
  >("shape");
  const [isAddingImage, setIsAddingImage] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    switch (actionType) {
      case "shape":
        addShape(e, shapeType, 50);
        break;
      case "image":
        addImage(e);
        break;
      default:
        break;
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadedFileName(file?.name);
    if (!file) {
      console.log("Please provide a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("request_type", requestType);

    try {
      await dispatch(uploadFile(formData)); // Gọi API ngay khi chọn file
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const addShape = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: ShapeType,
    size: number = 50
  ) => {
    if (!isAddingShape) return;

    if (editContainer.current) {
      const shape = document.createElement("div");
      shape.classList.add(type);
      shape.style.position = "absolute";

      const containerRect = editContainer.current.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;

      shape.style.left = `${x - size / 2}px`;
      shape.style.top = `${y - size / 2}px`;

      switch (type) {
        case "circle":
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.borderRadius = "50%";
          shape.style.backgroundColor = "blue";
          break;
        case "star":
          shape.style.width = `${size}px`;
          shape.style.aspectRatio = "1";
          shape.style.background = "#F8CA00";
          shape.style.clipPath = `polygon(
            50% 0,
            calc(50% * (1 + sin(.4turn))) calc(50% * (1 - cos(.4turn))),
            calc(50% * (1 - sin(.2turn))) calc(50% * (1 - cos(.2turn))),
            calc(50% * (1 + sin(.2turn))) calc(50% * (1 - cos(.2turn))),
            calc(50% * (1 - sin(.4turn))) calc(50% * (1 - cos(.4turn)))
          )`;
          break;
        case "text":
          shape.style.width = "auto";
          shape.style.height = "auto";
          shape.style.padding = "5px";
          shape.style.color = "black";
          shape.style.fontSize = "16px";
          shape.style.fontFamily = "Arial, sans-serif";
          shape.style.backgroundColor = "transparent";
          shape.style.border = "1px dashed #ccc";
          shape.contentEditable = "true";
          shape.innerText = "Edit me";
          break;
        case "square":
        default:
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.backgroundColor = "green";
          break;
      }
      if (type !== "text") {
        const resizeHandle = document.createElement("div");
        resizeHandle.classList.add("resize-handle");
        resizeHandle.style.position = "absolute";
        resizeHandle.style.right = "0";
        resizeHandle.style.bottom = "0";
        resizeHandle.style.width = "10px";
        resizeHandle.style.height = "10px";
        resizeHandle.style.backgroundColor = "black";
        shape.appendChild(resizeHandle);

        makeResizable(shape, resizeHandle);
      }

      makeDraggable(shape);

      editContainer.current.appendChild(shape);
    }
    setIsAddingShape(false);
  };
  // add image

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setImageSrc(event.target?.result as string); // Set image source
        setIsAddingImage(true); // Set flag to add image
      };
      reader.readAsDataURL(file);
    }
    setActionType("image");
  };

  const addImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isAddingImage && imageSrc) {
      const canvasContainer = e.currentTarget;
      const x = e.clientX - canvasContainer.offsetLeft;
      const y = e.clientY - canvasContainer.offsetTop;

      const image = document.createElement("img");
      image.classList.add("image");
      image.src = imageSrc;

      // Set image position
      image.style.left = `${x - 50}px`; // Center image on click
      image.style.top = `${y - 50}px`;
      image.style.height = "50px";
      image.style.width = "50px";
      // Thêm điểm kéo dãn
      const resizeHandle = document.createElement("div");
      resizeHandle.classList.add("resize-handle");
      resizeHandle.style.position = "absolute";
      resizeHandle.style.right = "0";
      resizeHandle.style.bottom = "0";
      resizeHandle.style.width = "10px";
      resizeHandle.style.height = "10px";
      resizeHandle.style.backgroundColor = "black";
      image.appendChild(resizeHandle);

      // Add draggable functionality
      makeDraggable(image);
      makeResizable(image, resizeHandle);
      // Add image to canvas
      canvasContainer.appendChild(image);

      // Reset state
      setIsAddingImage(false);
    }
  };

  // Hàm thêm tính năng kéo thả
  const makeDraggable = (element: HTMLDivElement) => {
    let offsetX = 0,
      offsetY = 0,
      isDragging = false;

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      offsetX = event.clientX - element.offsetLeft;
      offsetY = event.clientY - element.offsetTop;
      element.style.zIndex = "9";
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        element.style.zIndex = "1";
      }
    };

    element.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Hàm thêm tính năng kéo dãn
  const makeResizable = (
    element: HTMLDivElement,
    resizeHandle: HTMLDivElement
  ) => {
    let isResizing = false;
    let initialSize = 0; // Kích thước ban đầu
    let initialX = 0;
    let initialY = 0;

    resizeHandle.addEventListener("mousedown", (e) => {
      isResizing = true;
      // Lấy kích thước ban đầu
      initialSize = parseFloat(element.style.width); // Dùng width vì height = aspect-ratio
      initialX = e.clientX;
      initialY = e.clientY;
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (isResizing) {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;

        // Tính kích thước mới dựa trên thay đổi
        const newSize = Math.max(initialSize + Math.max(deltaX, deltaY), 20); // Đặt kích thước tối thiểu
        element.style.width = `${newSize}px`;
        element.style.height = `${newSize}px`; // Đảm bảo tỷ lệ vuông

        // Cập nhật clip-path nếu là star
        if (element.classList.contains("star")) {
          element.style.clipPath = `polygon(
            50% 0,
            calc(50% * (1 + sin(.4turn))) calc(50% * (1 - cos(.4turn))),
            calc(50% * (1 - sin(.2turn))) calc(50% * (1 - cos(.2turn))),
            calc(50% * (1 + sin(.2turn))) calc(50% * (1 - cos(.2turn))),
            calc(50% * (1 - sin(.4turn))) calc(50% * (1 - cos(.4turn)))
          )`;
        }
      }
    });

    document.addEventListener("mouseup", () => {
      if (isResizing) {
        isResizing = false;
      }
    });
  };

  // Các hàm add shape, add text
  const Square = () => {
    setIsAddingShape(true);
    setShapeType("square");
  };
  const Circle = () => {
    setIsAddingShape(true);
    setShapeType("circle");
  };
  const Star = () => {
    setIsAddingShape(true);
    setShapeType("star");
  };
  const Text = () => {
    setIsAddingShape(true);
    setShapeType("text");
  };
  const handleEditContent = () => {
    setContentEditable((prev) => !prev);
  };
   // Hàm tăng giảm zoom
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2)); // Zoom tối đa 200%
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5)); // Zoom tối thiểu 50%
  const SaveAll = () => {
    if (!editContainer.current) return;

    const printContent = editContainer.current.innerHTML;
    const originalContent = document.body.innerHTML; // Lưu nội dung gốc

    document.body.innerHTML = printContent; // Chỉ hiển thị nội dung cần in
    window.print(); // In nội dung

    document.body.innerHTML = originalContent; // Khôi phục lại nội dung sau khi in
    location.reload(); // Tải lại trang để đảm bảo mọi thứ hoạt động đúng
  };

  return (
    <>
      {data && (
        <div style={{ zIndex: 1000 }}>
          <div className="w-full bg-white flex items-center justify-between p-2 shadow-sm">
            <div className="flex">
              <ButtonTool
                onClick={Square}
                icon={faSquare}
                ariaLabel="Add Shape"
              />
              <ButtonTool
                onClick={Circle}
                icon={faCircle}
                ariaLabel="Add Shape"
              />
              <ButtonTool onClick={Star} icon={faStar} ariaLabel="Add Shape" />
              <ButtonTool
                onClick={Text}
                icon={faFont} // Icon tương ứng (có thể sử dụng FontAwesome hoặc bất kỳ thư viện nào)
                ariaLabel="Add Text"
              />
              <ButtonTool
                onClick={handleEditContent}
                icon={contentEditable ? faCircleXmark : faPenToSquare} // Icon tương ứng (có thể sử dụng FontAwesome hoặc bất kỳ thư viện nào)
                ariaLabel="Edit"
              />
              {/* Nút thêm hình ảnh */}
              <label
                className="p-2 border"
                htmlFor="image-upload"
                style={{ cursor: "pointer", marginLeft: "10px" }}
                aria-label="Add image"
              >
                <FontAwesomeIcon icon={faImage} />
              </label>
              <input
                className="hidden"
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {data && (
                <div style={{ zIndex: 1000 }}>
                  {/* Thanh công cụ với nút Zoom */}
                  <div className="w-full bg-white flex items-center justify-between p-2 shadow-sm">
                    <div className="flex gap-2">
                      <button
                        className="p-2 border rounded"
                        onClick={handleZoomIn}
                      >
                        +
                      </button>
                      <button
                        className="p-2 border rounded"
                        onClick={handleZoomOut}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={SaveAll}
              type="button"
              className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-3 me-2"
            >
              <span className="me-2">
                {" "}
                {isLoading_convert ? "Saving data..." : "Save all"}{" "}
              </span>
              <span>
                {isLoading_convert ? (
                  <BeatLoader size={3} color="#fff" />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </span>
            </button>
          </div>
        </div>
      )}
      <div className="p-10">
        {!isLoading && data ? (
          <>
            <div
              className="border relative w-full h-screen z-1"
              ref={editContainer}
              onClick={handleClick}
            >
              <div
                dangerouslySetInnerHTML={{ __html: data.html_content }}
                contentEditable={contentEditable}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "top left", 
                  width: `${100 / zoomLevel}%`, 
                  height: `${100 / zoomLevel}%`,
                  zIndex: "10",
                }}
              />
            </div>
          </>
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
              {isLoading ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  Uploading...
                </LoadingButton>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUploadOutlinedIcon fontSize="large" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Upload file here</p>
                </div>
              )}
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
    </>
  );
};

export default Edit;
