import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const navigation = useNavigate();
  const loginToken = {
    token: localStorage.getItem("loginToken"),
  };
  // console.log(loginToken);

  const getProfile = async () => {
    try {
      let info = await axios.get(`http://localhost:4000/api/v1/profile`, {
        headers: { Authorization: loginToken.token },
      });
      // console.log(info.data.result);
      setProfileData(info.data.result);
    } catch (err) {
      // console.log(err.response.data.msg);
      navigation("/");

      if (err.response.data.msg === "Token Required") {
        navigation("/");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profileData[0]) {
    return (
      <div className="container my-5 text-center">
        <h1>Loading Please Wait</h1>
      </div>
    );
  }
  // const {name,email,phone,role}= profileData[0];

  return (
    <div className="container my-5 ">
      <div className="row">
        <div className="offset-md-4 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <h1>Profile</h1>
                <hr className="mt-0" />
              </div>
              <div className="d-flex justify-content-between">
                <b>Name:-</b>
                <p>{profileData[0].name}</p>
              </div>
              <div className="d-flex justify-content-between">
                <b>Email:-</b>
                <p>{profileData[0].email}</p>
              </div>
              <div className="d-flex justify-content-between">
                <b>Phone:-</b>
                <p>{profileData[0].phone}</p>
              </div>
              <div className="d-flex justify-content-between">
                <b>Role:-</b>
                <p>{profileData[0].role === "1" ? "User" : "Admin"}</p>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-success">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
