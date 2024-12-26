import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Road Safety Index
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/safety-score">
            Safety Score
          </Button>
          <Button color="inherit" component={Link} to="/report-hazard">
            Report Hazard
          </Button>
          <Button color="inherit" component={Link} to="/heatmap">
            Heatmap
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
