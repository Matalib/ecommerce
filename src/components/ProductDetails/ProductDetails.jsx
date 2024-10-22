import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./relatedProducts.css";
import ProductCard from "../Products/ProductCard";
export default function ProductDetails() {
  let { id, category } = useParams();
  const [details, setDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { cartItemsCount, setCartItemsCount, addProductToCart } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setDetails(data.data);
      })
      .catch(() => {});
  }
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        let relatedProducts = response.data.data.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(relatedProducts);
      });
  }
  async function addItemToCart(id) {
    setCurrentProductId(id);
    setIsLoading(true);
    let response = await addProductToCart(id);
    if (response?.data?.status === "success") {
      setCartItemsCount(cartItemsCount + 1);
      toast.success(response.data.message, {
        position: "top-right",
      });
      setIsLoading(false);
    } else {
      toast.error(response.data.message, {
        position: "top-right",
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails(id);
    getProducts();
  }, [id, category]);
  return (
    <div className="container p-5 mt-5">
      {details && (
        <div className="shadow mt-2 rounded">
          <div className="row align-items-center py-2">
            <div className="col-sm-12 col-lg-4">
              <img src={details.imageCover} alt={details.title} width="400" />
            </div>
            <div className="col-sm-12 col-lg-8">
              <h2 className="fw-bold text-success mb-3 fs-1">
                {details.title.substring(0, 20)}
              </h2>
              <p className="fs-4 text-dark fw-medium mb-3">
                {details.description}
              </p>
              <h3>
                Quantity Available :{" "}
                <span className="text-success">{details.quantity}</span>
              </h3>
              <p className="fw-bold fs-3">Price: {details.price} EGP</p>
              <button
                onClick={() => addItemToCart(details.id)}
                className="btn bg-success text-white fs-5 mt-1"
              >
                {isLoading && currentProductId === details.id ? (
                  <i className="fa fa-spinner fa-spin fa-xl"></i>
                ) : (
                  "Add to cart"
                )}
                <i className="fas fa-cart-plus ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      <RelatedProducts
        relatedProducts={relatedProducts}
        isLoading={isLoading}
        currentProductId={currentProductId}
        addItemToCart={addItemToCart}
      />
    </div>
  );
}

function RelatedProducts({
  relatedProducts,
  isLoading,
  currentProductId,
  addItemToCart,
}) {
  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-12">
          <h2 className="related_header text-center fs-1 position-relative">
            Related Products
          </h2>
        </div>
      </div>
      <div className="row mt-5 py-5">
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            765: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          loop={false}
          className="product-swiper-container"
        >
          {relatedProducts.map((productInfo) => (
            <SwiperSlide key={productInfo.id}>
              <ProductCard
                productInfo={productInfo}
                key={productInfo.id}
                addItemToCart={addItemToCart}
                isLoading={isLoading}
                currentProductId={currentProductId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
