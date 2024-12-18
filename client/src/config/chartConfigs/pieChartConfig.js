export const createPieChartOptions = (title) => ({
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "white",
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: title,
        color: "white",
        font: { size: 16 },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  });