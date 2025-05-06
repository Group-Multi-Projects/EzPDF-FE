
import UsersFormModal from "@/component/specific/users/userFormModal";
import UsersListTable from "@/component/specific/users/userListTable";
import { IInfo } from "@/interfaces";
import apiService from "@/service";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { Button, Input } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

export const fakeUsersList= [
    {
        id: 1,
        username: 'alice',
        email: 'alice@example.com',
        address: '123 Main St, Springfield',
        phone: '555-0101',
        role_id: 1,
        createdAt: '2025-04-20T09:00:00.000Z',
      },
      {
        id: 2,
        username: 'bob',
        email: 'bob@example.com',
        address: '456 Elm St, Metropolis',
        phone: '555-0202',
        role_id: 2,
        createdAt: '2025-04-21T10:30:00.000Z',
      },
      {
        id: 3,
        username: 'charlie',
        email: 'charlie@example.com',
        address: '789 Oak Ave, Gotham',
        phone: '555-0303',
        role_id: 3,
        createdAt: '2025-04-22T14:15:00.000Z',
      },
      {
        id: 4,
        username: 'david',
        email: 'david@example.com',
        address: '101 Pine Rd, Star City',
        phone: '555-0404',
        role_id: 1,
        createdAt: '2025-04-23T08:45:00.000Z',
      },
      {
        id: 5,
        username: 'eve',
        email: 'eve@example.com',
        address: '202 Maple Blvd, Central City',
        phone: '555-0505',
        role_id: 2,
        createdAt: '2025-04-24T16:20:00.000Z',
      },
];

const generateFakeList = (count: number = 100) => {
  const baseList = fakeUsersList;
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
const Users = () => {
  const usersList100Items = generateFakeList(100)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userList, setUserList] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [selectUser, setSelectedUser] = useState<IInfo | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   limit: 10,
  //   totalPages: 1,
  //   totalItems: 0,
  // });
  
  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const res = await apiService.users.getInfo()
      setUserList(res.data.DT.rows)
       console.log('list users',res);
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false)
    } 
   
  }
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };


const handleEdit = (user:IInfo) =>{
    setSelectedUser(user)
    setIsOpenModal(true)
}
const handleDelete = (user:IInfo) =>{
    setSelectedUser(user)
    setIsOpenModal(true)
}
  // const getEditProject = (project: IProject) => {
  //   setEditProject(project);
  // };

  const handleClickSearchInput = () => {
    setIsSearchInputVisible(!isSearchInputVisible);

    if (isSearchInputVisible) {
      setSearchKeyword('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // debouncedSearch(e.target.value);
  };

  // const debouncedSearch = debounce((value: string) => {
  //   setPagination({ ...pagination, page: 1 });
  //   setSearchKeyword(value);
  // }, 1000);
  useEffect(()=>{
    fetchUsers()
  },[])
  console.log(selectUser);
  
  return (
    <>
      <div className="flex flex-col h-full p-10 gap-4">
        <div className="flex justify-between items-center sticky">
          <div className="font-normal text-[26px] leading-[31.47px] text-[#0D0D12]">
            User list
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
                  <div>Add user</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <UsersListTable
          users={userList ?? ''}
          isLoading={isLoading}
          onUpdate={handleEdit}
          onDelete={handleDelete}  
            
        />
        <UsersFormModal
          open={isOpenModal}
          close={handleCloseModal}
          users={selectUser}
        />
      </div>


    </>
  );
};

export default Users;
