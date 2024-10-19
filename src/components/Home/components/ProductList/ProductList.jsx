import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./ProductList.css";
import { Pagination } from "swiper/modules";
import Product from "../Product/Product";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  return (
    <div className="product-list container">
      <h2 className="fw-bold">
        {category === "new" ? "New Arrivals" : "Best Sellers"}
      </h2>

      {category === "new" ? (
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
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          loop={false}
          className="product-swiper-container"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Product product={product} category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="row">
          {products.slice(10, 18).map((product) => (
            <div key={product._id} className="col-lg-3 best">
              <Product product={product} category={category} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
