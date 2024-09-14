import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import '../src/styles/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:cfskey/:cfstoken" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
