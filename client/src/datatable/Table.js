import React from "react";
import MUIDataTable from "mui-datatables";
function Table(props) {
  const options = {
    filter: true,
    print: true,
    viewColumns: false,
    searchOpen: false,
    searchPlaceholder: " Search User",
    selectableRowsHideCheckboxes: true,
  };
  return (
    <div>
      <MUIDataTable
        title={props.TableName}
        data={props.data}
        columns={props.columns}
        options={options}
      />
    </div>
  );
}

export default Table;
