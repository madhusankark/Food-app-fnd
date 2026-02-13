import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import Login from './components/Login';
import { CartProvider } from './context/CartContext';

// 🔒 ROUTE GUARD COMPONENT
const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          
          {/* PROTECTED ADMIN PANEL */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;