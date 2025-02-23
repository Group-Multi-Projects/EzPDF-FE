import { FileCode, FilePen, FileText } from 'lucide-react'
import { Navigate, useNavigate,  } from 'react-router-dom'
import React from 'react'
import { Link } from 'react-router-dom'
const Convert = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='text-center text-[3rem] font-bold text-red-500 pb-[5rem]'>Pdf Converter</div>
      <div className='flex items-start justify-around text-[#374151]'>
        <div className=' '>
          <div className='pb-[2rem] text-[2rem]'>
          Convert from PDF 
          </div>
          <div className='flex items-center gap-2 mb-[1rem] p-[12px] bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer ' >
            <FilePen className='mr-[8px] h-[24px] text-[#ff4d00] stroke-1'></FilePen>
            <div>Convert PDF to HTML and extract content</div>
          </div>
          <div onClick={() => navigate("/convert/pdf-to-word")} 
            className='flex items-center gap-2 mb-[1rem] p-[12px] bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer ' >
            <FileText className='mr-[8px] h-[24px] text-[#0f1fff] stroke-1'></FileText>
            <div>Convert PDF to Word</div>
          </div>
          <div className='flex items-center gap-2 mb-[1rem] p-[12px] bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer ' >
            <FileCode className='mr-[8px] h-[24px] text-[#ff824d] stroke-1'></FileCode>
            <div>Convert PDF to HTML</div>
          </div>
          
        </div>
        <div className=' '>
          <div className='pb-[2rem] text-[2rem]'>
          Convert to PDF 
          </div>
          <div className='flex items-center gap-2 mb-[1rem] p-[12px] bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer ' >
            <img className='h-[24px] mr-[8px] text-[#ff824d] stroke-1' src="/assets/logo/pdf1.png" alt="" />
            <div>Convert HTML to PDF</div>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>  
    </div>
  );
};

export default Convert;
