import { useState, useEffect } from "react";
import HeroBanner from "./components/Hero/Hero";
import ProductList from "./components/ProductList/ProductList";
import Counter from "./components/Counter/Counter";
import Newsletter from "./components/Newsletter/Newsletter";
import Loader from "../Loader/Loader";
import Chatbot from "../Chatbot/Chatbot";
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeroBanner />
      <ProductList category="new" />
      <ProductList category="best-seller" />
      <Counter />
      <Newsletter />

      <div
        className="chatbot-button rounded-circle d-flex p-4 align-items-center justify-content-center shadow-sm mx-3"
        onClick={toggleChatbot}
      >
        <i class="fa-solid fa-message text-white"></i>
      </div>

      {isChatbotVisible && <Chatbot />}
    </>
  );
};

export default Home;
