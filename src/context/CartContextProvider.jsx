import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export let CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartId, setCartId] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function getUserCart() {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );
      setCartId(res.data.data._id);
      setCartItemsCount(res.data.numOfCartItems);
      return res;
    } catch (err) {
      return err;
    }
  }
  async function deleteCartItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async function updateCartProduct(productId, newCount) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        {
          headers,
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  }
  async function addProductToCart(productId) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  }
function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  useEffect(() => {
    getUserCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        getUserCart,
        cartId,
        cartItemsCount,
        setCartItemsCount,
        deleteCartItem,
        updateCartProduct,
        addProductToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
