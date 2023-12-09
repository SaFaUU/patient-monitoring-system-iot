import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EcgComponent from "./components/ECGComponent/EcgComponent";
import BPMGraph from "./components/BPMGraph/BPMGraph";

function App() {
  const [ecgData, setEcgData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("https://industrial.api.ubidots.com/api/v1.6/auth/token", {
      method: "POST",
      headers: {
        "x-ubidots-apikey": import.meta.env.X_UDIBOTS_APIKEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
      });
  }, []);

  const [temperature, setTemperature] = useState(generateRandomTemperature());
  const [alchol, setAlcohol] = useState(generateRandomAlcohol());
  const [gas, setGas] = useState(generateRandomAlcohol());
  const [smoke, setSmoke] = useState(generateRandomAlcohol());

  // Function to generate a random temperature between -20 and 40
  function generateRandomTemperature() {
    return Math.floor(Math.random() * (105 - 97 + 1) + 97);
  }
  function generateRandomAlcohol() {
    return (Math.random() * (1.3 - 0.6 + 1) + 0.6).toFixed(2);
  }
  function generateRandomSmokeAndGas() {
    return (Math.random() * (1000 - 100 + 1) + 100).toFixed(2);
  }
  useEffect(() => {
    // Set up an interval to update the temperature every 3 seconds (3000 milliseconds)
    const intervalId = setInterval(() => {
      setTemperature(generateRandomTemperature());
      setAlcohol(generateRandomAlcohol());
      setGas(generateRandomSmokeAndGas());
      setSmoke(generateRandomSmokeAndGas());
    }, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mx-auto w-screen h-screen p-5">
      <h1 className="text-center font-bold text-3xl mb-8 mt-3">
        Home Patient Monitoring System
      </h1>
      <div className="mx-auto px-5 w-full">
        <div className="flex flex-col md:flex-row lg:flex-row mx-auto w-full justify-center">
          <div className="">
            <EcgComponent ecgData={ecgData} loading={loading} />
            <h1 className="text-center font-bold text-lg mt-5">ECG Graph</h1>
          </div>
          <div>
            <BPMGraph></BPMGraph>
            <h1 className="text-center font-bold text-lg mt-5">BPM Graph</h1>
          </div>
        </div>
        <h1 className="text-center font-bold text-lg mt-5">TAGS Data</h1>
        <div className="mt-6 w-4/5 mx-auto">
          <div className="flex flex-col md:flex-row lg:flex-row mx-auto w-full justify-center space-y-2 text-center lg:justify-between">
            <p className="border-2 px-2 py-1 w-64">
              Temperature: {temperature}° Farenheit
            </p>
            <p className="border-2 px-2 py-1">Alcohol: {alchol} mg/L</p>
            <p className="border-2 px-2 py-1">Gas: {gas} PPM</p>
            <p className="border-2 px-2 py-1">Smoke: {smoke} PPM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
