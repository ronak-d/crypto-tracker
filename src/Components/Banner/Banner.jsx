import { Container, Typography } from "@mui/material";
import React from "react";
import "../CSS/Banner.css";
import Caraoussel from "./Caraoussel";

const Banner = () => {
  return (
    <div className="bannerContainer">
      <Container className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              padding: "7px 0px",
              fontFamily: "Montserrat",
              marginTop: "27px",
            }}
          >
            Crypto Tracker
          </Typography>

          <Typography
            variant="subtitle2"
            style={{
              color: "darkgray",
              textTransform: "capitalize",
              padding: "7px 5px",
              fontFamily: "Montserrat",
            }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Caraoussel />
      </Container>
    </div>
  );
};

export default Banner;
