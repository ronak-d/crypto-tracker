import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import { CryptoContext, CryptoState } from "../Context/CryptoContext";
import CryptoCharts from "../ChartsComponent/CryptoCharts";

// css
import "../CSS/CoinsPage.css";
import { Box, Container } from "@mui/material";

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  // const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <>
      <Box className="coinContainer">
        <Box className="coinInfo">coin</Box>
        <Box className="coinCharts">
          <CryptoCharts />
        </Box>
      </Box>
    </>
  );
};

export default CoinsPage;
