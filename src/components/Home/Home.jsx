import HeroBanner from "./components/Hero/Hero";
import Categories from "./components/Categories/Categories";
import ProductList from "./components/ProductList/ProductList";
import Counter from "./components/Counter/Counter";
import Newsletter from "./components/Newsletter/Newsletter";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <ProductList category="new" />
      <Categories />
      <ProductList category="best-seller" />
      <Counter />
      <Newsletter />
    </>
  );
};

export default Home;
