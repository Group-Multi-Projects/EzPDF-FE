import { DeleteOutlined, FileExcelOutlined, FileOutlined, FilePdfOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, type UploadFile, UploadProps } from 'antd';

interface FormUploadProps extends UploadProps {
  onFileChange: (name: string, value: any) => void;
  disabled?: boolean;
  isMulti?: boolean;
  name: string;
  error?: any;
  value?: any;
}

const { Dragger } = Upload;

const FormFileDragger = (props: FormUploadProps) => {
  const { onFileChange, isMulti, name, error, value } = props;

  const getCustomUploadProps = (fieldName: 'files'): UploadProps => ({
    name: fieldName,
    multiple: isMulti,
    disabled: props.disabled,
    customRequest: ({ file, onSuccess }) => {
      if (file instanceof File) {
        if (isMulti) {
          onFileChange(name, file);
          onSuccess?.({}, new XMLHttpRequest());
        } else {
          onFileChange(name, [file]);
          onSuccess?.({}, new XMLHttpRequest());
        }
      }
    },
    showUploadList: false,
    maxCount: 1,
    onDrop(e) {
      if (isMulti) {
        console.log('e.dataTransfer.files', e.dataTransfer.files);
        onFileChange(name, e.dataTransfer.files);
      } else {
        if (e.dataTransfer.files[0]) {
          onFileChange(name, [e.dataTransfer.files[0]]);
        }
      }
    },
  });

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <FilePdfOutlined style={{ fontSize: '24px', color: '#FF4D4F' }} />;
    } else if (fileName.toLowerCase().match(/\.(xlsx|xls|csv)$/)) {
      return <FileExcelOutlined style={{ fontSize: '24px', color: '#52C41A' }} />;
    }
    return <FileOutlined style={{ fontSize: '24px', color: '#4258F1' }} />;
  };

  const handleRemoveFile = (file: UploadFile) => {
    const updatedFileList = value.filter((f: any) => f.uid !== file.uid);
    onFileChange(name, updatedFileList);
  };

  return (
    <>
      <Dragger
        {...getCustomUploadProps('files')}
        style={{
          borderColor: '#4258F1',
          borderRadius: '16px',
          marginBottom: '16px',
        }}
        height={278}
      >
        <div className='flex justify-center items-center gap-x-[6px]'>
          <div>
            <div className='flex justify-center items-center mb-[20px]'>
              <div className='w-[60px] h-[60px] rounded-[100%] bg-[#4258F1] flex justify-center items-center'>
                <UploadOutlined style={{ fontSize: '24px', color: '#FFFFFF' }} />
              </div>
            </div>
            <div className='flex items-center justify-center gap-x-[5px] font-normal text-[24px] text-[#0D0D12] leading-[16px] mb-[20px]'>
              Drag & Drop or <span className='text-[#4258F1]'>Choose file</span> to upload
            </div>
            <div className='flex items-center justify-center text-[#808897] text-[14px] font-normal leading-[17px]'>
              Supported Formats : CVS, XLS, XLSX, PDF, Image Types
            </div>
          </div>
        </div>
      </Dragger>
      {error && <div className='mt-[7px] ml-[5px] text-red-500 text-[12px]'>{error}</div>}
      {value.length > 0 && (
        <div className='mt-4'>
          {value.map((file: any) => (
            <div key={file.uid} className='flex items-center justify-between p-3 mb-2 bg-[#F6F7FB] rounded-[12px]'>
              <div className='flex items-center gap-x-3'>
                {getFileIcon(file.name)}
                <div>
                  <div className='text-[14px] font-medium text-[#0D0D12] truncate max-w-[300px]'>{file.name}</div>
                  <div className='text-[12px] text-[#808897]'>
                    {file.status === 'uploading' && 'Uploading...'}
                    {file.status === 'done' && 'Completed'}
                    {file.status === 'error' && 'Upload Failed'}
                  </div>
                </div>
              </div>
              <Button
                type='text'
                icon={<DeleteOutlined style={{ color: '#FF4D4F' }} />}
                onClick={() => handleRemoveFile(file)}
                disabled={file.disabledDetele}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FormFileDragger;
