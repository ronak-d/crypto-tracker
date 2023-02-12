import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import { CryptoContext, CryptoState } from "../Context/CryptoContext";
import CryptoCharts from "../ChartsComponent/CryptoCharts";

// css
import "../CSS/CoinsPage.css";
import { Box, Container, LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";

// parser
import parse from "html-react-parser";

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  return coin == null ? (
    <LinearProgress color="secondary" />
  ) : (
    <>
      <Box className="coinContainer">
        <Box className="coinInfo">
          {
            <Container>
              <Box>
                <img className="coinImg" src={coin?.image.large} alt="" />
              </Box>
              <div className="heading">{coin?.name}</div>
              <hr />

              <div className="description">
                {/* always need to pass into string else giving err */}
                {parse(`${coin?.description.en.split(". ")[0]}`)}
              </div>
              <hr />
              <div className="marketdata">
                <div className="rank">Rank : {coin?.coingecko_rank}</div>
                <div className="rank">
                  Current Price : {currency}{" "}
                  {coin?.market_data.current_price[currency.toLowerCase()]}
                </div>
                <div className="rank">
                  Market Capital : {currency}{" "}
                  {coin?.market_data.market_cap[currency.toLowerCase()]}
                </div>
              </div>
            </Container>
          }
        </Box>

        <Box className="coinCharts">
          <CryptoCharts coin={coin} />
        </Box>
      </Box>
    </>
  );
};

export default CoinsPage;
