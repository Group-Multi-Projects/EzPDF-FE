import "./style.scss";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import {  BeatLoader, PuffLoader, SyncLoader } from "react-spinners";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { RootState, AppDispatch } from "@/store";
import {
  uploadFile,
  resetUploadState,
} from "@/store/upload_slice";
import {
  faArrowDown,
  faCircle,
  faCircleXmark,
  faFont,
  faImage,
  faPenToSquare,
  faSquare,
  faStar,
  faPencil
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonTool } from "@/component/authed/tool";
import { ShapeType } from "@/type";
import { convertFile, HTMLtoPDFResponse } from "@/store/convert_slice";

const Edit = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data } = useSelector((state: RootState) => state.upload);
  const {isLoading_convert} = useSelector((state:RootState) => state.convert)

  const [contentEditable, setContentEditable] = useState(false)
  const editContainer = useRef<HTMLDivElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | undefined>("");
  const [requestType, setRequestType] = useState<string>("editfile");
  const [actionType, setActionType] = useState<"shape" | "image" | "text"|"draw">(
    "shape"
  );
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    switch (actionType) {
      case "shape":
        addShape(e, shapeType, 50);
        break;
      case "image":
        addImage(e);
        break;
      // case "text":
      //   addText(e, "Sample Text");
      //   break;
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
  // const handleReset = () => {
  //   dispatch(resetUploadState());
  // };

  //add shape
  
  const [isAddingShape, setIsAddingShape] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const [shapeType, setShapeType] = useState<ShapeType>("square");
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
  
      // Thêm điểm kéo dãn nếu không phải là text
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
  
  ////Draw vẽ
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas reference
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [lineColor, setLineColor] = useState('#000');
  const [lineWidth, setLineWidth] = useState(5);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 1000, height:1000 });
  useEffect(() => {
    const updateContainerSize = () => {
      if (editContainer.current) {
        setContainerSize({
          width: editContainer.current.offsetWidth,  // Lấy chiều rộng của thẻ cha
          height: editContainer.current.offsetHeight, // Lấy chiều cao của thẻ cha
        });
      }
    };
    // Gọi hàm khi component mount và khi cửa sổ thay đổi kích thước
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    // Dọn dẹp event listener khi component unmount
    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, [data]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (editContainer.current) {
      const rect = editContainer.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [data]);


  useEffect(() => {
    console.log(  "============================");
    const handleScroll = () => {
     
        
        setPosition({ top: editContainer.current?.getBoundingClientRect().top,  // Lấy vị trí cuộn dọc
        left: editContainer.current?.getBoundingClientRect().left, });
      
    };

    
    window?.addEventListener("scroll", handleScroll);
    

    return () => {

        window.removeEventListener("scroll", handleScroll);
      
    };
  }, [data ]);








  // Hàm bắt đầu vẽ
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const { offsetX, offsetY } = e.nativeEvent;
        setLastX(offsetX);
        setLastY(offsetY);
        setIsDrawing(true);
      }
    }
  };

  // Hàm vẽ
  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (canvas && isDrawing) {
      const context = canvas.getContext('2d');
      if (context) {
        const { offsetX, offsetY } = e.nativeEvent;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(offsetX, offsetY);
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        context.stroke();
        
        setLastX(offsetX);
        setLastY(offsetY);
      }
    }
  };

  // Hàm dừng vẽ
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  ////
  // add image
  const [isAddingImage, setIsAddingImage] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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
  const Text = () =>{
    setIsAddingShape(true);
    setShapeType("text");
  }
  const Draw = () =>{
    setIsDrawingMode(!isDrawingMode);
  }
  const handleEditContent = () =>{
    setContentEditable((prev) => !prev)
  }

// Hàm save nội dung PDF
  const SaveAll = async () =>{
    setRequestType('html2pdf')
    if (editContainer.current) {
    const htmlContent = editContainer.current.innerHTML;

        // Lấy thời gian hiện tại
    const now = new Date();
    const dateTime = now.toISOString().replace(/[:.-]/g, "_"); // Thay thế ký tự đặc biệt

    // Tên tệp gốc từ file đã tải lên
    const baseFileName = uploadedFileName?.split(".")[0]; // Bỏ phần mở rộng

    // Tạo tên tệp mới
    const newFileName = `${baseFileName}_${dateTime}.html`;

    // Tạo Blob từ nội dung HTML
    const blob = new Blob([htmlContent], { type: "text/html" });
    
    // Tạo URL từ Blob
  
    const formData = new FormData();

    formData.append("file", blob, newFileName);
    formData.append("request_type", requestType);
    // Lưu trữ hoặc gửi dữ liệu HTML đến server
    
    try {
      let res = await dispatch(convertFile(formData)); // Gọi API

      // Kiểm tra kiểu dữ liệu trả về
      const response = res.payload as HTMLtoPDFResponse;

      if (response.ouput_file_url) {
        const fileUrl = response.ouput_file_url;

        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        toast.success("File saved and downloaded successfully!");
      } else {
        toast.error("Failed to get the file URL!");
        console.error("Response does not include output_file_url:", response);
      }
    } catch (error) {
      toast.error("Download failed!");
      console.error("Download failed:", error);
    }
  } else {
    console.error("EditContainer is not available");
    toast.error('EditContainer is not available !')
  }
  }
  return (
    <>
      {data && (
        <div style={{ zIndex: 1000 }}>
          <div className="w-full  flex items-center justify-between p-2 shadow-sm">
            <div className="flex">
              {/* <ButtonTool onClick={addText} icon={faICursor} ariaLabel="Add Text" /> */}
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
                icon={contentEditable ? faCircleXmark  : faPenToSquare} // Icon tương ứng (có thể sử dụng FontAwesome hoặc bất kỳ thư viện nào)
                ariaLabel="Edit"
              /> 
               <ButtonTool
                onClick={Draw}
                icon={   faPencil } // Icon tương ứng (có thể sử dụng FontAwesome hoặc bất kỳ thư viện nào)
                ariaLabel="Draw"
              />             
              {/* Nút thêm hình ảnh */}
              <label
                className="p-2 border"
                htmlFor="image-upload"
                style={{ cursor: "pointer", marginLeft: "10px" }}
                aria-label="Add image"
              >
                <FontAwesomeIcon icon={faImage}/>
              </label>
              <input
                className="hidden"
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            <button
              onClick={SaveAll}
              type="button"
              className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-3 me-2"
            >
              <span className="me-2"> {isLoading_convert ? 'Saving data...' : 'Save all'} </span>
              <span>{isLoading_convert ? <BeatLoader size={3} color="#fff"/> : <FontAwesomeIcon  icon={faArrowDown} />}</span>
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
                onClick={handleClick} // Tạo hình vuông
                style={{
                  position: "relative", // Đảm bảo phần tử chứa có vị trí tương đối
                  width: "100%",
                  height: "100%",
                  zIndex: "1",
                }}
              >
                <style>{data.style}</style>
                <div
                  dangerouslySetInnerHTML={{ __html: data.body }}

                  //Đoạn này là test html bởi vì api hết hạn không trả về html đúng được 

                  
                  // dangerouslySetInnerHTML={{ __html:`<!DOCTYPE html> <html lang="vi"><head> <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Trang HTML Mẫu</title></head>
                  //   <body style="z-index:1"><h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p>
                  //   <h1>Xin chào, đây là trang HTML!</h1><p>Đây là một đoạn văn bản trong HTML.</p></body></html>`}}

                  contentEditable={contentEditable}
                  style={{
                    width: "100%",
                    height: "100%",
                    zIndex: "1",
                  }}
                />
              </div>
              <canvas
        ref={canvasRef}
        width={containerSize.width}  // Đặt width của canvas bằng chiều rộng thẻ cha
        height={containerSize.height} // Đặt height của canvas bằng chiều cao thẻ cha
        style={{position: 'fixed', // Thoát khỏi z-index bị âm
          top: isDrawingMode ?`${position.top-1}px`:`${position.top}px`,
          left: isDrawingMode ?`${position.left-1}px`:`${position.left}px`,
          zIndex: isDrawingMode? 1 :-1, // Đảm bảo tương tác
          border: isDrawingMode? '1px solid blue':"",
          pointerEvents: "auto"}}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        
      />
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
