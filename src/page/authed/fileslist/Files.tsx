import BaseRemoveModal from "@/component/atoms/modal/BaseRemoveModal";
import FileFormModal from "@/component/specific/fileList/fileFormModal";
import FileListTable from "@/component/specific/fileList/fileListTable";
import { IFileListTable } from "@/interfaces";
import apiService from "@/service";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { Button, Input, message } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const Files = () => {
  const [files, setFiles] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectFile, setSelectedFile] = useState<IFileListTable | null>(null);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
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

  const deleteFile = async (file: any) => {
    console.log(file);

    setIsLoading(true);
    try {
      let res = await apiService.files.delete(file.id);
      setSelectedFile(file);
      if (res.data.EC === 0) {
        message.success(res.data.EM);
        setIsOpenDeleteModal(false);
        fetchFiles()
      } else {
        message.error(res.data.EM);
      }
    } catch (error) {
      console.log(error);
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

  const handleDownloadFile = async (file: any) => {
    setSelectedFile(file);
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

        <FileListTable
          fileListTable={files ?? ""}
          isLoading={isLoading}
          isDownLoad={handleDownloadFile}
          onDelete={(file:any) => {
            setSelectedFile(file); // 👈 Lưu file để xoá
            setIsOpenDeleteModal(true); // 👈 Mở modal
          }}
        />
        <FileFormModal
          open={isOpenModal}
          close={handleCloseModal}
          refresh={fetchFiles}
        />
        <BaseRemoveModal
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          onOk={() => deleteFile(selectFile)}
          title="Delete file"
        />
      </div>
    </>
  );
};

export default Files;
