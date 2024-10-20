import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContextProvider";

const Cart = () => {
  const {
    getUserCart,
    deleteCartItem,
    cartItemsCount,
    setCartItemsCount,
    updateCartProduct,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  async function getCartItems() {
    const response = await getUserCart();
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
    }
  }
  async function deleteItem(productId) {
    const response = await deleteCartItem(productId);
    if (response?.data?.status === "success") {
      setCartItemsCount(cartItemsCount - 1);
      setCartDetails(response.data.data);
    }
  }
  async function updateProduct(id, count) {
    if (count < 1) return;
    setUpdatingProductId(id);
    const response = await updateCartProduct(id, count);
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between bg-success-subtle p-3 shadow-sm rounded-1">
        <h4 className="text-dark">
          Your Cart
          <span className="ms-3">{cartDetails?.products?.length} items</span>
        </h4>
        <p className="text-dark mb-0 fs-3 ">
          Total:{" "}
          <span className="fw-bold ms-1">
            {cartDetails?.totalCartPrice} EGP
          </span>
        </p>
      </div>
      <div className="table-responsive mt-3 bg-light shadow-sm">
        <table className="table align-middle text-center mb-0">
          <thead>
            <tr>
              <th className="fs-5 text-success">Product Image</th>
              <th className="fs-5 text-success">Product Info</th>
              <th className="fs-5 text-success">Quantity</th>
              <th className="fs-5 text-success">Price</th>
              <th className="fs-5 text-success">Total</th>
              <th className="fs-5 text-success">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails &&
              cartDetails.products.map((product) => (
                <>
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product?.product?.imageCover}
                        alt={product?.product?.title}
                        width="150"
                        height="150"
                      />
                    </td>
                    <td>
                      <div>
                        <h5 className="text-success fs-4 mb-2">
                          {product?.product?.title.substring(0, 15)}
                        </h5>
                        <p className="text-dark fw-bold">
                          {product?.product?.brand?.name}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                          className="btn btn-outline-dark"
                          onClick={() =>
                            updateProduct(product.product.id, product.count - 1)
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="mx-2">{product?.count}</span>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() =>
                            updateProduct(product.product.id, product.count + 1)
                          }
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td>{product.price} EGP</td>
                    <td>{product.price * product.count} EGP</td>
                    <td>
                      <button
                        className="btn text-danger"
                        onClick={() => deleteItem(product.product.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
