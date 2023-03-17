import React, { useEffect, useState } from "react";
import { formattedDate, formattedTime } from "../../APi/CommonCode";
import { API_MainURL, loginToken } from "../../APi/Api";
import axios from "axios";

function AddBill() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(0);
  const [productRate, setProductRate] = useState(0);
  // const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [addToList, setAddToList] = useState([]);

  //  get all products id and product name fetching from API
  const getAllProduct = async () => {
    try {
      let ResultApi = await axios.get(`${API_MainURL}/ProductInfo`, {
        headers: { Authorization: loginToken.token },
      });
      setProducts(ResultApi.data.result);
      setLoading(false);
      console.log(ResultApi.data.result);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.msg);
    }
  };

  const onChangeQuantity = (e) => {
    const { value } = e.target;
    let total = productRate * value;
    setTotalAmount(total);
    console.log(total);
  };

  //  On change Product fetching product rate
  const onChangeSelected = async (e) => {
    const { value } = e.target;
    setProductId(value);
    try {
      let ResultApi = await axios.get(`${API_MainURL}/SingleProduct/${value}`, {
        headers: { Authorization: loginToken.token },
      });
      setProductRate(ResultApi.data.exitsID[0].rate);
      // onChangeQuantity(e)
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  if (loading) {
    return (
      <div className="container text-center">
        <h5>Loading Please Wait</h5>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="text-center">
        <h3>Create Bill</h3>
      </div>
      <div className="row">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div>
                <label htmlFor="">Date :-</label>
                <span> {formattedDate}</span>
                <br />
                <label htmlFor="">Date :-</label>
                <span> {formattedTime}</span>
              </div>
              <div>
                <h5 className="mt-2">
                  <u>Bill System</u>
                </h5>
              </div>
              <div>
                <label htmlFor="">Invoice No :- </label>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form action="#" autoComplete="off">
              <div className="row">
                <div className="col-xxl-4 col-xl-4  col-md-4 col-sm-4 col-12">
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="Customer Name">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      placeholder="Enter Customer Name"
                      //   onChange={readData}
                      className="form-control "
                      //   value={product.productSubName}
                    />
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-4  col-md-4 col-sm-4 col-12">
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="CustomerPhoneNo">
                      Customer Phone No
                    </label>
                    <input
                      type="number"
                      id="customerPhoneNo"
                      name="customerPhoneNo"
                      placeholder="Enter Customer Phone No"
                      // onChange={readData}
                      className="form-control "
                      // value={user.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label className="form-label" htmlFor="Product Name">
                    Product Name
                  </label>
                  <select
                    className="form-select"
                    id="productId"
                    name="productId"
                    onChange={onChangeSelected}
                  >
                    <option value="">Select the Product</option>

                    {products.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.productName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-sm-3">
                  <label className="form-label" htmlFor=" Product Rate">
                    Product Rate
                  </label>
                  <input
                    type="text"
                    id="productRate"
                    name="productRate"
                    placeholder="Enter Product Rate"
                    value={productRate}
                    className="form-control "
                    readOnly
                  />
                </div>
                <div className="col-sm-3">
                  <label className="form-label" htmlFor="Quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="Quantity"
                    name="Quantity"
                    placeholder="Enter Quantity"
                    className="form-control "
                    min={1}
                    onChange={onChangeQuantity}
                  />
                </div>
                <div className="col-sm-3">
                  <label className="form-label" htmlFor=" Total Amount">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    id="totalAmount"
                    name="totalAmount"
                    placeholder="Enter Total Amount"
                    className="form-control "
                    value={totalAmount}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBill;
