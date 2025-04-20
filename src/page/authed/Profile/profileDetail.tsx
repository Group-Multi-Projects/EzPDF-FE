// UserDetailPage.tsx
import { Card, Avatar, Descriptions, Button, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { PRIMARY } from '@/helper/colors';

const mockUser = {
  avatar: 'https://jbagy.me/wp-content/uploads/2025/03/anh-dai-dien-zalo-dep-1.jpg',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  phone: '0123 456 789',
  username: 'nguyenvana',
  role: 'Quản trị viên',
  status: 'Đang hoạt động',
  createdAt: '2024-01-10',
};

const ProfileDetail = () => {
  return (
    <div className="p-6 w-full mx-auto">
      <Card  className="shadow-lg rounded-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar size={120} src={mockUser.avatar} />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{mockUser.name}</h2>
              <Button type="primary" className={`rounded-xl p-2`} icon={<EditOutlined />}>
                Update
              </Button>
            </div>

            <Divider />

            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Username">{mockUser.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{mockUser.email}</Descriptions.Item>
              <Descriptions.Item label="Phone number">{mockUser.phone}</Descriptions.Item>
              <Descriptions.Item label="Role">{mockUser.role}</Descriptions.Item>
              <Descriptions.Item label="Status">{mockUser.status}</Descriptions.Item>
              <Descriptions.Item label="Created at">{mockUser.createdAt}</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDetail;
