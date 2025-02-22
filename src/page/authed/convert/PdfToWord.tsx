import { Button } from "@/component/ui/button";
import React from "react";
import {useDropzone} from 'react-dropzone';

const PdfToWord = () =>{
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone(); 
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));
    return(
        <>
        <div className="flex h-full w-full  items-center justify-center">
            <div {...getRootProps({className: 'dropzone w-full h-full'})} className="h-full w-full flex items-center justify-center">
                <div className="text-center w-[90%] h-[90%] p-[3rem] border-[2px] border-dashed border-[#374151] bg-white">
                    <div>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside>
                        <h4>This is file Pdf</h4>
                        <ul>{files}</ul>
                    </aside>
                
                </div>        

            </div>
            <Button className="mr-[2rem]">
                Convert to Word
            </Button>
        </div>
        </>
    )
}
export default PdfToWord;