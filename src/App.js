import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NewHeader from "./Components/NewHeader/NewHeader";
import AllRoutes from "./Components/Routes/AllRoutes";
import "./Components/CSS/AppCSS.css";
function App() {
  return (
    <BrowserRouter>
      <div className="AppCSS">
        <NewHeader />
        <AllRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
