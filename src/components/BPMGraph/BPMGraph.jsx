import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BPMGraph = () => {
  const canvasRef = useRef(null);
  const data = Array.from({ length: 50 }, () => Math.random() * 100); // Dummy Y values
  const chartDataRef = useRef(data);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Create a new Chart instance
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: data.length }, (_, i) => i),
        datasets: [
          {
            label: "BPM",
            data: chartDataRef.current,
            borderColor: "red",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            min: 0,
            max: data.length,
          },
          y: {
            type: "linear",
            position: "left",
            min: 0,
            max: 100,
          },
        },
      },
    });

    // Update the chart data with the current ECG data
    const updateChart = () => {
      chartDataRef.current.shift(); // Remove the first element
      chartDataRef.current.push(Math.random() * 100); // Add a new random element
      chart.update();
      setTimeout(() => requestAnimationFrame(updateChart), 1000); // Slower update rate
    };

    updateChart(); // Start updating the chart

    return () => {
      chart.destroy(); // Destroy the chart when the component is unmounted
    };
  }, []);

  return (
    <div>
      {screen.width > 500 ? (
        <canvas
          ref={canvasRef}
          width={screen.availWidth / 2 - 100}
          height={300}
        />
      ) : (
        <canvas ref={canvasRef} width={150} height={150} />
      )}
    </div>
  );
};

export default BPMGraph;
