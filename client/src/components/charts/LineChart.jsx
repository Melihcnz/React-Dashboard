import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data, options }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg" style={{ height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart; 