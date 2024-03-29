import { Box, Button, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SaleForm from "../containers/NewSaleContainers/SaleForm/SaleForm"
import PurchasesReport from "../containers/Reports/PurchasesReport";

const Sale = () => {

  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [value, setValue] = useState("newSale")

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
            
       
          {activeUser.privillages?.includes("New Sale") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="newSale" label="New Sale"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Sale Report") && <Tab
            disableFocusRipple = {true}
            disableRipple = {true}
            value="saleReport" label="Sale Report"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>
     

      {value == "newSale" && <div
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
        <SaleForm tableData = {(data) => 
          setTableData([...tableData, data])
          } 
          products = {(data) => 
            setProducts([...products, data])
            }
          data = {tableData}/>
      </div>}
      
      {value == "saleReport"  && <PurchasesReport
      name = "sales" type = "Sale"/>}
    </div>
  );
};

export default Sale;
