import { createContext, useContext, useState, useEffect } from "react";
import { addToCartAPI,
  getCartItemsAPI,
  updateCartItemAPI,
  removecartItemAPI,
  cleareCartAPI, } from "../api/cart";

export const CartContext = createContext()

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  // ------------------ FETCH CART ------------------
  const fetchCart = async () => {
    try {
      const res = await getCartItemsAPI();
      const data = res.data;

      setCart(data.cart_items || []);
      setTotalItems(data.total_items || 0);
      setTotalPrice(data.total_price || 0);
      console.log(res.data)
    } catch (err) {
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ------------------ ADD TO CART ------------------
  const addToCart = async (variant_id, quantity = 1) => {
    try {
      const res = await addToCartAPI({ variant_id, quantity });
      await fetchCart();
      return { success: true, msg: res.data.message };
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Failed to add item to cart";
      return { success: false, msg };
    }
  };

  // ------------------ UPDATE QTY ------------------
  const updateCartItem = async (variant_id, quantity) => {
    try {
      const res = await updateCartItemAPI({ variant_id, quantity });
      await fetchCart();
      return { success: true, msg: res.data.message };
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Failed to update quantity";
      return { success: false, msg };
    }
  };

  // ------------------ REMOVE ITEM ------------------
  const removeCartItem = async (variant_id) => {
    try {
      const res = await removecartItemAPI(variant_id);
      await fetchCart();
      return { success: true, msg: res.data.message };
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Failed to remove item";
      return { success: false, msg };
    }
  };

  // ------------------ CLEAR CART ------------------
  const clearCart = async () => {
    try {
      const res = await cleareCartAPI();
      await fetchCart();
      return { success: true, msg: res.data.message };
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Failed to clear cart";
      return { success: false, msg };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        loading,

        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
