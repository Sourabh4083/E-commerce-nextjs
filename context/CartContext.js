"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const res = await fetch("/api/current-user");
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);

      
      const guestCart = JSON.parse(localStorage.getItem("guestCart"));
      if (guestCart && guestCart.length > 0) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: guestCart }),
        });
        localStorage.removeItem("guestCart");
        setCartItem(guestCart); 
      }
    } else {
      setUser(null);
    }
  };


  useEffect(() => {
    fetchUser()
  }, [])

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" })
    setUser(null)
  }


  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return; 

      try {
        const res = await fetch("/api/cart");
        if (!res.ok) {
          console.warn("Cart fetch failed with status", res.status);
          return;
        }

        const data = await res.json();
        if (data.cart?.cartItem) {
          const items = data.cart.cartItem.map(item => ({
            _id: item._id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          }));
          setCartItem(items);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [user]);


  useEffect(() => {
  const saveCart = async () => {
    if (!user || cartItem.length === 0) return;

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItem }),
    });
  };

  saveCart();
}, [cartItem]);





  const addToCart = (product) => {
    setCartItem((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      const updated = exists
        ? prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [...prev, { ...product, quantity: 1 }];

      if (!user) {
        localStorage.setItem("guestCart", JSON.stringify(updated));
      }

      return updated;
    });
  };


  const removeFromCart = (id) => {
    setCartItem((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCartItem([]);

  const totalItem = cartItem.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItem, logout, user, setUser, refreshUser: fetchUser, addToCart, removeFromCart, clearCart, totalItem, setCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
