import {
  createTheme,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { CryptoState } from "../Context/CryptoContext";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";

// table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]); //{api includes 100 coins}.
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Universal
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      type: "dark",
    },
  });

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
              size: "large",
            }}
            id="outlined-basic"
            // label="Outlined"
            placeholder="Search Crypto..."
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />

          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "darkgray" }}>
                  {["coins", "Prices", "24Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "800",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                    ></TableCell>
                  ))}
                </TableHead>
              </Table>
            )}
          </TableContainer>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsTable;
