import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { CryptoState } from "../Context/CryptoContext";
import CircularProgress from "@mui/material/CircularProgress";

// chart.js
import { Line } from "react-chartjs-2";

const CryptoCharts = ({ coin }) => {
  const [historicaldata, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();

  const fetchCharts = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // console.log("data", data);
    setHistoricalData(data.prices);
    console.log(historicaldata);
  };

  useEffect(() => {
    fetchCharts();
  }, [currency, days]);

  return !historicaldata ? (
    <CircularProgress color="success" />
  ) : (
    <>
      <Line data={data} />
    </>
  );
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [],
};

export default CryptoCharts;
