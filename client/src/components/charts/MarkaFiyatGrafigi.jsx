import React from "react";
import LineChart from "./LineChart";
import { createLineChartOptions } from "../../config/chartConfigs/lineChartConfig";
import { hesaplaMarkaFiyatları, createMarkaFiyatChartData } from "../../utils/chartDataHelpers";

const MarkaFiyatGrafigi = ({ urunler }) => {
  const markaFiyatları = hesaplaMarkaFiyatları(urunler);
  const chartData = createMarkaFiyatChartData(markaFiyatları);
  const options = createLineChartOptions("Marka Ortalama Fiyatları");

  return <LineChart data={chartData} options={options} />;
};

export default MarkaFiyatGrafigi;