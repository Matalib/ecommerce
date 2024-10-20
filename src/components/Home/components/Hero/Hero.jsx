import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Hero.css";
import slider1 from "../../../../assets/imgs/slider_1.png";
import slider2 from "../../../../assets/imgs/slider_2.png";
import slider3 from "../../../../assets/imgs/slider_3.png";
import Brand from "../Brand/Brand";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className="hero-banner py-3">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
        >
          <SwiperSlide>
            <div className="row align-items-center vh-100 pt-5 mt-4">
              <div className="col-lg-7 text-center">
                <img src={slider1} alt="Fashion Slide 1" />
              </div>
              <div className="col-lg-5 slide-text">
                <div className="p-2">
                  <h1 className="fw-bold">
                    Discover the Latest Fashion Trends
                  </h1>
                  <p>Shop our newest collection and stay ahead in style</p>
                  <Link to="/products" className="btn btn-dark px-4 py-2">
                    Explore Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="row align-items-center vh-100 pt-5 mt-5">
              <div className="col-lg-7 text-center">
                <img src={slider2} alt="Fashion Slide 2" />
              </div>
              <div className="col-lg-5 slide-text">
                <div className="p-2">
                  <h1 className="fw-bold">Elegant Attire for Every Occasion</h1>
                  <p>Find the perfect outfit for work or play</p>
                  <Link to="/products" className="btn btn-dark px-4 py-2">
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="row align-items-center vh-100 pt-5 mt-5">
              <div className="col-lg-7 text-center">
                <img src={slider3} alt="Fashion Slide 3" />
              </div>
              <div className="col-lg-5 slide-text">
                <div className="p-2">
                  <h1 className="fw-bold">
                    Find the perfect outfit for work or play
                  </h1>
                  <p>Refresh your wardrobe with our fall collection</p>
                  <Link to="/products" className="btn btn-dark px-4 py-2">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Brand Component */}
      <Brand />
    </div>
  );
};

export default Hero;
