const Newsletter = () => {
  return (
    <div className="row align-items-center bg-dark text-white mx-0 mt-5 py-5">
      <div className="col-lg-6 text-center mx-auto">
        <h2>Join Our Newsletter</h2>
        <p>Sign up for deals, new products and promotions</p>
        <form className="d-flex justify-content-center">
          <input
            type="email"
            className="form-control me-2"
            placeholder="Email address"
          />
          <button className="btn btn-outline-light px-4 py-2" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
