import axios from "axios";
import { useEffect, useState } from "react";
function GetAllProducts() {
  const [products, setProducts] = useState([]);
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        setProducts(response.data.data);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);

  return products;
}
export default GetAllProducts;
