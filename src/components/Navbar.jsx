// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
        boxShadow: '0 4px 6px rgba(33, 150, 243, 0.2)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 0,
            fontWeight: 700,
            color: 'white',
            fontSize: '1.5rem',
          }}
        >
          Road Safety Index
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          flexGrow: 1,
          gap: '2rem'  // Increased spacing between buttons
        }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ 
              fontSize: '1.1rem',  // Increased font size
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/safety-score"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Safety Score
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/report-hazard"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Report Hazard
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/heatmap"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Heatmap
          </Button>
        </Box>
        
        {/* Empty Box for balanced spacing */}
        <Box sx={{ flexGrow: 0, width: '200px' }}></Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
