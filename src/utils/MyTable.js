import React, { useEffect, useState } from "react";
import {MdClose} from "react-icons/md"
import MaterialTable from "material-table";

const MyTable = (props) => {

  const columns = props.columns;
  const [instance, setInstance] = useState("");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    instance
  ) => {
    setInstance(instance);
    props.removeItem(instance.item)
  };

  const removeItem = () => {
    setInstance(instance);
    // setAnchorEl(null)
    props.removeItem(instance.item)
  }

  return (
    <div style={{ width: props.page == "New Purchase" ? "98%" : "95%", 
    margin: props.page == "New Purchase" ? "none" : "auto" }}>

      <MaterialTable
    //   icons={tableIcons}
        columns={columns}
        data={props.data}
        options={{
          rowStyle: {},
          showTitle: false,
          paging: props.page == "New Purchase" ? false : true,
          exportButton: true,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: props.page == "New Purchase" ? 3 : 10,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#F6F6F6", fontSize: "13px",
          fontWeight: "bold"
      },
        }}
        actions={[
          {
            icon: () => (
              <MdClose style = {{color: "#E9356E", fontWeight: "bold", 
            fontSize: "24px"}}
              />
            ),
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClick(event, rowData);
            },
            position: "row",
          },
        ]}
        style={{ borderRadius: "10px", boxShadow: "none",
         border: props.page == "New Purchase" ? "1px solid black" : "none"}}
      />
    </div>
  );
};

export default MyTable;
