import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Marketplace from "./components/Marketplace";
import Upload from "./components/Upload";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
