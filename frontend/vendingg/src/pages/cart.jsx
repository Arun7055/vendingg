import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/Cart.css";

function Cart() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const total = Object.values(cartItems).reduce(
    (acc, item) => acc + item.cost * item.count,
    0
  );

  const handleCheckout = async () => {
    try {
      // Process each item in the cart
      for (const item of Object.values(cartItems)) {
        const response = await fetch(`http://localhost:5000/api/products/name/${item.name}/quantity`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ count: item.count }) // use item.count not item.quantity
        });        

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to update product quantity');
        }
      }

      // If all items are processed successfully
      clearCart(); // Clear the cart
      navigate('/payment-success'); // Navigate to success page
      
    } catch (error) {
      setError(error.message);
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {Object.values(cartItems).map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.url} alt={item.title} />
              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>Quantity: {item.count}</p>
                <p>Total: ${(item.count * item.cost).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <h3>Grand Total: ${total.toFixed(2)}</h3>
          <div className="cart-buttons">
            <button className="clear" onClick={clearCart}>Clear Cart</button>
            <button className="checkout" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
