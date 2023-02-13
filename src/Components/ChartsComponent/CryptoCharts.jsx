import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../Config/api";
import { CryptoState } from "../Context/CryptoContext";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

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
    // console.log(data.prices);
    setHistoricalData(data.prices);
    console.log("historicaldata", historicaldata);
  };

  useEffect(() => {
    fetchCharts();
    console.log(days);
  }, [currency, days]);

  // for charts hover etc.
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
    <div style={{ margin: "30px " }}>
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
              borderColor: "yellow",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      {/* buttons */}
      <div
        style={{
          margin: "30px",
          display: "flex",
          flexdirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setDays(1);
          }}
        >
          24 Hours
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setDays(30);
          }}
        >
          30 Days
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setDays(90);
          }}
        >
          3 Months
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setDays(365);
          }}
        >
          1 Year{" "}
        </Button>
      </div>
    </div>
  );
};

export default CryptoCharts;
