import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NewHeader from "./Components/NewHeader/NewHeader";
import AllRoutes from "./Components/Routes/AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NewHeader />
        <AllRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
