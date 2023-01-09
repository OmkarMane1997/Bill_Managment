import React, { useEffect } from "react";
import Login from "./components/Login";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {  userRole } from "./reducers/authReducers";
import DashBoard from "./components/DashBoard";
import Error from "./components/Error";
import Menu from "./components/Menu";

function Main() {  
  const dispatch = useDispatch();
  const getVerified = async () => {
    try {
      const loginToken = {
        token: localStorage.getItem("loginToken"),
      };
    
      let result = await axios.post(
        `http://localhost:4000/api/v1/refreshToken`,
        loginToken,
        {
          headers: { Authorization: loginToken.token },
        }
      );
      // console.log(result.data.userRole);
      // setUserRole(result.data.userRole);
      dispatch(userRole(result.data.userRole));
    } catch (err) {
      console.log(err.response.data.msg); 
      toast.error(err.response.data.msg);
      // navigation('/')
    }
  };

  useEffect(() => {
    getVerified();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={5000} position={"top-right"} />
        <Menu userRole={"0"} />
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/DashBoard"} element={<DashBoard />} />
          <Route path={"/Error"} element={<Error />} />
          {/* <Route path={"/Main"} element={<Main />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
