import { Button } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";

const PurchaseForm = (props) => {

  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PriceBox  
         total = {purchaseData?.unitPrice * purchaseData?.quantity}
        
        unitPrice = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                unitPrice: parseFloat(data),
              };
            });
          }}
          
          salePrice = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                salePrice: parseFloat(data),
              };
            });
          }}
          
          quantity = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                quantity: parseInt(data),
              };
            });
          }}/>

        <AdditionalInfo  refNumber = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                refNumber: data,
              };
            });
          }}
          
          date = {(data) => {
            setPurchaseData((prevState) => {
              return {
                ...prevState,
                date: data,
              };
            });
          }}
          
          item = {purchaseData.item}/>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <Button
          disabled = {disable}
          style={{
            width: "150px",
            fontSize: "16px",
            fontWeight: "bold",
            background: disable ? "lightGray" : "#4421DE",
            color: "white",
          }}
          type="submit"
          variant="contained"
          onClick = {()=>  {
            if (!purchaseData.item || !purchaseData.unitPrice || !purchaseData.salePrice
              || !purchaseData.quantity || !purchaseData.refNumber || !purchaseData.date
              || !purchaseData.type) {
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
            alert("Item added to the list 👍👍")
            setDisable(false)
          }}
        >
          Add List
        </Button>
        <Button
          style={{
            width: "150px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#F22417",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          Clear All
        </Button>
      {error && <p style = {{color: "red", marginLeft: "50px",
    fontSize: "16px", alignSelf: "center"}}> Hey stupid, fill all the blanks 😁😁</p>}
      </div>

    </div>
  );
};

export default PurchaseForm;
