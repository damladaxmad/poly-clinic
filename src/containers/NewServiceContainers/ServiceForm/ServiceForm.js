import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "../Checkout/CheckoutForm";
import TheTable from "../TableItems/TheTable";
import AdditionalInfo from "./AdditionalInfo";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";

const ServiceForm = (props) => {

  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [reset, setReset] = useState(false)
  const open = Boolean(anchorEl);
  const [autoReset, setAutoReset] = useState(1)

  const servicesD = useSelector(state => state.serviceTypes.serviceTypes)


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

  const [serviceData, setServiceData] = useState({
   name: null,
   unitPrice: null,
   quantity: null,
  });

  const [serviceInfo, setServiceInfo] = useState({
    type: "cash",
    customer: null,
    date: null
  });

  
  let saleP = null
  servicesD?.map(service => {
    if (service.name == serviceData.name) saleP = service.price
  })

  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);

  const removeItem = (item) => {
    console.log(item)
    setTableData((current) =>
    current.filter((i) => i.name !== item)
  );
    setProducts((current) =>
    current.filter((i) => i.name !== item)
  );
  setServiceData((prevState) => {
    return {
      ...prevState,
   name: null
    };
  });
  
  }

  useEffect(() => {
    if (serviceData) setError(false)
  }, [tableData, serviceData])


  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Selectors 
         reset = {reset}
         item = {(data) => {
            setServiceData((prevState) => {
              return {
                ...prevState,
                name: data,
              };
            });
          }} 
          
          type = {(data) => {
            setServiceInfo((prevState) => {
              return {
                ...prevState,
                type: data,
              };
            });
          }}

          customer = {(data) => {
            setServiceInfo((prevState) => {
              return {
                ...prevState,
                customer: data,
              };
            });
          }}

          date = {(data) => {
            setServiceInfo((prevState) => {
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
         itemD = {serviceData.name}
         total = {serviceData?.unitPrice * serviceData?.quantity}
         reset = {reset}
        unitPrice = {(data) => {
            setServiceData((prevState) => {
              return {
                ...prevState,
                unitPrice: parseFloat(data),
              };
            });
            setReset(false)
          }}
          
          
          quantity = {(data) => {
            setServiceData((prevState) => {
              return {
                ...prevState,
                quantity: parseInt(data),
              };
            });
            setReset(false)
          }}
          item = {serviceData.name}/>

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
            if (!serviceData.name || !serviceData.unitPrice || !serviceData.quantity 
             ) {
               return setError(true)
              }
            var exitLoop = false
            tableData?.map(dictum => {
              if (dictum.name == serviceData.name) {
                exitLoop = true
              }
            })
            if (exitLoop) return alert("Item-ka aad gelisay horay ayuu ujiray!")
            setError(false)
            setDisable(true)
            props.tableData(serviceData)
            setTableData([...tableData, serviceData])
            setProducts([...products, serviceData])
            // alert("Item Added To The List!")
            setReset(true)
            setAutoReset(state => state + 1)
            setServiceData((prevState) => {
              return {
                ...prevState,
                quantity: null,
                unitPrice: null,
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
    {!serviceData.name && " item,"}
    {!serviceData.quantity && " quantiy,"}
    {!serviceData.unitPrice && " unitPrice,"} </p>}
        
        {tableData?.length > 0 && <TheTable data = {tableData} 
        removeItem = {(item) => removeItem(item)}/>}
      
      </div>

    <CheckoutForm products = {products} data = {serviceInfo}
    complete = {() => {
      setTableData([])
      setProducts([])
      setServiceData((prevState) => {
        return {
          ...prevState,
          quantity: null,
          unitPrice: null,
          name: null
        };
      });

    }}/>

  

      </div>
    
    </div>
  );
};


export default ServiceForm;
