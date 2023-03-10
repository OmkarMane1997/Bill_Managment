import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_MainURL } from "../APi/Api";
import Login from "../components/Login";
function RequireAuth({ children }) {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const CheckUserLoin = async () => {
    let token = localStorage.getItem("loginToken");
    console.log("first");
    let accessToken = {
      token,
    };

    try {
      let result = await axios.post(`${API_MainURL}/refreshToken`, accessToken);
      console.log("first", result.data);
      setLogin(true);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
      localStorage.clear();
      setLogin(false);
      setLoading(false);

      navigate("/");
    }
  };
  useEffect(() => {
    CheckUserLoin();
  }, []);
  if (loading) {
    return <div className="container">Loading...</div>;
  }
  return <div>{login ? children : <Login />}</div>;
}

export default RequireAuth;
