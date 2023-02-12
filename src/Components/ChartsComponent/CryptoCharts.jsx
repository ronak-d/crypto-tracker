import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { CryptoState } from "../Context/CryptoContext";
import CircularProgress from "@mui/material/CircularProgress";

// chart.js
import { Line } from "react-chartjs-2";
import { yellow } from "@mui/material/colors";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

const CryptoCharts = ({ coin }) => {
  const [historicaldata, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();

  const fetchCharts = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // console.log("data", data);
    setHistoricalData(data.prices);
    console.log("historicaldata", historicaldata);
  };

  useEffect(() => {
    fetchCharts();
  }, [currency, days]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return !historicaldata ? (
    <CircularProgress color="success" />
  ) : (
    <>
      <Line
        data={{
          // x- axis
          labels: historicaldata.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          // y-axis
          datasets: [
            {
              data: historicaldata.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
      />
    </>
  );
};

export default CryptoCharts;
