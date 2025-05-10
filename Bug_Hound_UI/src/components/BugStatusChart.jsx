import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BugStatAPI } from '../services/BugService';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function BugStatusChart() {
  const [bugCount, setBugCount] = useState({
    bugs: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const fetchBug = async () => {
      const res = await BugStatAPI();
      setBugCount(res);
    };
    fetchBug();
  }, []);

  const data = {
    labels: ['Total Bugs', 'Open', 'In Progress', 'Closed'],
    datasets: [
      {
        label: 'Bug Count',
        data: [bugCount.bugs, bugCount.open, bugCount.inProgress, bugCount.closed],
        backgroundColor: ['#6366f1', '#3b82f6', '#facc15', '#10b981'],
        barThickness: 34,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Bug Status ',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md h-72 mx-auto p-4 bg-white shadow-md rounded">
      <Bar data={data} options={options} />
    </div>
  );
}
