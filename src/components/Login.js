import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { LockPerson } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', credentials);
      if (res.data.success) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 12 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <LockPerson sx={{ fontSize: 50, color: '#ff9800', mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" mb={1}>Admin Entry</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Two admins only</Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>Access Denied</Alert>}
        
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Admin Email" 
            variant="outlined" 
            required 
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          />
          <TextField 
            label="Secret Password" 
            type="password" 
            variant="outlined" 
            required 
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: '#000', py: 1.5 }}>
            Verify Identity
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}