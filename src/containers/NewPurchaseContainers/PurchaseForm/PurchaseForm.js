import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [autoReset, setAutoReset] = useState(1)

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
  });

  const [purchaseInfo, setPurchaseInfo] = useState({
    type: null,
    vendor: null,
    date: null
  });

  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);

  const removeItem = (item) => {
    setTableData((current) =>
    current.filter((i) => i.item !== item)
  );
    setProducts((current) =>
    current.filter((i) => i.item !== item)
  );
  
  }

  useEffect(() => {

  }, [tableData])


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
            setPurchaseInfo((prevState) => {
              return {
                ...prevState,
                type: data,
              };
            });
          }}

          vendor = {(data) => {
            setPurchaseInfo((prevState) => {
              return {
                ...prevState,
                vendor: data,
              };
            });
          }}

          date = {(data) => {
            setPurchaseInfo((prevState) => {
              return {
                ...prevState,
                date: data,
              };
            });
          }}
          
          autoReset = {autoReset}/>

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
          }}
          item = {purchaseData.item}/>

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
            setTableData([...tableData, purchaseData])
            setProducts([...products, purchaseData])
            // alert("Item Added To The List!")
            setReset(true)
            setAutoReset(state => state + 1)
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
        
        {tableData?.length > 0 && <TheTable data = {tableData} 
        removeItem = {(item) => removeItem(item)}/>}
      
      </div>

    <CheckoutForm products = {products} data = {purchaseInfo}
    complete = {() => {
      setTableData([])
      setProducts([])
    }}/>

  

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
