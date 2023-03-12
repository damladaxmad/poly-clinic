import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux";

const Top5DeenCustomers = (props) => {

    const dashboard = useSelector((state) => state.dashboard.dashboard);
    console.log(dashboard?.users)

    return (
        <div style = {{background: "#19274B", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", width: "320px"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
                Users Debt
            </Typography>
            <Typography style = {{fontWeight: "600", fontSize: "22px",
        color: "white"}}>
            Top Debt Users
            </Typography>

            {dashboard?.users[0]?.value?.map((order, index) => {
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> {order.name.substring(0, 20)}
                {order.name.length <= 20 ? null : "..." } </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> ${order.balance} </Typography>
                </div>
                })}


        </div>
    )
}

export default Top5DeenCustomers