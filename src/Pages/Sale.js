import { Button, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import CheckoutForm from "../containers/NewSaleContainers/Checkout/CheckoutForm";
import TheTable from "../containers/NewSaleContainers/TableItems/TheTable"
import SaleForm from "../containers/NewSaleContainers/SaleForm/SaleForm"
const Sale = () => {

  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);

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

        <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
          New Sale
        </Typography>

      <div
        style={{
          width: "98%",
          background: "white",
          height: "480px",
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
      </div>
        <CheckoutForm data = {tableData} products = {products}/>
        {tableData?.length > 0 && <TheTable data = {tableData} 
        removeItem = {(item) => removeItem(item)}/>}
    </div>
  );
};

export default Sale;
