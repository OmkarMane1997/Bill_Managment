import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../datatable/Table";
import { API_MainURL } from "../../APi/Api";
import { loginToken } from "../../APi/Api";
import { NavLink } from "react-router-dom";
function UserList() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  let TableName = "User List";
  const getData = async () => {
    try {
      let getResult = await axios.get(`${API_MainURL}/GetAllUser`, {
        headers: { Authorization: loginToken.token },
      });
      setUserData(getResult.data.result);
      console.log(getResult.data.result);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "phone",
      label: "Phone Number",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "role",
      label: "User Role",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const role = tableMeta.rowData[3];
          return <>{role === "0" ? "Administrator" : "Normal User"}</>;
        },
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
              <NavLink to={`/UpdateUser/${id}`} className="btn btn-warning">
                Edit
              </NavLink>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    print: true,
    viewColumns: false,
    searchOpen: false,
    searchPlaceholder: " Search User",
    selectableRowsHideCheckboxes: true,
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>User List Table is Loading Please Wait...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Table
        userData={userData}
        columns={columns}
        TableName={TableName}
        options={options}
      />
    </div>
  );
}

export default UserList;
