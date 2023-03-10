import React from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Error from "./components/Error";
import Menu from "./components/Menu";
import AddProduct from "./components/AddProduct";
import Profile from "./components/Profile";
import RequireAuth from "./utlit/RequireAuth";
function Main() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={5000} position={"top-right"} />
        <Menu />
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route
            path={"/DashBoard"}
            element={
              <RequireAuth>
                <DashBoard />
              </RequireAuth>
            }
          />
          <Route
            path={"/AddProduct"}
            element={
              <RequireAuth>
                <AddProduct />
              </RequireAuth>
            }
          />
          <Route
            path={"/Profile"}
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path={"/Error"} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
