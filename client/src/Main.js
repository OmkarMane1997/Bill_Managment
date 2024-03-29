import React from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Error from "./components/Error";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import RequireAuth from "./utlit/RequireAuth";
import AddUser from "./components/users/AddUser";
import UserList from "./components/users/UserList";
import UpdateUser from "./components/users/UpdateUser";
import AddProduct from "./components/Product/AddProduct";
import ProductList from "./components/Product/ProductList";
import UpdateProduct from "./components/Product/UpdateProduct";
import AddBill from "./components/BillGenrate/AddBill";
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
            path={"/ProductList"}
            element={
              <RequireAuth>
                <ProductList />
              </RequireAuth>
            }
          />
            <Route
            path={"/UpdateProduct/:id"}
            element={
              <RequireAuth>
                <UpdateProduct />
              </RequireAuth>
            }
          />
          <Route
            path={"/AddUser"}
            element={
              <RequireAuth>
                <AddUser />
              </RequireAuth>
            }
          />
          <Route
            path={"/UserList"}
            element={
              <RequireAuth>
                <UserList />
              </RequireAuth>
            }
          />
          <Route
            path={"/UpdateUser/:id"}
            element={
              <RequireAuth>
                <UpdateUser />
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
           <Route
            path={"/AddBill"}
            element={
              <RequireAuth>
                <AddBill />
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
