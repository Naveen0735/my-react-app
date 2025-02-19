import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserProfileChart: React.FC<{ formData: any }> = ({ formData }) => {
  const data = {
    labels: ['Name', 'Address', 'Email', 'Phone'],
    datasets: [
      {
        label: 'User Profile Trends',
        data: [formData.name ? 1 : 0, formData.address ? 1 : 0, formData.email ? 1 : 0, formData.phone ? 1 : 0],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={data} />;
};

export default UserProfileChart;
