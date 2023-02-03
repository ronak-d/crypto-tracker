import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
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

  const items = trendingCoins.map((coin) => {
    return (
      <Link className={Caraoussel} to={`/coins/${coin.id}`}>
        <div style={{ margin: "50px 0px", marginRight: "20px" }}>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ margin: "10px" }}
          />
          <p
            style={{
              display: "flex",
              fontFamily: "Montserrat",
              textAlign: "center",
              // border: "2px solid red",
              marginLeft: "15px",
              color: "white",
            }}
          >{`${symbol} ${coin.current_price}`}</p>
        </div>
      </Link>
    );
  });

  // kind of media queries for the carousel.
  const responsive = {
    0: {
      // 0 pixels = 2 cards will be displayed
      items: 2,
    },
    512: {
      items: 6,
    },
  };

  return (
    <>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive} // need to make a diff obj.
        autoPlay
        items={items}
      />
    </>
  );
};

export default Caraoussel;
