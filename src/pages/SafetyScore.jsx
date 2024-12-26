import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import Confetti from 'react-confetti';
import '../styles/app.css';

const calculateSafetyScore = (accidents, roadCondition, traffic) => {
  // If no accidents, calculate base score from road condition and traffic
  if (accidents === 0) {
    const baseScore = ((roadCondition * 10) * 0.6) + ((11 - traffic) * 10 * 0.4);
    return Math.min(100, baseScore);
  }

  // For cases with accidents
  if (roadCondition <= 0 || traffic <= 0) {
    return 0;
  }

  const accidentScore = Math.max(0, 100 - (accidents * 15));
  const roadScore = roadCondition * 10;
  const trafficScore = (11 - traffic) * 10;

  const score = (
    (accidentScore * 0.4) +
    (roadScore * 0.35) +
    (trafficScore * 0.25)
  );

  return Math.min(100, Math.max(0, Math.round(score)));
};

const SafetyScore = () => {
  const [accidents, setAccidents] = useState('');
  const [roadCondition, setRoadCondition] = useState('');
  const [traffic, setTraffic] = useState('');
  const [safetyScore, setSafetyScore] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateSafetyScore(
      Number(accidents),
      Number(roadCondition),
      Number(traffic)
    );
    setSafetyScore(score);

    // Show confetti for high scores
    if (score >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  return (
    <Container maxWidth="md" className="page-container">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <Card className="calculator-card">
        <CardContent>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              marginBottom: '2rem'
            }}
          >
            Road Safety Score Calculator
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className="input-field"
                  label="Number of Accidents"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={accidents}
                  onChange={(e) => setAccidents(e.target.value)}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="input-field"
                  label="Road Condition (1-10)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={roadCondition}
                  onChange={(e) => setRoadCondition(e.target.value)}
                  required
                  inputProps={{ min: 1, max: 10 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="input-field"
                  label="Traffic Density (1-10)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={traffic}
                  onChange={(e) => setTraffic(e.target.value)}
                  required
                  inputProps={{ min: 1, max: 10 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  className="submit-button"
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ py: 1.5, fontSize: '1.1rem' }}
                >
                  Calculate Safety Score
                </Button>
              </Grid>
            </Grid>
          </form>

          {safetyScore !== null && (
            <Box className={`score-display ${getScoreClass(safetyScore)}`}>
              <Typography variant="h5" gutterBottom>
                Safety Score
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  color: safetyScore >= 80 ? '#2e7d32' : 
                         safetyScore >= 50 ? '#ed6c02' : '#d32f2f'
                }}
              >
                {safetyScore}%
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {safetyScore >= 80 ? '✨ Excellent Safety Conditions!' :
                 safetyScore >= 50 ? '⚠️ Moderate Safety Level' :
                 '⚠️ Safety Improvements Needed'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SafetyScore;
