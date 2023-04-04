import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux";

const Top5DeenCustomers = (props) => {

    const customers = useSelector((state) => state.customers.customers);
    let values = []
    customers?.map(customer => {
        values.push(customer.balance)
    })
    let topValues = customers.sort((a,b) => b.balance-a.balance).slice(0,5);
    console.log(topValues)


    return (
        <div style = {{background: "#19274B", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", minWidth: "34.5%"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
                Customers Deen
            </Typography>
            <Typography style = {{fontWeight: "600", fontSize: "22px",
        color: "white"}}>
            Top Deen Customers
            </Typography>

            {topValues?.map((customer, index) => {
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> {customer.name.substring(0, 20)}
                {customer.name.length <= 20 ? null : "..." } </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> ${customer.balance} </Typography>
                </div>
                })}


        </div>
    )
}

export default Top5DeenCustomers