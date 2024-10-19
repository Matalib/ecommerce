import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import loginImg from "../../assets/imgs/login.svg";
import { userContext } from '../../context/userContext';
import { useContext } from 'react';


function Login() {
  let [error, setError] = useState("");
  let navigate = useNavigate();
  let {setLogin} = useContext(userContext)
  async function handleRegister(formData) {
    // console.log("register ", formData);
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        formData
      );

      // console.log("fullResponse", response.data);
      if (response.data.message == "success") {
        localStorage.setItem('userToken', response.data.token)
          setLogin(response.data.token)
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data.message);
        setError(error.response.data.message);
      }
    }
  }
  let validationSchema = Yup.object({
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
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 d-flex align-content-center">
            <img src={loginImg} className="w-100" alt="" />
          </div>
          <div className="col-md-6">
            <div className="row justify-content-center">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="mb-3">
                  <h2 className="text-capitalize">Log In Your Account</h2>
                </div>
                <h2 className="fs-6 fw-normal text-secondary mb-4">
                  Enter your details to login
                </h2>
                <form onSubmit={formik.handleSubmit} action="#!">
                  <div className="row gy-2 overflow-hidden">
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
                    {error ? (
                      <div className="text-danger">
                        {error.toUpperCase()}, Write a valid email and password.
                      </div>
                    ) : null}
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button
                          className="btn btn-secondary btn-lg"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          className="link-primary text-decoration-none"
                        >
                          Sign Up
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

export default Login;
