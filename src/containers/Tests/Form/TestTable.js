import { useSelector } from "react-redux";
import MyTable from "../../../utils/MyTable"
import Table from "../../../utils/Table"
import { memo, useEffect } from "react";

const columns = [
    { title: "Test Name", field: "name", width: "40%" },
    { title: "Test Note", field: "note", width: "40%" },
  ]



const TestTable = (props) => {

    const tableTestData = useSelector(state => state.tableTestData.tableTestData)

    const handler = (data) => { 
        if (data?.length > 0) {
          return data
        } else {
          return
        }  
      };

      console.log(tableTestData)

      useEffect(() => {

      }, [tableTestData])



    return (
        <div style={{width: "100%", marginTop: "15px"}}>
            <MyTable columns = {columns} data = {handler(tableTestData)} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default memo(TestTable)