import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "../Checkout/CheckoutForm";
import TheTable from "../TableItems/TheTable";
import AdditionalInfo from "./AdditionalInfo";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";

const SaleForm = (props) => {

  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [reset, setReset] = useState(false)
  const open = Boolean(anchorEl);
  const [autoReset, setAutoReset] = useState(1)

  const productsD = useSelector(state => state.products.products)


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

  const [saleData, setSaleData] = useState({
   item: null,
   unitPrice: null,
   quantity: null,
  });

  const [saleInfo, setSaleInfo] = useState({
    type: "cash",
    customer: null,
    date: null
  });

  
  let saleP = null
  productsD?.map(product => {
    if (product.name == saleData.item) saleP = product.salePrice
  })

  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);

  const removeItem = (item) => {
    console.log(item)
    setTableData((current) =>
    current.filter((i) => i.item !== item)
  );
    setProducts((current) =>
    current.filter((i) => i.item !== item)
  );
  setSaleData((prevState) => {
    return {
      ...prevState,
   item: null
    };
  });
  
  }

  useEffect(() => {
    if (saleData) setError(false)
  }, [tableData, saleData])


  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Selectors 
         reset = {reset}
         item = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                item: data,
              };
            });
          }} 
          
          type = {(data) => {
            setSaleInfo((prevState) => {
              return {
                ...prevState,
                type: data,
              };
            });
          }}

          customer = {(data) => {
            setSaleInfo((prevState) => {
              return {
                ...prevState,
                customer: data,
              };
            });
          }}

          date = {(data) => {
            setSaleInfo((prevState) => {
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
         salePriceP = {saleP}
         itemD = {saleData.item}
         total = {saleData?.unitPrice * saleData?.quantity}
         reset = {reset}
        unitPrice = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                unitPrice: parseFloat(data),
              };
            });
            setReset(false)
          }}
          
          
          quantity = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                quantity: parseInt(data),
              };
            });
            setReset(false)
          }}
          item = {saleData.item}/>

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
            if (!saleData.item || !saleData.unitPrice || !saleData.quantity 
             ) {
               return setError(true)
              }
            var exitLoop = false
            tableData?.map(dictum => {
              if (dictum.item == saleData.item) {
                exitLoop = true
              }
            })
            if (exitLoop) return alert("Item-ka aad gelisay horay ayuu ujiray!")
            setError(false)
            setDisable(true)
            props.tableData(saleData)
            setTableData([...tableData, saleData])
            setProducts([...products, saleData])
            // alert("Item Added To The List!")
            setReset(true)
            setAutoReset(state => state + 1)
            setSaleData((prevState) => {
              return {
                ...prevState,
                quantity: null,
                unitPrice: null,
                // item: null
              };
            });
            setDisable(false)
          }}
        >
          Add Item
        </Button>
    </div>

    {error && <p style = {{color: "red", marginLeft: "50px",
    fontSize: "16px", alignSelf: "center"}}> Please, enter 
    {!saleData.item && " item,"}
    {!saleData.quantity && " quantiy,"}
    {!saleData.unitPrice && " unitPrice,"} </p>}
        
        {tableData?.length > 0 && <TheTable data = {tableData} 
        removeItem = {(item) => removeItem(item)}/>}
      
      </div>

    <CheckoutForm products = {products} data = {saleInfo}
    complete = {() => {
      setTableData([])
      setProducts([])
      setSaleData((prevState) => {
        return {
          ...prevState,
          quantity: null,
          unitPrice: null,
          item: null
        };
      });

    }}/>

  

      </div>
    
    </div>
  );
};


export default SaleForm;
