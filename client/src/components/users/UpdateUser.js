import React, { useEffect, useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import axios from "axios";
import { API_MainURL } from "../../APi/Api";
import { loginToken } from "../../APi/Api";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function UpdateUser() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const params = useParams(); // to read router params

  const navigate = useNavigate(); // to navigate

  const readData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const getSingleUserData = async () => {
    try {
      let ApiResult = await axios.get(`${API_MainURL}/ReadUser/${params.id}`, {
        headers: { Authorization: loginToken.token },
      });
      setUser(ApiResult.data.exitsID[0]);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    alert("");

    try {
      if (validator.isAlpha(user.name, "en-US", { ignore: " " }) === false) {
        return toast.error("Enter Only Valid Character");
      }
      // Validation of Email
      if (validator.isEmail(user.email) === false) {
        return toast.error("Enter Only Valid Email");
      }

      if (validator.isMobilePhone(String(user.phone)) === false) {
        return toast.error("Enter Only Valid Mobile");
      }
      // PassWord Validation and Return Password Score.

      if (validator.isLength(user.role, { min: 1 }) === false) {
        return toast.error("Enter Role of User");
      }
      console.log("user", user);

      let ApiResult = await axios.patch(
        `${API_MainURL}/UpdateUser/${params.id}`,
        user,
        {
          headers: { Authorization: loginToken.token },
        }
      );
      console.log(ApiResult.data.msg);

      toast.success(ApiResult.data.msg);
      navigate("/UserList");
      //reset from
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
  };
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>User List Table is Loading Please Wait...</h3>
      </div>
    );
  }
  return (
    <div>
      <div className="container my-5">
        <div className="text-center">
          <h3>Update User</h3>
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
                      disabled
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
                      Back
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

export default UpdateUser;
