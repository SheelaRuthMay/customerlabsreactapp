import { Routes, Route, BrowserRouter  } from "react-router-dom";
import './App.css';
import './index.css';
import Dashboard from "./pages/Dashboard";

function App() {
  
  return (
    <div className="App">
      
    <Routes>
      
      <Route path="/" exact element={<Dashboard />} />
   
    </Routes>

    </div>
  );
}

export default App;
