import React, { createContext, useEffect, useMemo, useState } from 'react';

export const CartContext = createContext();

const CART_STORAGE_KEY = 'sports-shop-cart';

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + quantity } : p));
      }
      return [...prev, { ...product, qty: quantity }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((s, it) => s + it.qty * it.price, 0), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
