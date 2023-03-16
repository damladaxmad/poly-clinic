import { Button } from "@material-ui/core";
import { useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";

const PurchaseForm = (props) => {

  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
  const [saleData, setSaleData] = useState({
   item: null,
   unitPrice: null,
   quantity: null,
   type: null,
   refNumber: null,
   date: null
  });

  console.log(saleData)

  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Selectors  item = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                item: data,
              };
            });
          }} 
          
          type = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                type: data,
              };
            });
          }}/>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PriceBox  
         total = {saleData?.unitPrice * saleData?.quantity}
        
        unitPrice = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                unitPrice: parseFloat(data),
              };
            });
          }}
          
          quantity = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                quantity: parseInt(data),
              };
            });
          }}/>

        <AdditionalInfo  refNumber = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                refNumber: data,
              };
            });
          }}
          
          date = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                date: data,
              };
            });
          }}
          
          item = {saleData.item}/>
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
            if (!saleData.item || !saleData.unitPrice 
              || !saleData.quantity || !saleData.refNumber || !saleData.date
              || !saleData.type) {
               return setError(true)
              }
              var exitLoop = false
              props.data?.map(dictum => {
                if (dictum.item == saleData.item) {
                  exitLoop = true
                }
              })
              if (exitLoop) return alert("WTF, why are you doing duplicates? 🤞🤞")
              
            setError(false)
            setDisable(true)
            props.tableData(saleData)
            props.products({
              item: saleData.item,
              unitPrice: saleData.unitPrice,
              quantity: saleData.quantity,
            })
            alert("Item added to the list!")
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
