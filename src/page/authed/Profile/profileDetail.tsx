// UserDetailPage.tsx
import { Card, Avatar, Descriptions, Button, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { PRIMARY } from "@/helper/colors";
import { useEffect, useState } from "react";
import apiService from "@/service";
import { IInfo } from "@/interfaces";
import dayjs from "dayjs";
import ProfileFormModal from "@/component/specific/profile/ProfileFormModal";
import avatar from "@/assets/jpg/avatar.jpg";

const ProfileDetail = () => {
  const [getInfo, setGetInfo] = useState<IInfo>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      let response = await apiService.auth.getInfo();
      let data = response.data.DT.data;
      setGetInfo(data);
    } catch (error) {
      console.error("Profile err:", error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  console.log("state open", open);

  return (
    <div className="p-6 w-full mx-auto">
      <Card className="shadow-lg rounded-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar shape="square" size={100} src={avatar} />
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
              <Descriptions.Item label="Tên người dùng">
                {getInfo?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {getInfo?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {getInfo?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Vai trò">
                {getInfo?.role_id === 2 ? "Admin" : "User"}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <div className="flex items-center gap-2 bg-[#f0f7f1] px-3 py-1 rounded-lg w-fit">
                  <span
                    className={"w-3 h-3 rounded-full bg-green-500"}
                  ></span>
                  <span
                    className="text-green-600"
                  >
                    Đang hoạt động
                  </span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {dayjs(getInfo?.createdAt).format("MMM, DD YYYY")}
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
