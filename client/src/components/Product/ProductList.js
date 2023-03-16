import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_MainURL } from "../../APi/Api";
import { loginToken } from "../../APi/Api";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import Table from "../../datatable/Table";
function ProductList() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      let resultApi = await axios.get(`${API_MainURL}/GetAllProduct`, {
        headers: { Authorization: loginToken.token },
      });
      setProducts(resultApi.data.result);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      toast.error(err.response.data.msg);
    }
  };

  const columns = [
    {
      name: "productName",
      label: "Product Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "productSubName",
      label: "Product Sub Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "rate",
      label: "Rate",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        // customBodyRender: (value, tableMeta, updateValue) => {
        //   const role = tableMeta.rowData[3];
        //   return <>{role === "0" ? "Administrator" : "Normal User"}</>;
        // },
      },
    },
    {
      name: "id",
      label: "ACTION",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = tableMeta.rowData[4];

          return (
            <div>
              <NavLink to={`/UpdateProduct/${id}`} className="btn btn-warning">
                Edit
              </NavLink>
            </div>
          );
        },
      },
    },
  ];

  useEffect(() => {
    getProducts();
  }, []);
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Product List Table is Loading Please Wait...</h3>
      </div>
    );
  }

  const TableName = "Product List";
  return (
    <div className="container mt-5">
      <Table data={products} columns={columns} TableName={TableName} />
    </div>
  );
}

export default ProductList;
