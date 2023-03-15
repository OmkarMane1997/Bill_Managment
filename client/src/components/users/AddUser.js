import React, { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import axios from "axios";
import { API_MainURL } from "../../APi/Api";
import { loginToken } from "../../APi/Api";
import { NavLink } from "react-router-dom";
function AddUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const readData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // alert("");

    try {
      if (validator.isAlpha(user.name, "en-US", { ignore: " " }) === false) {
        return toast.error("Enter Only Valid Character");
      }
      // Validation of Email
      if (validator.isEmail(user.email) === false) {
        return toast.error("Enter Only Valid Email");
      }

      if (validator.isMobilePhone(user.phone) === false) {
        return toast.error("Enter Only Valid Mobile");
      }
      // PassWord Validation and Return Password Score.
      if (
        validator.isStrongPassword(user.password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }) === false
      ) {
        return toast.error(
          "minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
        );
      }

      if (validator.isLength(user.role, { min: 1 }) === false) {
        return toast.error("Enter Role of User");
      }

      let ApiResult = await axios.post(`${API_MainURL}/UserRegister`, user, {
        headers: { Authorization: loginToken.token },
      });
      toast.success(ApiResult.data.msg);
      //reset from
      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div>
      <div className="container my-5">
        <div className="text-center">
          <h3>Add User</h3>
        </div>
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmitHandler} autoComplete="off">
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form1Example13">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      onChange={readData}
                      className="form-control "
                      value={user.name}
                    />
                  </div>
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
                      value={user.email}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form1Example13">
                      Phone
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone"
                      onChange={readData}
                      className="form-control "
                      value={user.phone}
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
                      value={user.password}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form1Example13">
                      User Role
                    </label>
                    <select
                      className="form-select"
                      onChange={readData}
                      id="role"
                      name="role"
                      value={user.role}
                    >
                      <option selected value="">
                        Open this select User Role
                      </option>
                      <option value="1">User</option>
                      <option value="0">Admin</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success">Save</button>
                    <NavLink to={"/UserList"} className="btn btn-warning">
                      Update
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
