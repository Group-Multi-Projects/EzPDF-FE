// UserDetailPage.tsx
import { Card, Avatar, Descriptions, Button, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { PRIMARY } from "@/helper/colors";
import { useEffect, useState } from "react";
import apiService from "@/service";
import { IInfo } from "@/interfaces";
import dayjs from "dayjs";
import ProfileFormModal from "@/component/specific/profile/ProfileFormModal";

const mockUser = {
  avatar:
    "https://jbagy.me/wp-content/uploads/2025/03/anh-dai-dien-zalo-dep-1.jpg",
};

const ProfileDetail = () => {
  const [getInfo, setGetInfo] = useState<IInfo>();
  const [open, setOpen] = useState(false);

  useEffect(() =>{
    fetchInfo();
  },[])

  const fetchInfo = async () => {
    try {
      let response = await apiService.auth.getInfo();
      let data = response.data.DT.data
      setGetInfo(data)      
    } catch (error) {
      console.error("Profile err:", error);
    }
  };

  const handleCloseModal = () =>{
    setOpen(false)
  }

  console.log('state open', open);
  
  return (
    <div className="p-6 w-full mx-auto">
      <Card className="shadow-lg rounded-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar size={120} src={mockUser.avatar} />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{getInfo?.username}</h2>
              <Button
                type="primary"
                onClick={() => setOpen(true)}
                className={`rounded-xl p-2`}
                icon={<EditOutlined />}
              >
                Update
              </Button>
            </div>

            <Divider />

            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Username">
              {getInfo?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
              {getInfo?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone number">
              {getInfo?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
              {getInfo?.role_id === 2 ? 'Admin' : 'User'}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                Đang hoạt động
              </Descriptions.Item>
              <Descriptions.Item label="Created at">
                {dayjs(getInfo?.createdAt).format('MMM, DD YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>

      <ProfileFormModal
        open={open}
        close={handleCloseModal}
        initialValues={getInfo}
      />
    </div>
  );
};

export default ProfileDetail;
