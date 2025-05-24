import BaseRemoveModal from "@/component/atoms/modal/BaseRemoveModal";
import UsersFormModal from "@/component/specific/users/userFormModal";
import UsersListTable from "@/component/specific/users/userListTable";
import { IInfo } from "@/interfaces";
import apiService from "@/service";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { Button, Input, message } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [userList, setUserList] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [selectUser, setSelectedUser] = useState<IInfo | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.users.getInfo();
      setUserList(res.data.DT.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (user: any) => {
    setIsLoading(true);
    try {
      let res = await apiService.users.delete(user.id);
      setSelectedUser(user);
      if (res.data.EC === 0) {
        message.success(res.data.EM);
        setIsOpenDeleteModal(false);
      } else {
        message.error(res.data.EM);
      }
      fetchUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleCloseModal = () => {
    setIsOpenAddModal(false);
    setIsOpenUpdateModal(false);
  };

  const handleEdit = (user: IInfo) => {
    setSelectedUser(user);
    setIsOpenUpdateModal(true);
  };

  const handleDelete = (user: IInfo) => {
    setSelectedUser(user);
    setIsOpenDeleteModal(true);
  };

  const handleCreate = () => {
    setIsOpenAddModal(true);
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

  // const debouncedSearch = debounce((value: string) => {
  //   setPagination({ ...pagination, page: 1 });
  //   setSearchKeyword(value);
  // }, 1000);
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full p-10 gap-4">
        <div className="flex justify-between items-center sticky">
          <div className="font-normal text-[26px] leading-[31.47px] text-[#0D0D12]">
            Danh sách người dùng
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
                onClick={handleCreate}
              >
                <div className="flex gap-x-[8px] font-medium text-[18px] leading-[21.78px] text-[#FFFFFF]">
                  <div>+</div>
                  <div>Add user</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <UsersListTable
          users={userList ?? ""}
          isLoading={isLoading}
          onUpdate={handleEdit}
          onDelete={handleDelete}
        />

        {isOpenAddModal && (
          <UsersFormModal
            open={isOpenAddModal}
            close={handleCloseModal}
            onRefresh={fetchUsers}
          />
        )}

        {isOpenUpdateModal && (
          <UsersFormModal
            open={isOpenUpdateModal}
            close={handleCloseModal}
            users={selectUser}
            onRefresh={fetchUsers}
          />
        )}

        {isOpenDeleteModal && (
          <BaseRemoveModal
            isOpen={isOpenDeleteModal}
            onClose={() => setIsOpenDeleteModal(false)}
            onOk={() => deleteUser(selectUser)}
            title="User"
          />
        )}
      </div>
    </>
  );
};

export default Users;
