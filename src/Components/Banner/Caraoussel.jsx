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
  // console.log(trendingCoins);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoins.map((coin) => {
    return (
      <Link className={Caraoussel} to={`/coins/${coin.id}`}>
        <div
          style={{
            // border: "1px solid red",
            margin: "50px 10px",
            // marginRight: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={coin?.image}
            alt={coin.name}
            height="100"
            width="100"
            style={{ margin: "10px" }}
          />
          <p
            style={{
              fontFamily: "Montserrat",
              textAlign: "center",
              fontWeight: "bold",
              alignContent: "flex-start",
              // border: "2px solid red",
              // color: "white",
            }}
          >
            {coin.name}
          </p>

          {/* % price in 24  */}
          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              margin: "5px 0px",
            }}
          >
            <p
              style={
                coin.price_change_percentage_24h > 0
                  ? { color: "green" }
                  : { color: "red" }
              }
            >
              {/* {coin.symbol} */}
              {coin.price_change_percentage_24h > 1
                ? ` +${coin.price_change_percentage_24h}`
                : ` ${coin.price_change_percentage_24h}`}
              {/* {`${coin.price_change_percentage_24h}%`} */}
            </p>
          </span>

          {/* price in rupee or dollar */}
          <p
            style={{
              // display: "flex",
              fontFamily: "Montserrat",
              textAlign: "center",
              fontWeight: "bold",
              // border: "2px solid red",
              color: "white",
            }}
          >
            {`${symbol} ${coin.current_price}`}
          </p>
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
      items: 5,
    },
  };

  return (
    <>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1300}
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
