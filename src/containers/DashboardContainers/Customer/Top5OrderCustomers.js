import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux";

const Top5OrderCustomers = (props) => {
    const dashboard = useSelector((state) => state.dashboard.dashboard);
    console.log(props.data)

    return (
        <div style = {{background: "white", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", width: "320px"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
              Users Fee
            </Typography>
            <Typography style = {{fontWeight: "600", fontSize: "22px"}}>
            Top Fee Users
            </Typography>

            {dashboard?.users[2].value?.map((order, index) => {
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {order.username} </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> ${order.fee} </Typography>
                </div>
                })}


        </div>
    )
}

export default Top5OrderCustomers