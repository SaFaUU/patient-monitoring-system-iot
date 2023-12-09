import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const EcgComponent = () => {
  const canvasRef = useRef(null);
  const data = Array.from({ length: 80 }, () => Math.random() * 100); // Dummy Y values
  const chartDataRef = useRef(data);
  const newECGData = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://industrial.ubidots.com/api/v2.0/variables/?fields=device,label,lastValue&label=myecg&device__label__in=esp8266,",
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = await response.json();

        // Update state directly with the new data
        newECGData.current = newData.results[0].lastValue.value;
        console.log(newECGData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchData, 50);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
            label: "ECG Signal",
            data: chartDataRef.current,
            borderColor: "darkblue",
            borderWidth: 2,
            fill: false,
            lineTension: 0.1,
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
            min: -200,
            max: 1100,
          },
        },
      },
    });

    // Update the chart data with the current ECG data
    const updateChart = () => {
      chartDataRef.current.shift(); // Remove the first element
      chartDataRef.current.push(newECGData.current); // Add a new random element
      chart.update();
      setTimeout(() => requestAnimationFrame(updateChart), 500); // Slower update rate
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

export default EcgComponent;
