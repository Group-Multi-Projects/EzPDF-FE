import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dữ liệu ví dụ
const rawData = [
  { id: 1, timeStamp: "01-01", resultCount: 5, description: "Create" },
  { id: 2, timeStamp: "01-02", resultCount: 3, description: "Update" },
  { id: 3, timeStamp: "01-03", resultCount: 8, description: "Delete" },
  { id: 4, timeStamp: "01-01", resultCount: 2, description: "Create" },
  { id: 5, timeStamp: "01-02", resultCount: 4, description: "Delete" },
  { id: 6, timeStamp: "01-03", resultCount: 1, description: "Update" },
  { id: 7, timeStamp: "01-04", resultCount: 7, description: "Create" },
  { id: 8, timeStamp: "01-05", resultCount: 6, description: "Update" },
  { id: 9, timeStamp: "01-06", resultCount: 5, description: "Delete" },
  { id: 10, timeStamp: "01-04", resultCount: 3, description: "Create" },
  { id: 11, timeStamp: "01-05", resultCount: 2, description: "Delete" },
  { id: 12, timeStamp: "01-06", resultCount: 4, description: "Update" },
  { id: 13, timeStamp: "01-07", resultCount: 9, description: "Create" },
  { id: 14, timeStamp: "01-08", resultCount: 7, description: "Update" },
  { id: 15, timeStamp: "01-09", resultCount: 10, description: "Delete" },
  { id: 16, timeStamp: "01-07", resultCount: 6, description: "Create" },
  { id: 17, timeStamp: "01-08", resultCount: 5, description: "Delete" },
  { id: 18, timeStamp: "01-09", resultCount: 4, description: "Update" },
  { id: 19, timeStamp: "01-10", resultCount: 12, description: "Create" },
  { id: 20, timeStamp: "01-11", resultCount: 15, description: "Update" },
  { id: 21, timeStamp: "01-12", resultCount: 8, description: "Delete" },
  { id: 22, timeStamp: "01-10", resultCount: 9, description: "Create" },
  { id: 23, timeStamp: "01-11", resultCount: 11, description: "Delete" },
  { id: 24, timeStamp: "01-12", resultCount: 13, description: "Update" },
];


// Nhóm dữ liệu theo loại hành động và chuẩn hóa dữ liệu
const groupDataByAction = (data: typeof rawData) => {
  const actions = Array.from(new Set(data.map((item) => item.description)));
  const dates = Array.from(new Set(data.map((item) => item.timeStamp))).sort();

  const datasets = actions.map((action, index) => {
    const actionData = dates.map((date) => {
      const item = data.find(
        (d) => d.timeStamp === date && d.description === action
      );
      return item ? item.resultCount : 0;
    });

    return {
      label: action,
      data: actionData,
      borderColor: ["#FF6384", "#36A2EB", "#FFCE56"][index], // Màu mỗi đường
      backgroundColor: "rgba(0,0,0,0)",
      borderWidth: 2,
      tension: 0.4, // Làm mềm đường (giá trị từ 0 đến 1, càng cao càng cong)
    };
  });

  return { labels: dates, datasets };
};

const EventChart = () => {
  const chartData = groupDataByAction(rawData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bảng thống kê hành vi người dùng được tạo trong tháng 5/2025",
      },
    },
  };

  return (
      <Line data={chartData} options={options} />
  );
};

export default EventChart;
