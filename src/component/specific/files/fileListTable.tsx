import { IFileListTable } from "@/interfaces";
import apiService from "@/service";
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import type { MenuProps, TableProps } from "antd";
import { Dropdown, message, Modal, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface FileListTableProps {
  fileListTable: any[];
  isLoading: boolean;
  onPageChange?: (page: number) => void;
  isDownLoad?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}
const FileListTable = (props: FileListTableProps) => {
  const navigate = useNavigate();
  //     const deleteFile = async (file: any) => {
  //     console.log(file)
  //   try {
  //     let res = await apiService.files.delete(file.id);
  //     if (res.data.EC === 0) {
  //       message.success(res.data.EM);
  //     } else {
  //       message.error(res.data.EM);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const getMenuItems = (file: any): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-x-[7px] w-full"
          onClick={() => props?.isDownLoad?.(file)}
        >
          <DownloadOutlined />
          <span className="font-normal text-[14px] leading-[18px] text-[#696D87]">
            Download
          </span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex items-center gap-x-[7px] w-full"
          onClick={() => {
            props?.onDelete?.(file);
          }}
        >
          <DeleteOutlined />
          <span className="font-normal text-[14px] leading-[18px] text-[#696D87]">
            Delete
          </span>
        </div>
      ),
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      // render: (_, record: IFileListTable) => {
      //   return (
      //     <Link
      //       to={`/admin/ticketing-system/${record.id}/ticketing-information/activity`}
      //     >
      //       {record.id}
      //     </Link>
      //   );
      // },
    },
    {
      title: "File name",
      dataIndex: "file_name",
      key: "file_name",
      render: (_, record: IFileListTable) => <span>{record?.file_name}</span>,
    },
    {
      title: "File url",
      dataIndex: "file_url",
      key: "file_url",
      render: (_, record: IFileListTable) => <span>{record?.file_url}</span>,
    },
    {
      title: "Created by",
      dataIndex: "user",
      key: "user",
      render: (_, record: any) => <span>{record?.user?.username}</span>,
    }, // {
    //   title: 'Type',
    //   key: 'type',
    //   render: (_, record: IFileListTable) => {
    //     const type = ticketType.find(item => item.value === record.file_type);
    //     return (
    //       <div>
    //         {type ? type.label : record.type}
    //       </div>
    //     );
    //   },
    // },
    {
      title: "File creation",
      key: "createdAt",
      render: (_: any, record: IFileListTable) => (
        <span>
          {record.createdAt !== null
            ? dayjs(record.createdAt).format("MMM, DD YYYY")
            : ""}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      width: "5.13%",
      render: (_: any, item: IFileListTable) => (
        <Dropdown
          menu={{
            items: getMenuItems(item),
          }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          className="w-[28px] h-[28px] rounded-[6px] border-[1px] border-[#DFE1E6] flex justify-center items-center cursor-pointer"
          trigger={["click"]}
        >
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-[#FFFFFF] p-4 rounded-xl flex-1 flex flex-col overflow-auto">
      <div className="w-full flex-1 overflow-y-auto">
        <Table
          loading={props.isLoading}
          columns={columns}
          dataSource={props.fileListTable}
          onRow={(record) => ({
            onClick: () => navigate(`/filesList/${record.id}`),
          })}
          pagination={{
            position: ["topLeft"],
            // Các tuỳ chọn khác nếu cần:
            pageSize: 5,
            total: props.fileListTable.length,
            showSizeChanger: true,
          }}
        />
      </div>
    </div>
  );
};

export default FileListTable;
