import { useSelector } from "react-redux";
import MyTable from "../../../utils/MyTable"
import Table from "../../../utils/Table"
import { memo, useEffect } from "react";

const columns = [
    { title: "Product Name", field: "item", width: "40%" },
    { title: "Quantity", field: "quantity" },
    { title: "Price", field: "unitPrice" },
    // { title: "Sale Price", field: "salePrice" },
    { title: "Total", field: "total", render: (data) => <p style = {{
        fontWeight: "bold"
    }}> 
        ${data?.unitPrice * data?.quantity}</p> }, 
  ]



const TheTable = (props) => {

    const tableData = useSelector(state => state.tableData.tableData)

    const handler = (data) => { 
        if (data?.length > 0) {
          return data
        } else {
          return
        }  
      };

      console.log(tableData)

      useEffect(() => {

      }, [tableData])



    return (
        <div style={{width: "102%", marginTop: "15px"}}>
            <MyTable columns = {columns} data = {handler(tableData)} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default memo(TheTable)