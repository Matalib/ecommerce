import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { CartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";
export default function Products() {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState(0);
  const { addProductToCart, cartItemsCount, setCartItemsCount } = useContext(CartContext);
  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProduct(data.data);
        setIsPageLoading(false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setIsPageLoading(false);
      });
  }
  async function addItemToCart(id) {
    setCurrentProductId(id);
    setLoading(true);
    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItemsCount(cartItemsCount + 1);
      toast.success(response.data.message, {
        position: "top-right"
      });
      setLoading(false);
    } else {
      toast.error(response.data.message, {
        position: "top-right"
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-5 py-5">
      {isPageLoading ? <Loader /> :
        <div className="product_wrapper pt-5">
          {product.map((productInfo) => (
            <>
              <div className="product_card shadow-md" key={productInfo.id}>
                <img
                  src={productInfo.imageCover}
                  alt={productInfo.title}
                  loading="lazy"
                />
                <div className="text-center mt-4">
                  <p className="text-success mb-0 fw-bolder">
                    {productInfo.category.name}
                  </p>
                  <h4 className="mt-1">{productInfo.title.substring(0, 20)}</h4>
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <span style={{ fontWeight: "bold" }}>
                      {productInfo.price} EGP
                    </span>
                    <span>
                      {productInfo.ratingsAverage}{" "}
                      <i className="fas fa-star text-warning"></i>
                    </span>
                  </div>
                  <button
                    onClick={() => addItemToCart(productInfo.id)}
                    className="btn bg-success text-white fs-5 mt-1"
                  >
                    {isLoading && currentProductId === productInfo.id ? <i className="fa fa-spinner fa-spin fa-xl"></i> : "Add to cart"} <i className="fas fa-cart-plus ms-2"></i>
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      }
    </div>
  );
}