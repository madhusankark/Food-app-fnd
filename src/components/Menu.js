import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('https://food-app-bnd.onrender.com/api/foods')
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Explore Our Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {foods.map(food => (
          <div key={food._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition duration-300">
            <img src={food.image} alt={food.name} className="h-48 w-full object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>
                {/* Updated to Rupees Symbol */}
                <span className="text-orange-600 font-bold">₹{food.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{food.description}</p>
              <button 
                onClick={() => addToCart(food)}
                className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;