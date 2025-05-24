import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalChart: React.FC = () => {
 const data = {
  labels: ['PDF', 'Docx', 'TXT', 'Excel'],
  datasets: [
    {
      label: 'Số lượng',
      data: [15, 4, 2, 9],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(25, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(25, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Bảng phân loại dạng file trong hệ thống",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
return (
    <Doughnut data={data} options={options} />
);
}
export default TotalChart;

// export function App() {
//   return <Doughnut data={data} />;
// }
