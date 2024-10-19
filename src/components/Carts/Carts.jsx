const Cart = () => {
  return (
    <div className=" container mt-5">
      <div className="cart_header d-flex justify-content-between align-items-center px-2 border-bottom  border-dark pb-3">
        <h4 className="text-dark">
          Your Cart <span className="ms-3">0 items</span>
        </h4>
        <p className="text-dark fw-medium">
          Total: <span className="fw-bold ms-1">$0.00</span>
        </p>
      </div>
      <table className="table table-striped align-middle text-center mb-0">
        <thead className="py-3">
          <tr>
            <th>Product Image</th>
            <th>Product Info</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="https://ecommerce.routemisr.com/Route-Academy-products/1680401672268-cover.jpeg"
                alt="product.title"
                width="100"
                height="100"
              />
            </td>
            <td>
              <div>
                <h5 className="fs-4 mb-2">Product Name</h5>
                <p>Product Brand</p>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <button className="btn btn-outline-dark">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="mx-2">2</span>
                <button className="btn btn-outline-dark">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </td>
            <td>100$</td>
            <td>200$</td>
            <td>
              <button className="btn btn-outline-danger">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
