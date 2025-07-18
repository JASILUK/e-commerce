import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { globelcontext } from './userConetxt';
import Usecustom from '../customehook/Usecustom';

export const Crtcontext = createContext();

function CartContext({ children }) {
  const { user, loading } = useContext(globelcontext);
  const [cartdata, setcart] = useState([]);
  const [cartid, setcartid] = useState(null);
  const [orders, setorders] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  const { data: iscarted } = Usecustom(
    !loading && user?.id ? `${BASE_URL}/carts?userId=${user.id}` : null
  );

  useEffect(() => {
    if (!user) {
      setcart([]);
      setcartid(null);
      setorders([]);
    }
  }, [user]);

  useEffect(() => {
    const setupCart = async () => {
      if (user && iscarted) {
        if (iscarted.length > 0) {
          setcart(iscarted[0].items);
          setcartid(iscarted[0].id);
        } else {
          const res = await axios.post(`${BASE_URL}/carts`, {
            userId: user.id,
            items: [],
          });
          setcart([]);
          setcartid(res.data.id);
        }
      }
    };

    setupCart();
  }, [iscarted, user]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.id) {
        try {
          const res = await axios.get(`${BASE_URL}/orders?userId=${user.id}`);
          setorders(res.data);
        } catch (err) {
          console.log('Error fetching orders:', err.message);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return null;

  const updateCart = async (items) => {
    setcart(items);
    if (cartid) {
      await axios.patch(`${BASE_URL}/carts/${cartid}`, { items });
    }
  };

  const addtocart = async (item) => {
    const exist = cartdata.find((i) => i.id === item.id);
    let updated;
    if (exist) {
      updated = cartdata.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...cartdata, { ...item, quantity: 1 }];
    }
    updateCart(updated);
  };

  const removeitem = async (id) => {
    const updated = cartdata.filter((i) => i.id !== id);
    updateCart(updated);
  };

  const clearcart = async () => {
    updateCart([]);
  };

  const increaseQuantity = async (id) => {
    const updated = cartdata.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQuantity = async (id) => {
    const updated = cartdata.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updated);
  };

  const placeOrder = async (address) => {
    if (!user || cartdata.length === 0) return;

    try {
      await axios.post(`${BASE_URL}/shipping`, address);

      const { data: allProducts } = await axios.get(`${BASE_URL}/products`);

      const newStockList = allProducts.map((product) => {
        const cartItem = cartdata.find((c) => c.id === product.id);
        if (cartItem) {
          return {
            ...product,
            stock: product.stock - cartItem.quantity,
          };
        }
        return product;
      });

      for (const item of newStockList) {
        await axios.patch(`${BASE_URL}/products/${item.id}`, {
          stock: item.stock,
        });
      }

      const newOrder = {
        userId: user.id,
        products: cartdata,
        orderedAt: new Date().toISOString(),
        status: 'Pending',
        address:address
      };

      const res = await axios.post(`${BASE_URL}/orders`, newOrder);
      setorders((prev) => [...prev, res.data]);

      clearcart();
      alert('🎉 Order placed successfully!');
    } catch (err) {
      console.error('❌ Order failed:', err.message);
    }
  };

  return (
    <Crtcontext.Provider
      value={{
        cartdata,
        addtocart,
        removeitem,
        clearcart,
        increaseQuantity,
        decreaseQuantity,
        orders,
        placeOrder,
      }}
    >
      {children}
    </Crtcontext.Provider>
  );
}

export default CartContext;
