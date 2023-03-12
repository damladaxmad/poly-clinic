import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import Box from "@mui/material/Box";
// import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import PurchaseForm from "../containers/NewPurchaseContainers/PurchaseForm/PurchaseForm";
import CheckoutForm from "../containers/NewPurchaseContainers/Checkout/CheckoutForm";
import TheTable from "../containers/NewPurchaseContainers/TableItems/TheTable";

const Calculator = () => {

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
        {" "}
        New Purchase{" "}
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
        <PurchaseForm/>
      </div>
        <CheckoutForm/>
        <TheTable/>
    </div>
  );
};

export default Calculator;
