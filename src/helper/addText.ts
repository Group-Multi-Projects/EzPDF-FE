import * as fabric from "fabric";


export function addText(canvas: any) {
  const text = new fabric.IText("Add text here", {
    left: 100,
    top: 100,
    fontSize: 15,
    padding:16,
    editable: true,
  });
  canvas.add(text);
  canvas.setActiveObject(text);
  return text;
}

// Toggle bold
 export function toggleBold(canvas:any) {
  const obj = canvas.getActiveObject();
  if (obj && obj.isType("i-text")) {
    obj.set("fontWeight", obj.fontWeight === "bold" ? "normal" : "bold");
    canvas.requestRenderAll();
  }
}

// Toggle italic
export function toggleItalic(canvas:any) {
  const obj = canvas.getActiveObject();
  if (obj && obj.isType("i-text")) {
    obj.set("fontStyle", obj.fontStyle === "italic" ? "normal" : "italic");
    canvas.requestRenderAll();
  }
}

// Toggle underline
export function toggleUnderline(canvas:any) {
  const obj = canvas.getActiveObject();
  if (obj && obj.isType("i-text")) {
    obj.set("underline", !obj.underline);
    canvas.requestRenderAll();
  }
}

// Change color
export function changeColor(canvas:any,e:any) {
  const obj = canvas.getActiveObject();
  if (obj && obj.isType("i-text")) {
    obj.set("fill", e.target.value);
    canvas.requestRenderAll();
  }
}

// Change font
export function changeFontFamily(canvas:any,e:any) {
  const obj = canvas.getActiveObject();
  if (obj && obj.isType("i-text")) {
    obj.set("fontFamily", e.target.value);
    canvas.requestRenderAll();
  }
}
