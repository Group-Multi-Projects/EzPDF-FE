import { IFileListTable } from "@/interfaces";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import type { MenuProps, TableProps } from "antd";
import { Dropdown, Modal, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface FileListTableProps {
  fileListTable: any[];
  refresh?: () => void;
  isLoading: boolean;
  onPageChange?: (page: number) => void;
  pagination?: any;
}
const FileListTable = ({
  fileListTable,
  refresh,
  onPageChange,
  isLoading,
  pagination,
}: FileListTableProps) => {
  const getMenuItems = (ticket: IFileListTable): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-x-[7px] w-full"
          onClick={(e) => {
            // showEditModal(ticket);
          }}
        >
          <EditOutlined />
          <span className="font-normal text-[14px] leading-[18px] text-[#696D87]">
            Edit
          </span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex items-center gap-x-[7px] w-full"
          // onClick={() => {
          //   openTicketingDeleteModal(Number(ticket.id),refresh);
          // }}
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
      render: (_, record: IFileListTable) => {
        return (
          <Link
            to={`/admin/ticketing-system/${record.id}/ticketing-information/activity`}
          >
            {record.id}
          </Link>
        );
      },
    },
    {
      title: "File name",
      dataIndex: "name",
      key: "name",
      render: (_, record: IFileListTable) => <span>{record.file_name}</span>,
    },
    {
      title: "File url",
      dataIndex: "account_name",
      key: "account_name",
      render: (_, record: IFileListTable) => <span>{record.file_url}</span>,
    },
    // {
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
            ? dayjs(record.createdAt).format("YYYY MMM DD")
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
          loading={isLoading}
          columns={columns}
          dataSource={fileListTable}
          pagination={{
            position: ["topLeft"],
            // Các tuỳ chọn khác nếu cần:
            pageSize: 5,
            total: fileListTable.length,
            showSizeChanger: true,
          }}
        />
      </div>
    </div>
  );
};

export default FileListTable;
