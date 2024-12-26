import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Heatmap from './components/Heatmap';
import Home from './pages/Home';
import SafetyScore from './pages/SafetyScore';
import ReportHazard from './pages/ReportHazard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/safety-score" element={<SafetyScore />} />
        <Route path="/report-hazard" element={<ReportHazard />} />
        <Route path="/heatmap" element={<Heatmap />} />
      </Routes>
    </Router>
  );
};

export default App;
