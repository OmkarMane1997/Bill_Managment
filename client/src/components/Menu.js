import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Menu() {
  const navigation = useNavigate();
  const userRole = {
    Role: localStorage.getItem("role"),
  };

  const Logout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/logout");
      // console.log(result);
      localStorage.clear();
      navigation("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-end">
          <NavLink className="navbar-brand" to={"/DashBoard"}>
            Bill System
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userRole.Role === "0" || userRole.Role === "1" ? (
                <li className="nav-item">
                  <NavLink className="nav-link active" to={"/AddProduct"}>
                    AddProduct
                  </NavLink>
                </li>
              ) : null}

              {userRole.Role === "0" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/AddUser"}>
                    Add User
                  </NavLink>
                </li>
              ) : null}

              {userRole.Role === "0" || userRole.Role === "1" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/Profile"}>
                    Profile
                  </NavLink>
                </li>
              ) : null}

              {userRole.Role === "0" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/AddBill"}>
                    Bill
                  </NavLink>
                </li>
              ) : null}

              <li className="nav-item">
                {userRole.Role === "0" || userRole.Role === "1" ? (
                  <NavLink className="nav-link" onClick={Logout}>
                    Logout
                  </NavLink>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
//
