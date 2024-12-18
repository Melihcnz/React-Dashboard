import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, options }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg md:col-span-2" style={{ height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;