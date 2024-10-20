import { useContext, useState } from 'react'
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import registerImg from "../../assets/imgs/registerImg.png";
import { userContext } from '../../context/userContext';

function Register() {
  let [error, setError] = useState("");
  let {setLogin} = useContext(userContext)
  let navigate = useNavigate();
  
  async function handleRegister(formData) {
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        formData
      );
      if (response.data.message == "success") {
        localStorage.setItem('userToken', response.data.token)
        setLogin(response.data.token)
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min("3", "Name should be at least 3 letters.")
      .max(15, "Too long name"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Your password must be at least 8 characters long and include: \n" +
          "- An uppercase letter (A-Z)\n" +
          "- A lowercase letter (a-z)\n" +
          "- A number (0-9)\n" +
          "- A special character (@, $, !, %, *, ?, &)."
      ),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[1250][0-9]{8}$/, "Enter a valid phone number."),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="container pt-5">
        <div className="row align-items-center">
          <div className="col-md-6 mt-5 d-flex">
            <img src={registerImg} className="w-100" alt="" />
          </div>
          <div className="col-md-6">
            <div className="row justify-content-center">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="mb-3">
                  <h2 className="text-capitalize text-success mb-2">Create Your Account</h2>
                </div>
                <h2 className="fs-6 fw-normal text-secondary mb-4">
                  sign up for free to access to in any of our products.
                </h2>
                <form onSubmit={formik.handleSubmit} action="#!">
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          name="name"
                          value={formik.values.name}
                          id="name"
                          placeholder="First Name"
                          required
                        />
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-danger mt-2">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="email"
                          className={`form-control ${
                            formik.touched.email && formik.errors.email
                              ? "is-invalid"
                              : ""
                          }`}
                          name="email"
                          value={formik.values.email}
                          id="email"
                          placeholder="name@example.com"
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        {formik.touched.email && formik.errors.email ? (
                          <div className="text-danger mt-2">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="password"
                          className={`form-control ${
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          name="password"
                          value={formik.values.password}
                          id="password"
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        {formik.touched.password && formik.errors.password ? (
                          <div className="text-danger mt-2">
                            {formik.errors.password}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="password"
                          className={`form-control ${
                            formik.touched.rePassword &&
                            formik.errors.rePassword
                              ? "is-invalid"
                              : ""
                          }`}
                          name="rePassword"
                          value={formik.values.rePassword}
                          id="re-password"
                          placeholder="re-Password"
                          required
                        />
                        <label htmlFor="re-password" className="form-label">
                          Confirm Password
                        </label>
                        {formik.touched.rePassword &&
                        formik.errors.rePassword ? (
                          <div className="text-danger mt-2">
                            {formik.errors.rePassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className={`form-control ${
                            formik.touched.phone && formik.errors.phone
                              ? "is-invalid"
                              : ""
                          }`}
                          name="phone"
                          value={formik.values.phone}
                          id="phone"
                          placeholder="Phone Number"
                          required
                        />
                        <label htmlFor="phone" className="form-label">
                          Phone Number
                        </label>
                        {formik.touched.phone && formik.errors.phone ? (
                          <div className="text-danger mt-2">
                            {formik.errors.phone}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="text-danger">{error}</div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button
                          className="btn bg-dark btn-lg text-white"
                          type="submit"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="link-primary text-decoration-none"
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
