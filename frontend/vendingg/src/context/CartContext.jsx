import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (item) => {
    setCartItems((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        count: prev[item._id] ? prev[item.id].count + 1 : 1,
      },
    }));
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => {
      if (!prev[item._id]) return prev;

      const newCount = prev[item._id].count - 1;
      if (newCount <= 0) {
        const newCart = { ...prev };
        delete newCart[item._id];
        return newCart;
      }
      return {
        ...prev,
        [item.id]: { ...item, count: newCount },
      };
    });
  };

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
