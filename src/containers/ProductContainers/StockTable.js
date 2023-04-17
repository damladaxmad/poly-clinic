import React, { useEffect, useState } from "react";
import {MdClose} from "react-icons/md"
import MaterialTable from "material-table";
import { constants } from "../../Helpers/constantsFile";

const StockTable = (props) => {

  const columns = props.columns;
  const [instance, setInstance] = useState("");
  const [way, setWay] = useState(props.way)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    instance
  ) => {
    setInstance(instance);
   props.way == "Service" ? props.removeItem(instance.name) : props.removeItem(instance.item)
  };

  const removeItem = () => {
    setInstance(instance);
    // setAnchorEl(null)
    props.removeItem(instance.item)
  }

  return (
    <div style={{ width: "100%", 
    margin: "auto" }}>

      <MaterialTable
    //   icons={tableIcons}
        columns={columns}
        data={props.data}
        options={{
          rowStyle: {},
          showTitle: false,
          paging: props.page == "New Purchase" || props.kind == "Report" ? false : true,
          exportButton: true,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: props.page == "New Purchase" ? 3 : 10,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#F6F6F6", fontSize: "13px",
          fontWeight: "bold", display: props.kind == "Report" && "none"
      },
        }}
       actions={[
          props.kind != "Report" && {
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

        components={
          props.kind == "Report" && {
          Row: (props) => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent:"space-between",
                  borderBottom: "0.5px solid #C1C1C1",
                  padding: "6px 0px",
                  fontSize: 15,
                  background: props.data.quantity < 2 && "#FFCCCB"
                }}
              >
                
                <p style={{ margin: "0px", width: "40%",  }}>
                 {props.data.name}
                </p>
                <p style={{ margin: "0px", width: "18%", textAlign: "end" }}>
                  {props.data.quantity}
                </p>
                <p style={{ margin: "0px", width: "25%", textAlign: "end" }}>
                  {props.data.category}
                </p>
                <p style={{ margin: "0px", width: "20%", textAlign: "end" }}>
                {constants.moneySign}{props.data.unitPrice.toFixed(2)}
                </p>
                <p style={{ margin: "0px", width: "20%", textAlign: "end" }}>
                  {constants.moneySign}{props.data.salePrice?.toFixed(2)}
                </p>
                <p style={{ margin: "0px", width: "22%", textAlign: "end" }}>
                  {constants.moneySign}{props.data.totalCost?.toFixed(2)}
                </p>
              </div>
            );
          },
        }}
        style={{ borderRadius: "10px", boxShadow: "none",
         border: props.page == "New Purchase" ? "1px solid black" : "none"}}
      />
    </div>
  );
};

export default StockTable;
