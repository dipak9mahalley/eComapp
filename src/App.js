import React, { useState } from 'react';
import './App.css';

const PRODUCTS = [
  { id: 1, name: 'Minimalist Watch', category: 'Accessories', price: 2499, image: 'https://plus.unsplash.com/premium_photo-1728759435328-9a5a417edef7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
  { id: 2, name: 'Wireless Headphones', category: 'Electronics', price: 4999, image: 'https://images.unsplash.com/photo-1766338055584-5ffe426a7e57?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
  { id: 3, name: 'Classic Sneakers', category: 'Footwear', price: 3299, image: 'https://plus.unsplash.com/premium_photo-1665413642308-c5c1ed052d12?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
  { id: 4, name: 'Leather Backpack', category: 'Accessories', price: 2899, image: 'https://images.unsplash.com/photo-1549943872-f7ff0b2b51be?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
  { id: 5, name: 'Smart Fitness Band', category: 'Electronics', price: 1999, image: 'https://images.unsplash.com/photo-1758348844348-acaf8d854665?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
  { id: 6, name: 'Running Shoes', category: 'Footwear', price: 3799, image: 'https://plus.unsplash.com/premium_photo-1726097593632-003c63d1dbb8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['All', 'Electronics', 'Accessories', 'Footwear'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((item) => item.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="store-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">UrbanStore</h1>
        <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
          Cart ({totalItems})
        </button>
      </header>

      {/* Hero Banner */}
      <section className="hero">
        <h2>Everyday Essentials</h2>
        <p>Clean design, built to last. Free shipping on orders over ₹999.</p>
      </section>

      {/* Category Filter */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString()}</p>
              <button className="add-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-msg">Your cart is empty.</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <h4>{item.name}</h4>
                        <p>₹{item.price.toLocaleString()} × {item.qty}</p>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <h3>Total: ₹{totalPrice.toLocaleString()}</h3>
                  <button className="checkout-btn" onClick={() => alert('Proceeding to checkout!')}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
