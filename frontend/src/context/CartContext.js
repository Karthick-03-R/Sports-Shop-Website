import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // items: { id, name, price, image, qty }

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p));
  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, it) => s + it.qty, 0);
  const totalPrice = cart.reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
