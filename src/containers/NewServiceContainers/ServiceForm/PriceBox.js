import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PriceBox = (props) => {
  const products = useSelector((state) => state.products.products);

  const [unitPrice, setUnitPrice] = useState();
  const [quantity, setQuantity] = useState(props.quantityD);
  const [item, setItem] = useState("")

  useEffect(() => {
    if (props.reset) {
      setUnitPrice("");
      setQuantity("");
      setItem("")
    }
  }, [props.reset]);

  useEffect(() => {
    setUnitPrice(props.salePriceP);
    props.unitPrice(props.salePriceP);
    setItem(props.itemD)
    if (props.salePriceP || props.salePriceP == 0) {
      setQuantity(1);
      props.quantity(1);
    }
  }, [props.unitPriceD, props.item]);

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
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
          Product Name:
        </Typography>
        <input
          value={item}
          disabled = {true}
          type="text"
          style={{
            width: "160px",
            height: "38px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #6E6E6E",
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
          Quantity:
        </Typography>
        <input
          value={quantity}
          type="number"
          style={{
            width: "90px",
            height: "38px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #6E6E6E",
          }}
          onChange={(e) => {
            props.quantity(e.target.value);
            setQuantity(e.target.value);
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
            width: "90px",
            height: "38px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #6E6E6E",
          }}
          onChange={(e) => {
            props.unitPrice(e.target.value);
            setUnitPrice(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default PriceBox;
