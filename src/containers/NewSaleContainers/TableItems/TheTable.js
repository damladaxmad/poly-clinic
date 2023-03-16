import Table from "../../../utils/Table"

const columns = [
    { title: "Product Name", field: "item", width: "4%" },
    { title: "Quantity", field: "quantity" },
    { title: "Unit Price", field: "unitPrice" },
    { title: "Invoice", field: "refNumber" },
    { title: "Date", field: "date" },
    { title: "Total", field: "total", render: (data) => <p style = {{
        fontWeight: "bold"
    }}> 
        ${data?.unitPrice * data?.quantity}</p> }, 
  ]



const TheTable = (props) => {


    return (
        <div>
            <Table columns = {columns} data = {props.data} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default TheTable