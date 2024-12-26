import React from 'react';
import '../styles/app.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Road Safety Index Calculator</h1>
        <p className="subtitle">Making roads safer, one analysis at a time</p>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h3>Interactive Heatmaps</h3>
          <p>Visualize road safety data through detailed heatmaps of your region</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Safety Scores</h3>
          <p>Get comprehensive safety ratings based on multiple factors</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚠️</div>
          <h3>Hazard Reporting</h3>
          <p>Report and track road hazards in your community</p>
        </div>
      </div>

      <div className="cta-section">
        <h2>Start Exploring Road Safety Today</h2>
        <p>Use our tools to contribute to safer roads in your community</p>
      </div>
    </div>
  );
};

export default Home;
