import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const PriceBox = (props) => {
  const [unitPrice, setUnitPrice] = useState()
  const [quantity, setQuantity] = useState()

  useEffect(()=> {
    if (props.reset) {
      setUnitPrice("")
      setQuantity("")
    }
  }, [props.reset])

  return (
    <div
      style={{
        width: "45%",
        height: "240px",
        borderRadius: "10px",
        border: "2px solid #C9C7C7",
        background: "#F6F6F6",
        padding: "25px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
        {" "}
        Unit Price:
      </Typography>
      <input
        value={unitPrice}
        type="number"
        style={{
          width: "150px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
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
      <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
        {" "}
        Sale Price:
      </Typography>
      <input
        // value={name}
        disabled = {true}
        type="number"
        style={{
          width: "150px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
        }}
        onChange={(e) => props.salePrice(e.target.value)}
      />
    </div>



    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
        {" "}
        Quantity:
      </Typography>
      <input
        value={quantity}
        style={{
          width: "150px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
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
      <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
        {" "}
        Total:
      </Typography>
      <input
        value={`$${props.total}`}
        disabled = {true}
        type="text"
        style={{
          width: "150px",
          fontWeight: "bold",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
        }}
        // onChange={(e) => props.quantity(e.target.value)}
      />
    </div>


    </div>
  );
};



export default PriceBox;
