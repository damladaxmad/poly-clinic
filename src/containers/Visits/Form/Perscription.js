import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TheTable from "../TableItems/TheTable";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";
import MyModal from "../../../Modal/Modal";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";

const Perscription = (props) => {

  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [reset, setReset] = useState(false)
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
    medication: null,
    frequency: null,
    quantity: null,
    instruction: null
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

  console.log(tableData)

  const removeItem = (item) => {
    console.log(item)
    setTableData((current) =>
    current.filter((i) => i.item !== item.item)
  );
    setProducts((current) =>
    current.filter((i) => i.item !== item.item)
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

  const createMedicine = () => {
    axios.patch(`${constants.baseUrl}/visitors/${props.visitor}`, {
      prescription: tableData
    },
  {
    headers: {
      "authorization": constants.token
    }
  }
  ).then((res) => {
    alert("Succesfully Updated!")
    props.change(res?.data?.data?.visitor)
    console.log(res?.data?.data?.visitor)
    props.hideModal()
  }).catch((err) => {
    alert(err.response?.data?.message)
  })
  }


  return (

    <MyModal
      onClose={() => props.hideModal()}
      pwidth="720px"
    //   pheight = "478px"
      top="15%"
      left="28%"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "450px",
          overflowY: "scroll",
          alignItems: "center",
          gap: "15px",
          width: "700px",
          overflowX: "hidden",
          padding: "15px",
       
        }}
      >
    <div style={{ display: "flex", gap: "40px", flexDirection: "column",
  width: "100%" }}>
      <Selectors 
         reset = {reset}
         item = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                medication: data,
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

         medication = {(data) => {
          setSaleData((prevState) => {
            return {
              ...prevState,
              medication: data,
            };
          });
        }} 
         instruction = {(data) => {
          setSaleData((prevState) => {
            return {
              ...prevState,
              instruction: data,
            };
          });
        }} 
        
        frequency = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                frequency: data,
              };
            });
            setReset(false)
          }}
          
          
          quantity = {(data) => {
            setSaleData((prevState) => {
              return {
                ...prevState,
                quantity: data,
              };
            });
            setReset(false)
          }}
          item = {saleData.medication}/>

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
            if (!saleData.medication  || !saleData.quantity 
             ) {
               return setError(true)
              }
            // var exitLoop = false
            // tableData?.map(dictum => {
            //   if (dictum.item == saleData.item) {
            //     exitLoop = true
            //   }
            // })
            // if (exitLoop) return alert("Item-ka aad gelisay horay ayuu ujiray!")
            setError(false)
            setDisable(true)
            setTableData(saleData)
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


  
      </div>

      <Button
          style={{
            width: "190px",
            fontSize: "16px",
            height: "50px",
            backgroundColor: "#5130DE",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={()=> createMedicine()}
          type="submit"
          variant="contained"
        >
        cREATE
        </Button>
    
    </div>
    </div>
    </MyModal>
  );
};


export default Perscription;
