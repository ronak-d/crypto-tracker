import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";

const NewHeader = () => {
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography>Crypto Tracker</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NewHeader;
