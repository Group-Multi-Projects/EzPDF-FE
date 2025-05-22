import  * as fabric from 'fabric';

export function addRect(canvas:any, options = {}) {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'rgba(0, 0, 255, 0.3)',
    width: 100,
    height: 60,
    ...options
  });

  canvas.add(rect);
  console.log(rect);
  
  canvas.setActiveObject(rect);
  return rect;
}

export function addCircle(canvas:any, options = {}) {
  const circle = new fabric.Circle({
    left: 150,
    top: 150,
    fill: 'rgba(255, 0, 0, 0.3)',
    radius: 50,
    ...options
  });

  canvas.add(circle);
  canvas.setActiveObject(circle);
  return circle;
}

export function addTriangle(canvas:any, options = {}) {
  const triangle = new fabric.Triangle({
    left: 200,
    top: 200,
    fill: 'rgba(0, 255, 0, 0.5)',
    width: 100,
    height: 100,
    ...options
  });

  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  return triangle;
}

export function deleteActiveObject(canvas:any) {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
  }
}

// export function bringForward(canvas:any) {
//   const activeObject = canvas.getActiveObject();
//   if (activeObject) {
//     canvas.bringForward(activeObject);
//   }
// }

// export function sendBackward(canvas:any) {
//   const activeObject = canvas.getActiveObject();
//   if (activeObject) {
//     canvas.sendBackwards(activeObject);
//   }
// }


