import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, Typography, TextField, Button, Table, 
  TableBody, TableCell, TableHead, TableRow, Paper, Box, IconButton, CircularProgress, Divider 
} from '@mui/material';
import { Delete, Edit, Logout } from '@mui/icons-material';
import axios from 'axios';

export default function AdminPanel() {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const foodRes = await axios.get('http://localhost:5000/api/foods');
      const orderRes = await axios.get('http://localhost:5000/api/admin/orders');
      
      setFoods(Array.isArray(foodRes.data) ? foodRes.data : []);
      setOrders(Array.isArray(orderRes.data) ? orderRes.data : []); 
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const audio = new Audio('/AA.mp3');
    audio.play().catch(() => console.log("Audio waiting for interaction"));
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return alert("Please enter Name, Price, and Image URL");
    
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/admin/update/${editId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/admin/add', form);
      }
      setForm({ name: '', price: '', image: '', description: '' });
      setEditId(null);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
      fetchData();
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container sx={{ py: 5 }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight="bold">Admin Dashboard</Typography>
        <Button variant="outlined" color="error" startIcon={<Logout />} onClick={() => window.location.href='/login'}>Logout</Button>
      </Box>

      {/* CRUD Form */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>{editId ? "Edit Food Item" : "Add New Food"}</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField label="Food Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <TextField label="Price (₹)" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          <TextField label="Image URL" sx={{ gridColumn: 'span 2' }} value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
          <Button variant="contained" fullWidth sx={{ gridColumn: 'span 2', py: 1.5, bgcolor: editId ? '#1976d2' : '#000' }} onClick={handleSubmit}>
            {editId ? "Update Item" : "Save Item"}
          </Button>
        </Box>
      </Paper>

      {/* Food List */}
      <Typography variant="h5" mb={2} fontWeight="bold">Menu Items</Typography>
      <Table component={Paper} sx={{ mb: 5 }}>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.length === 0 ? (
            <TableRow><TableCell colSpan={4} align="center">No items found.</TableCell></TableRow>
          ) : (
            foods.map((f) => (
              <TableRow key={f._id} hover>
                <TableCell>
                  <img src={f.image} alt="" style={{ width: 50, height: 50, borderRadius: 6, objectFit: 'cover' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{f.name}</TableCell>
                <TableCell>₹{f.price}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => { setEditId(f._id); setForm(f); }} color="primary"><Edit /></IconButton>
                  <IconButton onClick={() => deleteFood(f._id)} color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Divider sx={{ my: 5 }} />

      {/* Orders List with 1-10 restart logic */}
      <Typography variant="h5" mb={2} fontWeight="bold">Recent Customer Orders</Typography>
      <Table component={Paper}>
        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Items Ordered</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow><TableCell colSpan={4} align="center">No orders placed yet.</TableCell></TableRow>
          ) : (
            orders.map((order, index) => {
              // Logic: index % 10 gives 0-9, so +1 gives 1-10
              const displayId = (index % 10) + 1;
              return (
                <TableRow key={order._id}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Customer {displayId}</TableCell>
                  <TableCell>
                    {order.items?.map((item, i) => (
                      <div key={i} style={{ fontSize: '0.85rem' }}>• {item.name}</div>
                    ))}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>₹{order.total}</TableCell>
                  <TableCell>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>{order.status || 'Ordered'}</span>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Container>
  );
}