import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';

// Function to calculate the safety score
const calculateSafetyScore = (accidents, roadCondition, traffic) => {
  // Ensure valid inputs
  if (accidents <= 0 || roadCondition <= 0 || traffic <= 0) {
    return 0;
  }

  // Example calculation: Adjust the weights based on your criteria
  const score = (accidents * 0.3) + (roadCondition * 0.4) + (traffic * 0.3);
  return Math.min(score, 100); // Ensure the score does not exceed 100
};

const SafetyScore = () => {
  // State variables for form inputs and safety score
  const [accidents, setAccidents] = useState(0);
  const [roadCondition, setRoadCondition] = useState(0);
  const [traffic, setTraffic] = useState(0);
  const [safetyScore, setSafetyScore] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateSafetyScore(accidents, roadCondition, traffic);
    setSafetyScore(score);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Road Safety Score Calculator
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Accidents (per year)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={accidents}
                  onChange={(e) => setAccidents(Number(e.target.value))}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Road Condition (1 to 10)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={roadCondition}
                  onChange={(e) => setRoadCondition(Number(e.target.value))}
                  required
                  inputProps={{ min: 1, max: 10 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Traffic Density (1 to 10)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  required
                  inputProps={{ min: 1, max: 10 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Calculate Safety Score
                </Button>
              </Grid>
            </Grid>
          </form>

          <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Safety Score: {safetyScore}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SafetyScore;
