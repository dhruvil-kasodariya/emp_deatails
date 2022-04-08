import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import View from "./pages/View/View";
function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/view/:id' element={<View/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
