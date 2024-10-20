import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark py-5">
      <div className="container">
        <div className="row mt-3">
          <div className="col-3 text-white">
            <div>
              <h4 className="mb-4 fs-4">My Store</h4>
              <p>
                16501 Collins Ave, Sunny Isles Beach, FL 33160, United States
              </p>
            </div>
          </div>
          <div className="col-3 text-white">
            <div>
              <h4 className="mb-4 fs-4">Shopping & Categories</h4>
              <ul className="list-unstyled">
                <li className="text-white-50 mb-2">Men's Clothing</li>
                <li className="text-white-50 mb-2">Woman's Clothing</li>
                <li className="text-white-50 mb-2">Electronic's</li>
              </ul>
            </div>
          </div>
          <div className="col-3 text-white">
            <div>
              <h4 className="mb-4 fs-4">Useful Links</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <NavLink to="home" className="text-decoration-none text-white-50">
                    Home
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink to="products" className="text-decoration-none text-white-50">
                    Products
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink to="carts" className="text-decoration-none text-white-50">
                    Carts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3 text-white">
            <div>
              <h4 className="mb-4 fs-4">Stay Connected</h4>
              <ul className="list-unstyled d-flex align-items-center gap-4">
                <li>
                  <NavLink
                    href="https://github.com/alaashalaby"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github text-white fs-4"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink href="https://wa.me/+201128589590" target="_blank">
                    <i className="fa-brands fa-whatsapp text-white fs-4"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href="https://www.linkedin.com/in/alaa-shalaby-262b37218/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin text-white fs-4"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink href="http://facebook.com" target="_blank">
                    <i className="fa-brands fa-facebook text-white fs-4"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
