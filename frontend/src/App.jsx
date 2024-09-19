import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Toogle from "./components/Toogle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Toogle />} />
      </Routes>
    </Router>
  );
}

export default App;
