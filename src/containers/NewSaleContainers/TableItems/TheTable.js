import MyTable from "../../../utils/MyTable"
import Table from "../../../utils/Table"

const columns = [
    { title: "Product Name", field: "item", width: "40%" },
    { title: "Quantity", field: "quantity" },
    { title: "Unit Price", field: "unitPrice" },
    { title: "Total", field: "total", render: (data) => <p style = {{
        fontWeight: "bold"
    }}> 
        ${data?.unitPrice * data?.quantity}</p> }, 
  ]


const TheTable = (props) => {

    console.log(props.data)

    return (
        <div style={{width: "102%", marginTop: "15px"}}>
            <MyTable columns = {columns} data = {props.data} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default TheTable