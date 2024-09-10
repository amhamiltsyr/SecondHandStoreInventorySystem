import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Marketplace from "./components/Marketplace";
import Upload from "./components/Upload";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
