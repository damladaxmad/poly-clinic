import MyTable from "../../../utils/MyTable"
import Table from "../../../utils/Table"

const columns = [
    { title: "Product Name", field: "item", width: "4%" },
    { title: "Quantity", field: "quantity" },
    { title: "Unit Price", field: "unitPrice" },
    { title: "Sale Price", field: "salePrice" },
    { title: "Total", field: "total", render: (data) => <p style = {{
        fontWeight: "bold"
    }}> 
        ${data?.unitPrice * data?.quantity}</p> }, 
  ]

  const data = [
    {item: "Emoxcilin Tablet", quantity: 5, unitPrice: "$5",
     salePrice: "$25", total: "$50"
    },
    {item: "Emoxcilin Tablet", quantity: 5, unitPrice: "$5",
     salePrice: "$25", total: "$50"
    },
    {item: "Emoxcilin Tablet", quantity: 5, unitPrice: "$5",
     salePrice: "$25", total: "$50"
    },
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