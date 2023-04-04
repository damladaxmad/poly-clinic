import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import MyTable from "../../utils/MyTable"

const PersonalReport = (props) => {

    const customers = useSelector(state => state.customers.customers)
    const vendors = useSelector(state => state.vendors.vendors)

    let customerTotal = 0
    let vendorTotal = 0

    let realCustomers = []
    customers?.map(customer => {
        if (customer.balance > 0) {
        realCustomers.push(customer)
        customerTotal += customer.balance
        }
    })

    let realVendors = []
    vendors?.map(vendor => {
        if (vendor.balance > 0){
        realVendors.push(vendor)
        vendorTotal += vendor.balance
        }
    })

    const columns = [
        { title: "Full Name", field: "name", width: "4%" },
        { title: "Phone Number", field: "phone" },
        { title: "Address", field: "district" },
        { title: "Balance", field: "balance" },
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
                }}> {props.type} Report</Typography>
                <Typography style = {{
                    fontSize: "18px",
                    color: "#6C6C6C"
                }}> {props.name == "customers" ? realCustomers.length : realVendors.length} {props.name}</Typography>
            </div>
            <Typography style = {{
                    fontWeight: "bold",
                    fontSize: "20px"
                }}> ${props.name == "customers" ? customerTotal : vendorTotal}</Typography>
            </div>
           
           {props.name == "customers" && <MyTable columns = {columns} data = {realCustomers}
            kind = "Report"/>}
           {props.name == "vendors" && <MyTable columns = {columns} data = {realVendors}
            kind = "Report"/>}
        </div>
    )
}

export default PersonalReport