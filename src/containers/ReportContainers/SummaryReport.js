import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import MyTable from "../../utils/MyTable"

const SummaryReport = (props) => {

   let totalPrice = 0
   props.data?.map(data => {
    totalPrice += data.totalPrice
   })

   let totalItems = 0
   props.data?.map(data => {
    totalItems += data.totalQuantity
   })

    const columns = [
        { title: "Product Name", field: "name", width: "4%" },
        { title: "Quantity", field: "totalQuantity" },
        { title: "Avg Price", field: "avgUnitPrice" },
        { title: "Total", field: "totalPrice" },
    ]

    return (
        <div style = {{
            background: "white",
            borderRadius: "8px",
            padding: "30px 50px",
            display: "flex",
            gap: "30px",
            flexDirection: "column",
            width: "100%"
        }}>
            <div style = {{display: "flex", justifyContent: "space-between"}}>
            <div>
                <Typography style = {{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}> {props.type} Summary</Typography>
                <Typography style = {{
                    fontSize: "18px",
                    color: "#6C6C6C"
                }}> {totalItems} items</Typography>
            </div>
            <Typography style = {{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}> ${totalPrice?.toFixed(2)}</Typography>
            </div>
           
           {props.type == "Purchases" && <MyTable columns = {columns} 
            kind = "Report" data = {props.data} way = "summary"/>}
           {props.type == "Sales" && <MyTable columns = {columns} 
            kind = "Report" data = {props.data}  way = "summary"/>}
           {props.type == "Services" && <MyTable columns = {columns} 
            kind = "Report" data = {props.data}  way = "summary"/>}
        </div>
    )
}

export default SummaryReport