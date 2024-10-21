import React, { useContext } from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContextProvider";
export default function Products() {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { addProductToCart } = useContext(CartContext);

  async function addProductItem(id) {
    let response = await addProductToCart(id);
    console.log("response", response);
  }

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        console.log(data.data);
        setLoading(false);
        setProduct(data.data);
      })

      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-5 pt-5">
      {!isLoading ? (
        <div className="d-flex flex-wrap">
          {product.map((productInfo) => {
            return (
              <>
                <div className="w-25 px-4 styleProduct">
                  <Link
                    to={`/productDetails/${productInfo.id}`}
                    className="card my-5 border-0 shadow-sm text-decoration-none"
                  >
                    <img
                      src={productInfo.imageCover}
                      className="card-img-top w-100"
                      alt={productInfo.title}
                    />
                    <span className="text-info d-block text-decoration-none px-2">
                      {" "}
                      {productInfo.category.name}{" "}
                    </span>
                    <span className=" d-block text-decoration-none px-2">
                      {" "}
                      {productInfo.title.split(" ").slice(0, 3).join(" ")}{" "}
                    </span>

                    <div className="d-flex justify-content-between my-2 card-body d-flex flex-column">
                      <span>{productInfo.price} EGP</span>
                      <span>
                        {productInfo.ratingsQuantity}
                        <i className="fas fa-star text-warning text-decoration-none"></i>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        addProductItem(productInfo.id);
                      }}
                      className="btn bg-info text-white w-100 text-decoration-none "
                    >
                      Add To Cart
                    </button>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
