import React from "react";
import {
  AppBar,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import "../CSS/NewHeader.css";
import { Link } from "react-router-dom";

const NewHeader = () => {
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" className="nameApp">
            <Link className="nameApp" style={{ textDecoration: "none" }} to="/">
              Crypto Tracker
            </Link>
          </Typography>

          <InputLabel style={{ color: "white", margin: "0, 10px" }}>
            Select Currency :
          </InputLabel>
          <Select
            variant="outlined"
            style={{ color: "white", width: "100", marginRight: "15" }}
            // onChange={handleChange}
          >
            <MenuItem value={"INR"}>INR</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NewHeader;
