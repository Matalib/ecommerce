import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ product, category }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="card my-5 border-0 shadow-sm no-underline"
    >
      <div>
        {category === "new" && (
          <div className="position-absolute bg-success text-white py-2 px-3 label rounded-3">
            New
          </div>
        )}
        {category === "best-seller" && (
          <div className="position-absolute bg-danger text-white py-2 px-3 label rounded-3">
            Best
          </div>
        )}
        <img
          src={product.imageCover}
          alt={product.title}
          className="card-img-top product-image"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title product-text">{product.title}</h5>
        <p className="card-text product-text">{product.description}</p>
        <p className="mt-auto product-price">{product.price} EGP</p>
      </div>
    </Link>
  );
};

export default Product;
