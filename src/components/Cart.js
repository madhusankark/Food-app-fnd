import React, { useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Paper, Divider, Box } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material'; 
import { CartContext } from '../context/CartContext';
import axios from 'axios';

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  
  // Logic remains the same, calculating total from the item price values
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    try {
      await axios.post('https://food-app-bnd.onrender.com/api/orders', {
        user: "Customer_" + Math.floor(Math.random() * 1000), // Guest ID
        items: cart,
        total: total
      });
      alert("🎉 Order placed successfully!");
      setCart([]);
    } catch (err) {
      alert("Error placing order. Is the backend running?");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom display="flex" alignItems="center">
          <ShoppingBag sx={{ mr: 1 }} /> Your Selection
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        {cart.length === 0 ? (
          <Typography color="text.secondary" align="center" py={4}>
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <List>
              {cart.map((item, index) => (
                <ListItem key={index} secondaryAction={
                  // CHANGED: Guaranteed Rupees Symbol for individual items
                  <Typography fontWeight="bold">₹{item.price}</Typography>
                }>
                  <ListItemText primary={item.name} secondary="Ready to cook" />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Box display="flex" justifyContent="space-between" mb={4}>
              <Typography variant="h6">Total:</Typography>
              {/* CHANGED: Guaranteed Rupees Symbol for the total */}
              <Typography variant="h6" color="orange" fontWeight="900">
                ₹{total}
              </Typography>
            </Box>
            
            <Button 
              fullWidth 
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: '#000', 
                borderRadius: 3, 
                py: 1.5, 
                '&:hover': { bgcolor: '#333' } 
              }}
              onClick={handleCheckout}
            >
              Confirm & Pay
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}