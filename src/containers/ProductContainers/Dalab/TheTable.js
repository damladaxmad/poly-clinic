import { useSelector } from "react-redux";
import MyTable from "../../../utils/MyTable"
import Table from "../../../utils/Table"
import { memo, useEffect } from "react";

const columns = [
    { title: "Product Name", field: "item", width: "40%" },
    { title: "Category", field: "category" },
    { title: "Quantity", field: "quantity" },
   
  ]



const TheTable = (props) => {

    const tableDalab = useSelector(state => state.tableDalab.tableDalab)

    const handler = (data) => { 
        if (data?.length > 0) {
          return data
        } else {
          return
        }  
      };

      console.log(tableDalab)

      useEffect(() => {

      }, [tableDalab])



    return (
        <div style={{width: "85%", }}>
            <MyTable columns = {columns} data = {handler(tableDalab)} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default memo(TheTable)