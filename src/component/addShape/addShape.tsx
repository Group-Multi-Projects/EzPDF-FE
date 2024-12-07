import { useRef, useState, useEffect } from "react"
import { Canvas, Rect, Circle } from "fabric"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCircle } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, Button } from "@mui/material";
export const AddShape = ()=>{
  // Chỉ định rõ ràng kiểu là Canvas hoặc null
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width:500,
                height:500
            })
            initCanvas.backgroundColor = '#bababa';
            initCanvas.renderAll();
            setCanvas(initCanvas);
            return () => {
                initCanvas.dispose();
            }
        }
    },[])
    const addRectangle = () =>{
        if (canvas) {
            const rect = new Rect({
                top:100,
                left: 50,
                width: 100,
                height: 70,
                fill: '#000'
            })
        canvas.add(rect)    
        }
    }
    const addCircle = () => {
        if (canvas) {
            const circle = new Circle({
                top:70,
                left: 300,
                radius:50,
                fill: '#000'
            })
        canvas.add(circle)    
        }
    }
    const handleSaveSession = () => {
      const sessionId = 'abc123'; // Thay thế bằng sessionId của bạn

    };
    return(
        <>
              

            {/* <div className="me-2">
                <button onClick={handleSaveSession}>Save Session ID</button>
                <ButtonGroup variant="outlined" color="info" aria-label="Basic button group">
                    <Button
                        onClick={addRectangle}
                    >
                        <FontAwesomeIcon icon={faSquare} />
                    </Button>
                    <Button
                    onClick={addCircle}  
                    >
                        <FontAwesomeIcon icon={faCircle} /> 
                    </Button>
                </ButtonGroup>                
            </div>
            <canvas id="canvas" ref={canvasRef}/> */}
        </>
    )
}