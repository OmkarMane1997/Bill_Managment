import React, { useEffect, useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import axios from "axios";
import { API_MainURL } from "../../APi/Api";
import { loginToken } from "../../APi/Api";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    productName: "",
    productSubName: "",
    rate: "",
    description: "",
    status: "",
  });

  const params = useParams(); // to read router params

  const navigate = useNavigate(); // to navigate

  const readData = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const getSingleProductData = async () => {
    try {
      let ApiResult = await axios.get(
        `${API_MainURL}/SingleProduct/${params.id}`,
        {
          headers: { Authorization: loginToken.token },
        }
      );
      setProduct(ApiResult.data.exitsID[0]);
      // console.log(ApiResult.data.exitsID[0]);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        validator.isAlpha(product.productName, "en-US", { ignore: " " }) ===
        false
      ) {
        return toast.error(" Enter Only Character Product Name ");
      }

      if (
        validator.isAlphanumeric(product.productSubName, "en-US", {
          ignore: " ",
        }) === false
      ) {
        return toast.error(" Enter Only Character Product Sub Name ");
      }

      let patternRate = /^[0-9]+(\.[0-9]{1,2})?$/g;
      if (validator.matches(String(product.rate), patternRate) === false) {
        return toast.error(" Enter Only Numeric Product Rate ");
      }

      if (
        validator.isAlphanumeric(product.description, "en-US", {
          ignore: " ",
        }) === false
      ) {
        return toast.error(" Enter Only Character Description ");
      }
      if (validator.isEmpty(product.status) === true) {
        return toast.error(" Select the Status Value");
      }
      console.log("hii");
      let ResultApi = await axios.patch(
        `${API_MainURL}/UpdateProduct/${params.id}`,
        product,
        {
          headers: { Authorization: loginToken.token },
        }
      );
      toast.success(ResultApi.data.msg);
      navigate("/ProductList");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div>
      <div className="container my-5">
        <div className="text-center">
          <h3>Update Product</h3>
        </div>
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmitHandler} autoComplete="off">
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="productName">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      placeholder="Enter Product Name"
                      onChange={readData}
                      className="form-control "
                      value={product.productName}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="productSubName">
                      Product Sub Name
                    </label>
                    <input
                      type="text"
                      id="productSubName"
                      name="productSubName"
                      placeholder="Enter Product Sub Name"
                      onChange={readData}
                      className="form-control "
                      value={product.productSubName}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="rate">
                      Rate
                    </label>
                    <input
                      type="number"
                      id="rate"
                      name="rate"
                      placeholder="Enter rate"
                      onChange={readData}
                      className="form-control "
                      value={String(product.rate)}
                    />
                  </div>
                  <div>
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        onChange={readData}
                        value={product.description}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="status">
                      product status
                    </label>
                    <select
                      className="form-select"
                      onChange={readData}
                      id="status"
                      name="status"
                      value={product.status}
                    >
                      <option selected value="">
                        Open This Select Status
                      </option>
                      <option value="Active">Active</option>
                      <option value="Disable">Disable</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success">Save</button>
                    <NavLink to={"/ProductList"} className="btn btn-warning">
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

export default UpdateProduct;
