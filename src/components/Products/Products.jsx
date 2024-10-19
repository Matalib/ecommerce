import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
    <div className="container">
      {!isLoading ? (
        <div className="d-flex flex-wrap">
          {product.map((productInfo) => {
            return (
              <>
                <div className="w-25 px-4">
                  <img
                    src={productInfo.imageCover}
                    className="w-100"
                    alt={productInfo.title}
                  />
                  <span className="text-info d-block">
                    {" "}
                    {productInfo.category.name}{" "}
                  </span>
                  <span className=" d-block">
                    {" "}
                    {productInfo.title.split(" ").slice(0, 3).join(" ")}{" "}
                  </span>

                  <div className="d-flex justify-content-between my-2">
                    <span>{productInfo.price} EGP</span>
                    <span>
                      {productInfo.ratingsQuantity}
                      <i className="fas fa-star text-warning"></i>
                    </span>
                  </div>
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
