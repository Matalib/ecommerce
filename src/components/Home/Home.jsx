import { useState, useEffect } from "react";
import HeroBanner from "./components/Hero/Hero";
import ProductList from "./components/ProductList/ProductList";
import Counter from "./components/Counter/Counter";
import Newsletter from "./components/Newsletter/Newsletter";
import Loader from "../Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

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
    </>
  );
};

export default Home;
