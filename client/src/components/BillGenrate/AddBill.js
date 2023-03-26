import React, { useEffect, useState } from "react";
import { formattedDate, formattedTime } from "../../APi/CommonCode";
import Select from "react-select";
import axios from "axios";
import validator from "validator";
import { API_MainURL, loginToken } from "../../APi/Api";
import Delete from "../../assest/image/Delete.png";
function AddBill() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [inputFields, setInputFields] = useState([
    {
      ProductId: "",
      productRate: "",
      Quantity: "",
      totalAmount: "",
    },
  ]);

  //  get products from API
  const getProduct = async () => {
    try {
      let ResultApi = await axios.get(`${API_MainURL}/ProductInfo`, {
        headers: { Authorization: loginToken.token },
      });
      //  transformed data in to value and label
      const transformedOptions = await ResultApi.data.result.map((option) => ({
        value: option.id,
        label: option.productName,
      }));
      console.log("transformedOptions", transformedOptions);
      setProducts(transformedOptions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.msg);
    }
  };

  const addInputField = (e) => {
    e.preventDefault();
    setInputFields([
      ...inputFields,
      {
        ProductId: "",
        productRate: "",
        Quantity: "0",
        totalAmount: "",
      },
    ]);
  };
  const removeInputFields = (index, event) => {
    event.preventDefault();
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  // calculation for QYT and Total
  function calculateTotalQuantityAndAmount(inputFields) {
    const totalQuantity = inputFields
      .map((item) => parseInt(item.Quantity))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const totalAmount = inputFields
      .map((item) => parseInt(item.totalAmount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return { totalQuantity, totalAmount };
  }

  const handleChange = async (index, event) => {
    if (event.value === undefined) {
      const { name, value } = event.target;

      const list = [...inputFields];
      list[index][name] = value;
      list[index]["totalAmount"] = inputFields[index].productRate * value;
      setInputFields(list);
      const { totalQuantity, totalAmount } =
        calculateTotalQuantityAndAmount(inputFields);
      setTotalQuantity(totalQuantity);
      setTotalAmount(totalAmount);
    } else {
      try {
        let ResultApi = await axios.get(
          `${API_MainURL}/SingleProduct/${event.value}`,
          {
            headers: { Authorization: loginToken.token },
          }
        );
        console.log(ResultApi.data.exitsID[0].rate);
        let myInput = document.getElementById(`Quantity-${index}`).value;
        const list = [...inputFields];
        list[index]["ProductId"] = event.value;
        list[index]["productRate"] = ResultApi.data.exitsID[0].rate;
        list[index]["totalAmount"] = inputFields[index].productRate * myInput;
        setInputFields(list);
        const { totalQuantity, totalAmount } =
          calculateTotalQuantityAndAmount(inputFields);
        setTotalQuantity(totalQuantity);
        setTotalAmount(totalAmount);
      } catch (err) {
        console.log(err.response.data.msg);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("data", inputFields);
  };

  useEffect(() => {
    getProduct();
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
              <div className="col-5">Product Name</div>
              <div className="col">Rate</div>
              <div className="col">Quantity</div>
              <div className="col">Total Amount</div>
              <div className="col">
                {inputFields.length !== 1 ? "Remove" : ""}
              </div>
            </div>
            <div className="row">
              <div className="">
                {inputFields.map((data, index) => {
                  return (
                    <div className="row my-3" key={index}>
                      <div className="col-5">
                        <div className="form-group">
                          <Select
                            name="ProductId"
                            onChange={(event) => handleChange(index, event)}
                            options={products}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          value={inputFields[index].productRate}
                          name="productRate"
                          className="form-control"
                          placeholder="Product Rate"
                          onChange={(event) => handleChange(index, event)}
                          readOnly
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          onChange={(event) => handleChange(index, event)}
                          name="Quantity"
                          id={`Quantity-${index}`}
                          className="form-control"
                          placeholder="Quantity"
                          min={1}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          value={inputFields[index].totalAmount}
                          name="totalAmount"
                          className="form-control"
                          placeholder="Total Amount"
                          readOnly
                        />
                      </div>
                      <div className="col">
                        {inputFields.length !== 1 ? (
                          <button
                            className="btn btn-danger"
                            onClick={(event) => removeInputFields(index, event)}
                          >
                            <img
                              src={Delete}
                              alt="Delete"
                              style={{ width: "15px" }}
                            />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button
                  className="btn btn-outline-success "
                  onClick={addInputField}
                >
                  Add
                </button>

                <button
                  className="btn btn-outline-success mx-3"
                  onClick={submitHandler}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between my-3">
              <div className="h5">
                Total Quantity:- {totalQuantity}
              </div>
              <div className="h5">TotalAmount:- {totalAmount}</div>
            </div>
            <hr />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBill;
