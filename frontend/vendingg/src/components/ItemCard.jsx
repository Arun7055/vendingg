import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../css/ItemCard.css";

function ItemCard({ item }) {
  const { addToCart, removeFromCart } = useCart();
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((c) => c + 1);
    addToCart(item);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((c) => c - 1);
      removeFromCart(item);
    }
  };

  return (
    <div className="ItemCard">
      <div className="ItemPoster">
        <img className="image" src={item.url} alt={item.name} width="200px" height="200px" />
        <div className="itemoverlay">
          <div className="button">
            <button onClick={decrement}>-</button>
            {count}
            <button onClick={increment}>+</button>
          </div>
        </div>
      </div>
      <div className="item_info">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
    </div>
  );
}

export default ItemCard;
