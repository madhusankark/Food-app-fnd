import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box } from '@mui/material';
import { ShoppingCart, Dashboard, RestaurantMenu } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1a1a1a' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <RestaurantMenu sx={{ mr: 1, color: '#ff9800' }} /> FOODIE
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Menu</Button>
          <Button color="inherit" component={Link} to="/admin">Admin</Button>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}