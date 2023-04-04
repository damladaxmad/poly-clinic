import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux";

const Top5DeenVendors = (props) => {

    const vendors = useSelector((state) => state.vendors.vendors);
    let values = []
    vendors?.map(vendor => {
        values.push(vendor.balance)
    })
    let topValues = vendors?.sort((a,b) => b.balance-a.balance).slice(0,5);
    console.log(topValues)


    return (
        <div style = {{background: "white", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", minWidth: "34.5%"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
                Vendors Deen
            </Typography>
            <Typography style = {{fontWeight: "600", fontSize: "22px",
       }}>
            Top Deen Vendors
            </Typography>

            {topValues?.map((vendor, index) => {
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "15px",
              color: "#575656"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {vendor.name.substring(0, 20)}
                {vendor.name.length <= 20 ? null : "..." } </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> ${vendor.balance} </Typography>
                </div>
                })}


        </div>
    )
}

export default Top5DeenVendors