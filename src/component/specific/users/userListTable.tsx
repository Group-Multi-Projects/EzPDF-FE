import { IFileListTable, IInfo } from "@/interfaces";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import type { MenuProps, TableProps } from "antd";
import { Avatar, Dropdown, Modal, Table } from "antd";
import dayjs from "dayjs";
import avatar from "@/assets/jpg/avatar.jpg";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface UsersListTableProps {
  users: any[];
  refresh?: () => void;
  isLoading: boolean;
  onUpdate: (user: IInfo) => void;
  onDelete: (user: IInfo) => void;
}
const UsersListTable = ({
  users,
  refresh,
  isLoading,
  onDelete,
  onUpdate,
}: UsersListTableProps) => {
  const getMenuItems = (user: IInfo): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <div
          className="flex items-center gap-x-[7px] w-full"
          onClick={() => onUpdate(user)}
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
          onClick={() => onDelete(user)}
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
      render: (_, record: IInfo) => <span>{record?.id}</span>,
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      render: (_, record: IInfo) => (
        <div className="flex gap-2 items-center">
          <Avatar size={32} src={avatar} />
          <span>{record?.username}</span>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (_, record: IInfo) => <span>{record?.phone}</span>,
    },
    {
      title: "Email ",
      dataIndex: "email",
      key: "email",
      render: (_, record: IInfo) => <span>{record?.email}</span>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (_, record: IInfo) => <span>{record?.address}</span>,
    },
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role_name",
      render: (_, record: any) => <span>{record?.roles?.role_name}</span>,
    },
    {
      title: "Ngày được tạo",
      key: "createdAt",
      render: (_: any, record: IInfo) => (
        <span>
          {record.createdAt !== null
            ? dayjs(record?.createdAt).format("MMM, DD YYYY")
            : ""}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      width: "5.13%",
      render: (_: any, item: any) => (
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
          dataSource={users ?? "Not found data"}
          pagination={{
            position: ["topLeft"],
            total: users.length,
            showSizeChanger: true,
          }}
        />
      </div>
    </div>
  );
};

export default UsersListTable;
