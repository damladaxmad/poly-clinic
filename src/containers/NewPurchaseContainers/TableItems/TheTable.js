import Table from "../../../utils/Table"

const columns = [
    { title: "Product Name", field: "name", width: "4%" },
    { title: "Quantity", field: "quantity" },
    { title: "Unit Cost", field: "unitCost" },
    { title: "Unit Price", field: "unitPrice" },
    { title: "Invoice", field: "invoice" },
    { title: "Date", field: "date" },
    { title: "Total", field: "total" }, 
  ]

const data = [
    {name: "Emoxicilin Syrup", 
    quantity: 24, unitCost: "$2", unitPrice: "$3", invoice: "AC-012345", 
    date: "12/3/2023", total: "$48"},
    {name: "Emoxicilin Syrup", 
    quantity: 24, unitCost: "$2", unitPrice: "$3", invoice: "AC-012345", 
    date: "12/3/2023", total: "$48"},
    {name: "Emoxicilin Syrup", 
    quantity: 24, unitCost: "$2", unitPrice: "$3", invoice: "AC-012345", 
    date: "12/3/2023", total: "$48"},
    {name: "Emoxicilin Syrup", 
    quantity: 24, unitCost: "$2", unitPrice: "$3", invoice: "AC-012345", 
    date: "12/3/2023", total: "$48"},
    {name: "Emoxicilin Syrup", 
    quantity: 24, unitCost: "$2", unitPrice: "$3", invoice: "AC-012345", 
    date: "12/3/2023", total: "$48"},
    {name: "Emoxicilin Syrup", 
    quantity: 24, unitCost: "$2", unitPrice: "$3", invoice: "AC-012345", 
    date: "12/3/2023", total: "$48"},
    
]


const TheTable = () => {

    return (
        <div>
            <Table columns = {columns} data = {data}/>
        </div>
    )
}

export default TheTable