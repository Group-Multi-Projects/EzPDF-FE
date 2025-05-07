import FileFormModal from "@/component/specific/fileList/fileFormModal";
import FileListTable from "@/component/specific/fileList/fileListTable";
import { IFileListTable } from "@/interfaces";
import apiService from "@/service";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { Button, Input, message } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

export const fakeFileList = [
  {
    id: "1",
    user_id: "1001",
    file_url: "https://example.com/files/report-jan.pdf",
    file_name: "report-jan.pdf",
    file_type: "application/pdf",
    createdAt: "2025-04-01T10:15:30.000Z",
  },
  {
    id: "2",
    user_id: "1002",
    file_url: "https://example.com/files/photo-spring.jpg",
    file_name: "photo-spring.jpg",
    file_type: "image/jpeg",
    createdAt: "2025-04-05T14:22:10.000Z",
  },
  {
    id: "3",
    user_id: "1003",
    file_url: "https://example.com/files/archive.zip",
    file_name: "archive.zip",
    file_type: "application/zip",
    createdAt: "2025-04-10T08:45:00.000Z",
  },
  {
    id: "4",
    user_id: "1001",
    file_url: "https://example.com/files/presentation.pptx",
    file_name: "presentation.pptx",
    file_type:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    createdAt: "2025-04-12T16:30:25.000Z",
  },
  {
    id: "5",
    user_id: "1002",
    file_url: "https://example.com/files/data.csv",
    file_name: "data.csv",
    file_type: "text/csv",
    createdAt: "2025-04-15T11:05:50.000Z",
  },
];

const generateFakeFileList = (count: number = 100) => {
  const baseList = fakeFileList;
  const result = [];

  for (let i = 0; i < count; i++) {
    const template = baseList[i % baseList.length];
    const index = i + 1;
    const id = index.toString();
    result.push({
      ...template,
      id,
    });
  }

  return result;
};
const FilesList = () => {
  const fileList100Items = generateFakeFileList(100);
  const [files, setFiles] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectFile, setSelectedFile] = useState<IFileListTable | null>(null);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   limit: 10,
  //   totalPages: 1,
  //   totalItems: 0,
  // });

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      let res = await apiService.files.getList();
      const { EC, EM, DT } = res.data;
      if (EC === 0) {
        setFiles(DT);
      } else {
        message.error(EM);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed in API of file ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClickSearchInput = () => {
    setIsSearchInputVisible(!isSearchInputVisible);

    if (isSearchInputVisible) {
      setSearchKeyword("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // debouncedSearch(e.target.value);
  };

  const handleDownloadFile = async (file:any) => {
    setSelectedFile(file)
    window.open(file?.file_url);
  };

  // const handlePageChange = (newPage: number) => {
  //   setPagination({ ...pagination, page: newPage });
  // };

  // const debouncedSearch = debounce((value: string) => {
  //   setPagination({ ...pagination, page: 1 });
  //   setSearchKeyword(value);
  // }, 1000);
  useEffect(() => {
    fetchFiles();
  }, []);
  return (
    <>
      <div className="flex flex-col h-full p-10 gap-4">
        <div className="flex justify-between items-center sticky">
          <div className="font-normal text-[26px] leading-[31.47px] text-[#0D0D12]">
            Files list
          </div>
          <div className="flex items-center gap-x-4">
            <div>
              {isSearchInputVisible ? (
                <div className="flex items-center rounded-xl  bg-[#F8F9FB]">
                  <Input
                    placeholder="Search"
                    onChange={handleInputChange}
                    style={{
                      width: "250px",
                      height: "44px",
                      marginRight: "10px",
                    }}
                  />
                  <Button
                    onClick={handleClickSearchInput}
                    className="bg-[#F8F9FB] h-[48px] !text-[18px] leading-[21.78px] text-[#5A5A77] rounded-xl py-2.5 px-2.5 border-none shadow-none "
                  >
                    <CloseOutlined
                      style={{ fontSize: "16px", color: "#666D80" }}
                    />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleClickSearchInput}
                  className="bg-[#F8F9FB] h-[48px] !text-[18px] leading-[21.78px] text-[#5A5A77] rounded-xl py-2.5 px-2.5 border-none shadow-none "
                >
                  <SearchOutlined />
                  <span className="ml-1">Search</span>
                </Button>
              )}
            </div>

            <div>
              <Button
                type="primary"
                className="h-[44px] w-[161px] rounded-xl"
                style={{ backgroundColor: "#4258F1" }}
                onClick={() => setIsOpenModal(true)}
              >
                <div className="flex gap-x-[8px] font-medium text-[18px] leading-[21.78px] text-[#FFFFFF]">
                  <div>+</div>
                  <div>Add file</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <FileListTable fileListTable={files ?? ''} isLoading={isLoading} isDownLoad={handleDownloadFile}/>
        <FileFormModal open={isOpenModal} close={handleCloseModal} />
      </div>
    </>
  );
};

export default FilesList;
