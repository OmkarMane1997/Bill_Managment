import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";

function Login() {
  const URL = `http://localhost:4000/api/v1`;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const readData = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert();
    if (validator.isEmail(loginData.email) === false) {
      return toast.error("Enter valid Email");
    }
    if (validator.isStrongPassword(loginData.password) === false) {
      return toast.error(
        "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20"
      );
    }

    try {
      //  console.log("Data",loginData);

      let result = await axios.post(`${URL}/login`, loginData);
      // console.log(result.data);
      localStorage.setItem("loginToken", result.data.accessToken);
      localStorage.setItem("role", result.data.userRole);
      // console.log(result.data.accessToken);
      // console.log(result.data.userRole);
      toast.success(result.data.msg);
      navigate("/DashBoard");
    } catch (err) {
      // console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <section className="">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone_image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form autoComplete="" onSubmit={submitHandler}>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={readData}
                  className="form-control "
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={readData}
                  className="form-control "
                />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <button type="submit" className="btn btn-primary  btn-block">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
