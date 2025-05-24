import WYSIWYGEditor from "@/component/atoms/WYSIWYGEditor/WYSIWYGEditor";
import { Button } from "antd";
import { Chrome, Printer } from "lucide-react";
import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { htmlTemplate } from "@/helper/constants";
const ConvertFormat = () => {
  const ref = useRef();
  const [htmlContent, setHtmlContent] = useState(htmlTemplate);


const handlePrintPDF = () => {
  const printContents = document.getElementById('print-area')?.innerHTML;

  if (!printContents) return;

  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  // Sau khi in xong, khôi phục nội dung gốc
  document.body.innerHTML = originalContents;

  // Nếu dùng React Router hoặc SPA, cần reload để tránh lỗi mất layout
  window.location.reload();
};


const handleOpenInBrowser = () => {
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  }
};

  return (
    <div className="flex flex-col h-full p-10 gap-4">
      <div className="flex justify-between items-center sticky">
        <div className="font-normal text-[26px] leading-[31.47px] text-[#0D0D12]">
          Chuyển đổi format
        </div>
        <div className="flex items-center gap-x-4">
          <div>
            <Button
              type="primary"
              className="h-[44px] rounded-xl"
              style={{ backgroundColor: "#4258F1" }}
              onClick={handlePrintPDF}
            >
              <div className="flex gap-x-[8px] font-medium text-[18px] leading-[21.78px] text-[#FFFFFF]">
                <Printer />
                <div>In thành PDF</div>
              </div>
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              className="h-[44px] rounded-xl"
              style={{ backgroundColor: "#4258F1" }}
              onClick={handleOpenInBrowser}
            >
              <div className="flex gap-x-[8px] font-medium text-[18px] leading-[21.78px] text-[#FFFFFF]">
                <Chrome />
                <div>Hiển thị trong trình duyệt</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] p-4 rounded-xl flex-1 flex flex-col overflow-auto" 
        id="print-area"
      >
        <WYSIWYGEditor
          value={htmlContent}
          onChange={(value) => setHtmlContent(value)}
          ref={ref}
        />
      </div>
    </div>
  );
};

export default ConvertFormat;
