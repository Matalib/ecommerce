import { Link } from "react-router-dom";
const ProductCard = ({
  productInfo,
  addItemToCart,
  isLoading,
  currentProductId,
}) => {
  return (
    <div className="product_card shadow-md" key={productInfo.id}>
      <Link
        to={`/productDetails/${productInfo.id}/${productInfo.category.name}`}
      >
        <img
          src={productInfo.imageCover}
          alt={productInfo.title}
          loading="lazy"
        />
      </Link>
      <div className="text-center mt-4">
        <p className="text-success mb-0 fw-bolder">
          {productInfo.category.name}
        </p>
        <h4 className="mt-1">{productInfo.title.substring(0, 20)}</h4>
        <div className="d-flex justify-content-between align-items-center p-3">
          <span style={{ fontWeight: "bold" }}>{productInfo.price} EGP</span>
          <span>
            {productInfo.ratingsAverage}{" "}
            <i className="fas fa-star text-warning"></i>
          </span>
        </div>
        <button
          onClick={() => addItemToCart(productInfo.id)}
          className="btn bg-success text-white fs-5 mt-1"
        >
          {isLoading && currentProductId === productInfo.id ? (
            <i className="fa fa-spinner fa-spin fa-xl"></i>
          ) : (
            "Add to cart"
          )}
          <i className="fas fa-cart-plus ms-2"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
