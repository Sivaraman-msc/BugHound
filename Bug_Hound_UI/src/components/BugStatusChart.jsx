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
        backgroundColor: ['red', 'green', '#facc15', 'pink'],
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
        text: 'Bug Status',
        color: 'white',
        font: { size: 16 },
      },
      tooltip: {
        bodyColor: 'white',
        titleColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
    },
    scales: {
      x: {
        ticks: { color: 'white', font: { size: 12 } },
        grid: { color: 'rgba(255,255,255,0.2)' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: 'white', stepSize: 1 },
        grid: { color: 'rgba(255,255,255,0.2)' },
      },
    },
  };

  return (
    <div className="w-full max-w-md h-72 mx-auto p-4 bg-blue-900 shadow-md rounded">
      <Bar data={data} options={options} />
    </div>
  );
}
