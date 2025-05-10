import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BugConditionAPI } from '../services/BugService';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function BugCondition() {
  const [bugCount, setBugCount] = useState({
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  });

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const res = await BugConditionAPI();
        setBugCount(res);
      } catch (err) {
        console.log('Error fetching bug : ', err);
      }
    };
    fetchBug();
  }, []);

  const data = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        label: 'Bug Severity',
        data: [bugCount.low, bugCount.medium, bugCount.high, bugCount.critical],
        backgroundColor: ['#60a5fa', '#f59e0b', '#ef4444', '#8b5cf6'],
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
        text: 'Bug Severity Distribution',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="w-full max-w-md h-72 mx-auto p-4 bg-white shadow-md rounded">
      <Bar data={data} options={options} />
    </div>
  );
}
