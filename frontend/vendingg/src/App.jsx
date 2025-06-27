import React from 'react'
import ItemCard from './components/ItemCard'
import Home from './pages/home';
import Cart from './pages/cart';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import "./css/App.css"
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <div>
    <CartProvider>
      <NavBar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
    </CartProvider>
    </div>
  );
}

export default App
