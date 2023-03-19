import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const PriceBox = (props) => {

  const [unitPrice, setUnitPrice] = useState()
  const [salePrice, setSalePrice] = useState()
  const [quantity, setQuantity] = useState()

  useEffect(()=> {
    if (props.reset) {
      setUnitPrice("")
      setSalePrice("")
      setQuantity("")
    }
  }, [props.reset])

  return (
    <div
      style={{
      display: "flex", gap: "30px"
      }}
    >

<div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "13px" }}>
        {" "}
        Quantity:
      </Typography>
      <input
        value={quantity}
        type="number"
        style={{
          width: "110px",
          height: "38px",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid #6E6E6E",
        }}
        onChange={(e) => {
          props.quantity(e.target.value)
          setQuantity(e.target.value)
        }}
      />
    </div>

      <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "13px" }}>
        {" "}
        Unit Price:
      </Typography>
      <input
        value={unitPrice}
        type="number"
        style={{
          width: "110px",
          height: "38px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid #6E6E6E",
        }}
        onChange={(e) => {
          props.unitPrice(e.target.value)
          setUnitPrice(e.target.value)
        }}
      />
    </div>


    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "13px" }}>
        {" "}
        Sale Price:
      </Typography>
      <input
        value={salePrice}
        type="number"
        style={{
          width: "110px",
          height: "38px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid #6E6E6E",
        }}
        onChange={(e) => {
          props.salePrice(e.target.value)
          setSalePrice(e.target.value)
        }}
      />
    </div>



 


    </div>
  );
};



export default PriceBox;
