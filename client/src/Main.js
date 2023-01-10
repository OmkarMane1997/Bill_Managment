import React, { useEffect } from "react";
import Login from "./components/Login";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import DashBoard from "./components/DashBoard";
import Error from "./components/Error";
import Menu from "./components/Menu";
import AddProduct from "./components/AddProduct";
import Profile from "./components/Profile";

function Main() {
  const loginToken = {
    token: localStorage.getItem("loginToken"),
  };

  const getVerified = async () => {
    try {
      let result = await axios.post(
        `http://localhost:4000/api/v1/refreshToken`,
        loginToken,
        {
          headers: { Authorization: loginToken.token },
        }
      );
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    getVerified();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={5000} position={"top-right"} />
        <Menu />
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/DashBoard"} element={<DashBoard />} />
          <Route path={"/AddProduct"} element={<AddProduct />} />
          <Route path={"/Profile"} element={<Profile />} />
          <Route path={"/Error"} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
