import { Box, Button, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import PurchaseForm from "../containers/NewPurchaseContainers/PurchaseForm/PurchaseForm";
import CheckoutForm from "../containers/NewPurchaseContainers/Checkout/CheckoutForm";
import TheTable from "../containers/NewPurchaseContainers/TableItems/TheTable";
import { useSelector } from "react-redux";
import PurchasesReport from "../containers/Reports/PurchasesReport";

const Purchase = () => {

  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [value, setValue] = useState("newPurchase")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const removeItem = (item) => {
    setTableData((current) =>
    current.filter((i) => i.item !== item)
  );
    setProducts((current) =>
    current.filter((i) => i.item !== item)
  );
  alert("Item removed successfully ✔✔")
  }

  console.log(tableData)

  return (
    <div
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        gap: "32px",
        flexDirection: "column",
      }}
    >

<Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            
       
          {activeUser.privillages?.includes("New Purchase") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="newPurchase" label="New Pruchase"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Purchase Report") && <Tab
            disableFocusRipple = {true}
            disableRipple = {true}
            value="purchaseReport" label="Purchase Report"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>
     

      {value == "newPurchase" && <div
        style={{
          width: "98%",
          background: "white",
          // height: "480px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        <PurchaseForm tableData = {(data) => 
          setTableData([...tableData, data])
          } 
          products = {(data) => 
            setProducts([...products, data])
            }
          data = {tableData}/>
      </div>}
      
      {value == "purchaseReport"  && <PurchasesReport/>}
    </div>
  );
};

export default Purchase;
