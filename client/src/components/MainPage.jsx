import React, { useState, useEffect } from "react";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import MarkaFiyatGrafigi from "./charts/MarkaFiyatGrafigi";
import { createPieChartOptions } from "../config/chartConfigs/pieChartConfig";
import { createBarChartOptions } from "../config/chartConfigs/barChartConfig";
import { fetchData } from "../services/dataService";
import LoadingSpinner from "./common/LoadingSpinner";

function MainPage() {
  const [chartData, setChartData] = useState({
    urunler: [],
    expensesData: [],
    productsData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setChartData({
          urunler: data.urunler || [],
          expensesData: data.expenses || [],
          productsData: data.products || []
        });
      } catch (error) {
        setError("Veri yükleme hatası oluştu");
        console.error("Veri yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Renklere göre stokları birleştir
  const renkStokları = chartData.urunler.reduce((acc, item) => {
    if (!acc[item.renk]) {
      acc[item.renk] = 0;
    }
    acc[item.renk] += item.stok;
    return acc;
  }, {});

  // Marka bazlı stokları birleştir
  const markaStokları = chartData.urunler.reduce((acc, item) => {
    if (!acc[item.marka]) {
      acc[item.marka] = 0;
    }
    acc[item.marka] += item.stok;
    return acc;
  }, {});

  const stockChartData = {
    labels: Object.keys(markaStokları),
    datasets: [{
      label: 'Stok Miktarı',
      data: Object.values(markaStokları),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ],
      borderWidth: 1
    }]
  };

  const expensesChartData = {
    labels: chartData.expensesData.map(item => item.category),
    datasets: [{
      label: 'Gider Miktarı',
      data: chartData.expensesData.map(item => item.amount),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ],
      borderWidth: 1
    }]
  };

  const productBarData = {
    labels: chartData.productsData.map(item => item.name),
    datasets: [{
      label: 'Ürün Satışları',
      data: chartData.productsData.map(item => item.stockQuantity),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const renkStokChartData = {
    labels: Object.keys(renkStokları),
    datasets: [{
      label: 'Renklere Göre Stok Miktarı',
      data: Object.values(renkStokları),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#90EE90',
        '#000000',
        '#808080',
        '#FFFFFF',
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Gösterge Paneli</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {chartData.urunler.length > 0 && (
          <PieChart 
            data={stockChartData} 
            options={createPieChartOptions("Marka Bazlı Toplam Stok Dağılımı")} 
          />
        )}
        {chartData.expensesData.length > 0 && (
          <PieChart 
            data={expensesChartData} 
            options={createPieChartOptions("Gider Kategorileri")} 
          />
        )}
        {chartData.productsData.length > 0 && (
          <BarChart 
            data={productBarData} 
            options={createBarChartOptions("Ürün Stok Durumu")} 
          />
        )}
        {chartData.urunler.length > 0 && (
          <MarkaFiyatGrafigi 
            urunler={chartData.urunler}
          />
        )}
        {chartData.urunler.length > 0 && (
          <PieChart 
            data={renkStokChartData} 
            options={createPieChartOptions("Renklere Göre Stok Dağılımı")} 
          />
        )}
      </div>
    </div>
  );
}

export default MainPage;