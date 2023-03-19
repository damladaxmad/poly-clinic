import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import CheckoutForm from "../Checkout/CheckoutForm";
import TheTable from "../TableItems/TheTable";
import AdditionalInfo from "./AdditionalInfo";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";

const PurchaseForm = (props) => {

  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [reset, setReset] = useState(false)
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    instance
  ) => {
    setAnchorEl(event.currentTarget);
    // setInstance(instance);
  };

  const [purchaseData, setPurchaseData] = useState({
   item: null,
   unitPrice: null,
   salePrice: null,
   quantity: null,
   type: null,
   refNumber: null,
   date: null
  });

  console.log(purchaseData)

  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Selectors  item = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                item: data,
              };
            });
          }} 
          
          type = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                type: data,
              };
            });
          }}/>

      <div style = {{display: "flex", gap: "50px", alignItems: "flex-start",
    justifyContent: "space-between"}}>

      <div style={{ display: "flex", gap: "20px", 
      flexDirection: "column"
     }}>

     <div style={{display: "flex", gap: "30px", alignItems: "flex-end"}}>
        <PriceBox  
         total = {purchaseData?.unitPrice * purchaseData?.quantity}
         reset = {reset}
        unitPrice = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                unitPrice: parseFloat(data),
              };
            });
            setReset(false)
          }}
          
          salePrice = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                salePrice: parseFloat(data),
              };
            });
            setReset(false)
          }}
          
          quantity = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                quantity: parseInt(data),
              };
            });
            setReset(false)
          }}/>

        <Button
          disabled = {disable}
          style={{
            width: "140px",
            fontSize: "15px",
            height: "40px",
            borderRadius: "8px",
            fontWeight: "bold",
            background: disable ? "lightGray" : "black",
            color: "white",
          }}
          type="submit"
          variant="contained"
          onClick = {()=>  {
            if (!purchaseData.item || !purchaseData.unitPrice || !purchaseData.salePrice
              || !purchaseData.quantity 
              // || !purchaseData.refNumber || !purchaseData.date
             ) {
               return setError(true)
              }
            var exitLoop = false
            props.data?.map(dictum => {
              if (dictum.item == purchaseData.item) {
                exitLoop = true
              }
            })
            if (exitLoop) return alert("WTF, why are you doing duplicates? 🤞🤞")
            setError(false)
            setDisable(true)
            props.tableData(purchaseData)
            props.products({
              item: purchaseData.item,
              unitPrice: purchaseData.unitPrice,
              salePrice: purchaseData.salePrice,
              quantity: purchaseData.quantity,
            })
            alert("Item Added To The List!")
            setReset(true)
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                quantity: null,
                unitPrice: null,
                salePrice: null
              };
            });
            setDisable(false)
          }}
        >
          Add Item
        </Button>
    </div>

    {error && <p style = {{color: "red", marginLeft: "50px",
    fontSize: "16px", alignSelf: "center"}}> Hey stupid, fill all the blanks 😁😁</p>}
        
       <TheTable data = {purchaseData}/>
      
      </div>

    <CheckoutForm/>

  

      </div>
    
    </div>
  );
};



{/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
<Alert onClose={handleClose} severity="success" sx={{ width: '300px',
background: "black", color: "white" }}>
 Clear functionality is coming soon!
</Alert>
</Snackbar> */}

export default PurchaseForm;
