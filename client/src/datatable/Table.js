import React from "react";
import MUIDataTable from "mui-datatables";
function Table(props) {
  return (
    <div>
      <MUIDataTable
        title={props.TableName}
        data={props.userData}
        columns={props.columns}
        options={props.options}
      />
    </div>
  );
}

export default Table;
