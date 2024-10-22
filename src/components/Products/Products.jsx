import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { CartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";
import GetAllProducts from "./getAllProducts";
import { Link } from "react-router-dom";
export default function Products() {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { addProductToCart, cartItemsCount, setCartItemsCount } =
    useContext(CartContext);
  let products = GetAllProducts();
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const displayedProducts = products.slice(firstIndex, lastIndex);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
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
        position: "top-right",
      });
      setLoading(false);
    } else {
      toast.error(response.data.message, {
        position: "top-right",
      });
      setLoading(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-5 py-5">
      {isPageLoading ? (
        <Loader />
      ) : (
        displayedProducts.length > 0 && (
          <>
            <div className="product_wrapper pt-5">
              {displayedProducts.map((productInfo) => (
                <div className="product_card shadow-md" key={productInfo.id}>
                  <Link to={`/productDetails/${productInfo.id}`}>
                    <img
                      src={productInfo.imageCover}
                      alt={productInfo.title}
                      loading="lazy"
                    />
                  </Link>
                  <div className="text-center mt-4">
                    <p className="text-success mb-0 fw-bolder">
                      {productInfo.category.name}
                    </p>
                    <h4 className="mt-1">
                      {productInfo.title.substring(0, 20)}
                    </h4>
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
                      {isLoading && currentProductId === productInfo.id ? (
                        <i className="fa fa-spinner fa-spin fa-xl"></i>
                      ) : (
                        "Add to cart"
                      )}
                      <i className="fas fa-cart-plus ms-2"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <button
                className="btn btn-outline-success fs-4 me-2"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`btn text-dark ${currentPage === index + 1 ? "btn-success text-white" : "btn-outline-success text-success"} fs-4 me-2`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="btn btn-outline-success fs-4"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}
