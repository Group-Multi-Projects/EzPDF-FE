import "./style.scss";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { RootState, AppDispatch } from "@/store";
import {
  uploadFile,
  resetUploadState,
  UploadResponse,
} from "@/store/upload_slice";
import {
  faArrowDown,
  faCircle,
  faICursor,
  faSquare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonTool } from "@/component/authed/tool";
import { ShapeType } from "@/type";

const Edit = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, data } = useSelector((state: RootState) => state.upload);
  const { user } = useSelector((state: RootState) => state.auth);
  const [requestType] = useState<string>("editfile");

  //add shape
  const editContainer = useRef<HTMLDivElement | null>(null);
  const [isAddingShape, setIsAddingShape] = useState(false);

  const [shapeType, setShapeType] = useState<ShapeType>('square')

  // add image
  const [isAddingImage, setIsAddingImage] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  // const handleReset = () => {
  //   dispatch(resetUploadState());
  // };


  const addShape = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: ShapeType,
    size: number = 50
  ) => {
    // Kiểm tra isAddingShape là true mới cho phép thêm hình
    if (!isAddingShape) return;

    if (editContainer.current) {
      const shape = document.createElement("div");
      shape.classList.add(type);
      shape.style.position = "absolute";
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;

      const containerRect = editContainer.current.getBoundingClientRect();
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;

      shape.style.left = `${x - size / 2}px`;
      shape.style.top = `${y - size / 2}px`;

      switch (type) {
        case "circle":
          shape.style.borderRadius = "50%";
          shape.style.backgroundColor = "blue";
          break;
        case "triangle":
          shape.style.width = "0";
          shape.style.height = "0";
          shape.style.borderLeft = `${size / 2}px solid transparent`;
          shape.style.borderRight = `${size / 2}px solid transparent`;
          shape.style.borderBottom = `${size}px solid red`;
          break;
        case "square":
        default:
          shape.style.backgroundColor = "green";
          break;
      }

      // Thêm điểm kéo dãn
      const resizeHandle = document.createElement("div");
      resizeHandle.classList.add("resize-handle");
      resizeHandle.style.position = "absolute";
      resizeHandle.style.right = "0";
      resizeHandle.style.bottom = "0";
      resizeHandle.style.width = "10px";
      resizeHandle.style.height = "10px";
      resizeHandle.style.backgroundColor = "black";
      shape.appendChild(resizeHandle);

      makeDraggable(shape);
      makeResizable(shape, resizeHandle);
      

      editContainer.current.appendChild(shape);
    }
   setIsAddingShape(false) 
  };
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
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

      // Add draggable functionality
      makeDraggable(image);

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
      element.style.zIndex = "1000";
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
  const makeResizable = (element: HTMLDivElement, resizeHandle: HTMLDivElement) => {
    let isResizing = false;
    let initialWidth = 0;
    let initialHeight = 0;
    let initialX = 0;
    let initialY = 0;

    resizeHandle.addEventListener("mousedown", (e) => {
      isResizing = true;
      initialWidth = parseFloat(element.style.width);
      initialHeight = parseFloat(element.style.height);
      initialX = e.clientX;
      initialY = e.clientY;
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (isResizing) {
        const deltaX = e.clientX - initialX;
        const deltaY = e.clientY - initialY;

        element.style.width = `${initialWidth + deltaX}px`;
        element.style.height = `${initialHeight + deltaY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      if (isResizing) {
        isResizing = false;
      }
    });
  };
  const Square = () => {
    setIsAddingShape(true)
    setShapeType('square')
  }
  const Circle = () =>{
    setIsAddingShape(true)
    setShapeType('circle')
  }
  const Triangle =() =>{
    setIsAddingShape(true)
    setShapeType('triangle')
  }
  const Image = () =>[
    
  ]
  return (
    <>
      {data && (
        <div>
          <div className="flex items-center justify-between p-2 shadow-sm w-full">
            <div className="flex">
              {/* <ButtonTool onClick={addText} icon={faICursor} ariaLabel="Add Text" /> */}
              <ButtonTool
                onClick={Square}
                icon={faSquare}
                ariaLabel="Add Shape"
              />
              <ButtonTool onClick={Circle} icon={faCircle} ariaLabel="Add Shape" />
              <ButtonTool onClick={Triangle} icon={faStar} ariaLabel="Add Shape" />
            </div>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-3 me-2"
            >
              Save all <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </div>
      )}
      <div className="p-10">
        <div className="flex flex-col items-center justify-center w-full">
          {!isLoading && data ? (
            <>
              {/* Hiển thị html từ api ở đây */}
              <div
                className="border"
                ref={editContainer}
                onClick={(e) => addShape(e, shapeType, 50)} // Tạo hình vuông
                style={{
                  position: "relative", // Đảm bảo phần tử chứa có vị trí tương đối
                  width: "100%",
                  height: "100%",
                }}
              >
                <style>{data.style}</style>
                <div
                  dangerouslySetInnerHTML={{ __html: data.body }}
                  contentEditable={false}
                />
              </div>
            </>
          ) : (
            <>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
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
                  onChange={handleFileChange} // Gọi API khi chọn file
                />
              </label>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
