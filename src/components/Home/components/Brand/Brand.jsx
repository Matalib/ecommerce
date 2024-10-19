import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";

const Brand = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="my-5 px-3">
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        loop={false}
        pagination={false}
        autoplay={false}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <img src={brand.image} alt={brand.name} className="w-100" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brand;
