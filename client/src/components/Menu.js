import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {  userRole } from "../reducers/authReducers";

function Menu() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let data =   useSelector((state)=>{
    return state.users.role;
})
console.log(data)
  const Logout = async () => {
    try {
      let result = await axios.get("http://localhost:4000/api/v1/logout");
      console.log(result);
      localStorage.clear();
      dispatch(userRole(' '));
    
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to={"/"}>
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
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {data === "0" || data === "1" ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to={"/DashBoard/AddProduct"}
                  >
                    AddProduct
                  </NavLink>
                </li>
              ) : null}

              {data === "0" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/DashBoard/AddUser"}>
                    Add User
                  </NavLink>
                </li>
              ) : null}

              <li className="nav-item">
                <NavLink className="nav-link" to={"From"}>
                  Form
                </NavLink>
              </li>

              {data === "0" ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/DashBoard/Profile"}>
                    Profile
                  </NavLink>
                </li>
              ) : null}
              {data === "0" ? (
                <li>
                  <NavLink className="nav-link" to={"Service"}>
                    Service
                  </NavLink>
                </li>
              ) : null}
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {data === "0" || data === "1" ? (
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    onClick={Logout}
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={'/'}
                >
                  Login
                </NavLink>
                )}
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
