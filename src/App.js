import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NewHeader from "./Components/NewHeader/NewHeader";
import AllRoutes from "./Components/Routes/AllRoutes";
import "./Components/CSS/AppCSS.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// refer dark mode of the mui.
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="AppCSS">
          <NewHeader />
          <AllRoutes />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
