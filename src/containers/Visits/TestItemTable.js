import { useSelector } from "react-redux";
import MyTable from "../../utils/MyTable"
import Table from "../../utils/Table"
import { memo, useEffect } from "react";

const columns = [
    { title: "Test Name", field: "name", width: "50%" },
    { title: "Test Price", field: "price", width: "50%"}
  ]




const TestItemTable = (props) => {

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
        <div style={{width: "100%", marginTop: "15px",
        height: tableTestData.length > 2 && "200px",
        overflowY: tableTestData.length > 2 && "scroll",
        overFlowX: "hidden",}}>
            <MyTable columns = {columns} data = {handler(tableTestData)} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default memo(TestItemTable)