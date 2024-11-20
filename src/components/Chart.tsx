'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '@styles/chart.css';

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  labels: string[]; // Eixo X (ex: datas ou horários)
  dataPoints: number[]; // Valores correspondentes
  label: string; // Rótulo do gráfico
};

export default function Chart({ labels, dataPoints, label }: ChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataPoints,
        fill: false,
        borderColor: 'var(--primary-color)',
        backgroundColor: 'var(--primary-color)',
        pointBackgroundColor: 'var(--accent-color)',
        tension: 0.3, // Suaviza as curvas do gráfico
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'var(--text-color)',
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem: any) =>
            `Valor: ${tooltipItem.raw.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'var(--text-color)',
        },
        grid: {
          color: 'var(--table-border)',
        },
      },
      y: {
        ticks: {
          color: 'var(--text-color)',
        },
        grid: {
          color: 'var(--table-border)',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
}
