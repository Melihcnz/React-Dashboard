import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data, options, title }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg" style={{ height: "400px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;