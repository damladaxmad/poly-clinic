import React, { useState, useEffect, useReducer } from "react"
import {Tabs, Tab, Box} from "@mui/material"
import { useSelector } from "react-redux";
import TransactionTable from "../containers/TransactionContainers/TransactionTable";


const TransactionPage = () => {

  const statusArr = ["All", "Active", "Inactive"]
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const sales = useSelector(state => state.sales.sales)
  const services = useSelector(state => state.services.services)
  const purchases = useSelector(state => state.purchases.purchases)

  const [value, setValue] = React.useState("sales");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  const [change, setChange] = useState(1)
  const [myChange, setMyChange] = useState(1)

  const changeHandler = () => {
    setChange(state => state + 1)
  }

  
  return (
    <div
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      margin: "0px auto",
      gap: "0px",
      flexDirection: "column",
    }}
  >
    <div style = {{display: "flex", width: "95%", margin: "auto",
  justifyContent: "space-between"}}>
     <Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple = {true}
          >
            
       
          {activeUser.privillages?.includes("New Sale") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="sales" label="Sales"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("New Purchase") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="purchases" label="Purchases"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("New Service") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="services" label="Services"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>


        </div>
       {value == "sales" && <TransactionTable data = {sales} url = "sales" name = "Sales"/>}
       {value == "purchases" && <TransactionTable data = {purchases} url = "purchases" name = "Purchases"/>}
       {value == "services" && <TransactionTable data = {services} url = "services" name = "Services"/>}
  
    </div>
  );
};

export default TransactionPage;
