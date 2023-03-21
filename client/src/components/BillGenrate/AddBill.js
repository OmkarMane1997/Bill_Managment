import React, { useEffect, useRef, useState } from "react";
import { formattedDate, formattedTime } from "../../APi/CommonCode";
import { API_MainURL, loginToken } from "../../APi/Api";
import axios from "axios";
import validator from "validator";
import { toast } from "react-toastify";
import Delete from "../../assest/image/Delete.png";
// import Edit from "../../assest/image/Edit.png";
// import Save from "../../assest/image/Save.png";
function AddBill() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [productRate, setProductRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [addToList, setAddToList] = useState([]);
  const inputRef = useRef(null);
  //  get all products id and product name fetching from API
  const getAllProduct = async () => {
    try {
      let ResultApi = await axios.get(`${API_MainURL}/ProductInfo`, {
        headers: { Authorization: loginToken.token },
      });
      setProducts(ResultApi.data.result);
      setLoading(false);
      // console.log(ResultApi.data.result);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.msg);
    }
  };

  const onChangeQuantity = (e) => {
    const { value } = e.target;
    let total = productRate * value;
    setTotalAmount(total);
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
      setSelectedLabel(e.target.options[e.target.selectedIndex].label);
      inputRef.current.focus();
      inputRef.current.value = "";
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  // add to table
  const addData = (e) => {
    e.preventDefault();
    //  validation part
    if (productId === 0 || productId === "") {
      return toast.error("Selected Product");
    }
    const inputValue = inputRef.current.value;
    if (validator.isNumeric(inputValue) === false) {
      return toast.error("Enter Only Numeric value ");
    }
    //  to generate Unique id for delete
    function generateUniqueId() {
      // const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000);
      return `${random}`;
    }
    // collection all data of one row
    let data = {
      id: generateUniqueId(),
      PId: productId,
      pName: selectedLabel,
      PRate: productRate,
      PQuantity: inputValue,
      PTotalAmount: totalAmount,
    };

    // console.log("all combined", data);
    // find the data id already add or nor if present then send msg otherwise add data into array.

    let findItem = addToList.find((item) => item.PId === productId);
    if (findItem) {
      // console.log("all ready add this value ");
      return toast.warning("All Ready Add This Product");
    } else {
      setAddToList([...addToList, data]);
    }

    // reset function call here to reset the data after insert data
    
    resetData(e);
    //
    // console.log("Add to list table :-", addToList);
  };
  // reset
  const resetData = (e) => {
    e.preventDefault();
    setProductId("");
    setProductRate(0);
    setTotalAmount(0);
    inputRef.current.value = "";
  };

  // remove form list

  const removeAddToListItem = (event, param) => {
    event.preventDefault();
    console.log("index", param);
    setAddToList((oldValues) => {
      return oldValues.filter((item) => item.id !== param);
    });

    console.log(addToList);
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
                <label htmlFor="" className="mt-2">
                  Date :-
                </label>
                <span> {formattedDate}</span>
                <br />
              </div>
              <div>
                <h5 className="mt-2">
                  <u>Bill System</u>
                </h5>
              </div>
              <div>
                <label htmlFor="" className="mt-2">
                  Date :-
                </label>
                <span> {formattedTime}</span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form autoComplete="off">
              <div className="row">
                <div className="col-xxl-4 col-xl-4  col-md-4 col-sm-6 col-12">
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
                <div className="col-xxl-4 col-xl-4  col-md-4 col-sm-6 col-12">
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
                <div className="col-xxl-3 col-xl-3  col-md-3 col-sm-6 col-12">
                  <label className="form-label" htmlFor="Product Name">
                    Product Name
                  </label>
                  <select
                    className="form-select"
                    id="productId"
                    name="productId"
                    onChange={onChangeSelected}
                    value={productId}
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
                <div className="col-xxl-3 col-xl-3  col-md-3 col-sm-6 col-12">
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
                <div className="col-xxl-3 col-xl-3  col-md-3 col-sm-6 col-12">
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
                    ref={inputRef}
                    onChange={onChangeQuantity}
                  />
                </div>
                <div className="col-xxl-3 col-xl-3  col-md-3 col-sm-6 col-12">
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
              <div className="row">
                <div className=" offset-md-10 col-xxl-3 col-xl-3  col-md-3 col-sm-6 col-12 my-3">
                  <button className="btn btn-success mx-3" onClick={addData}>
                    Add
                  </button>
                  <button className="btn btn-warning mx-3" onClick={resetData}>
                    Reset
                  </button>
                </div>
              </div>

              <div className="row">
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th> Rate</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addToList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th>{item.pName}</th>
                            <td>{item.PRate} RS</td>
                            <td>{item.PQuantity}</td>
                            <td>{item.PTotalAmount} RS</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={(event) =>
                                  removeAddToListItem(event, item.id)
                                }
                              >
                                <img
                                  src={Delete}
                                  alt="Delete"
                                  style={{ width: "15px" }}
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className=" h4">Total Quantity:- 10 Qty</div>
                <div className=" h4">Total Amount :- 10 rs</div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-xxl-4 col-xl-4  col-md-4 col-sm-6 col-12">
                  a
                </div>
                <div className="col-xxl-4 col-xl-4  col-md-4 col-sm-6 col-12">
                  a
                </div>
                <div className="col-xxl-4 col-xl-4  col-md-4 col-sm-6 col-12">
                  a
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
