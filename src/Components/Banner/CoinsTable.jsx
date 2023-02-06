import { createTheme, Typography } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { CryptoState } from "../Context/CryptoContext";

// instead of links
import { useNavigate } from "react-router-dom";

// MUI
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";

// table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Key } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]); //{api includes 100 coins}.
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate(); // to take from the coin table

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}}&sparkline=false`
    );
    setCoins(data);
    setLoading(false);
  };
  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency, page]);

  // Universal
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    const handleSearch = () => {
      return coins.filter((coin) => {
        coin.name.toLowercase().includes(search) ||
          coin.symbol.toLowercase().includes(search);
      });
    };
  }, [search]);

  {
    /* .slice((page - 1) * 10, (page - 1) * 10 + 10) */
  }
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Typography
            variant="h6"
            style={{
              textAlign: "center",
              fontFamily: "Montserrat",
              margin: "20px 0px",
              fontWeight: "bolder",
            }}
          >
            Search Crypto Currencies by their Market Capital
          </Typography>

          <TextField
            style={{
              width: "100%",
              color: "darkgray",
              backgroundColor: "yellow",
              borderRadius: "4px",
              size: "small",
            }}
            id="outlined-basic"
            // label="Outlined"
            placeholder="Search for Cryptos..."
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer>
            {loading ? (
              <LinearProgress
                style={{ backgroundColor: "blue", margin: "20px, 0px" }}
              />
            ) : (
              <Table style={{ margin: "20px 0px" }}>
                <TableHead style={{ backgroundColor: "yellowgreen" }}>
                  {["Coins", "Prices", "24H % Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "800",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableHead>

                <TableBody>
                  {coins.map((coin) => {
                    return (
                      <TableRow
                        onClick={() => navigate("/coins/${coin.id}")}
                        style={{
                          color: "white",
                        }}
                        key={coin.market_cap}
                      >
                        <TableCell
                          style={{ color: "white", fontWeight: "bold" }}
                          align="left"
                        >
                          <img
                            style={{
                              width: "30px",
                              height: "30px",
                              // border: "2px solid red",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "8px 0px",
                            }}
                            src={coin?.image}
                            alt={coin.symbol}
                          />
                          {coin.name}
                        </TableCell>
                        <TableCell
                          style={{ color: "yellow", fontWeight: "bold" }}
                          align="left"
                        >
                          {coin.current_price.toFixed(2)}
                        </TableCell>
                        <TableCell
                          style={{ color: "yellow", fontWeight: "bold" }}
                          align="left"
                        >
                          {coin.market_cap_change_24h.toFixed(2)}
                        </TableCell>
                        <TableCell
                          style={{ color: "white", fontWeight: "bold" }}
                          align="left"
                        >
                          {coin.market_cap.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Container
            style={{
              alignItems: "center",
              backgroundColor: "yellow",
              padding: "10px",
            }}
          >
            <Pagination
              count={10}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 420);
              }}
              color="secondary"
            />
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsTable;

// for search related thing see 1:2mina
