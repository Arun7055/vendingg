import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, clearCart }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const response = await fetch(`http://localhost:5000/api/products/name/${item.name}/quantity`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ count: item.quantity })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update product quantity');
        }
      }

      clearCart();
      navigate('/payment-success');

    } catch (error) {
      setError(error.message);
      console.error('Checkout failed:', error);
    }
  };

  return (
    <div className="cart">
      {error && <div className="error-message">{error}</div>}

      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.name} className="cart-item">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price * item.quantity}</p>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</h3>
            <button onClick={clearCart} style={{ marginRight: '10px', backgroundColor: 'red', color: 'white' }}>
              Clear Cart
            </button>
            <button 
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              style={{ backgroundColor: 'green', color: 'white' }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
