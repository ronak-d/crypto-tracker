import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from ".././Config/api";
import { CryptoState } from ".././Context/CryptoContext";

const Caraoussel = () => {
  const [trendingCoins, setTrendnigCoins] = useState([]);

  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendnigCoins(data);
  };
  console.log(trendingCoins);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  return <div className="Caraoussel">Caraoussel</div>;
};

export default Caraoussel;
