import React from 'react';
import { Bar } from 'react-chartjs-2';

const StokDagilimGrafikleri = ({ urunler }) => {
  const data = {
    labels: urunler.map(urun => urun.name),
    datasets: [
      {
        label: 'Stok Miktarı',
        data: urunler.map(urun => urun.stockQuantity),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ürün Stok Dağılımı',
      },
    },
  };

  return (
    <div className="p-4 rounded-lg bg-base-200">
      <Bar options={options} data={data} />
    </div>
  );
};

export default StokDagilimGrafikleri;