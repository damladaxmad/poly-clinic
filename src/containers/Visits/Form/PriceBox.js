import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PriceBox = (props) => {
  const products = useSelector((state) => state.products.products);

  const [unitPrice, setUnitPrice] = useState();
  const [quantity, setQuantity] = useState(props.quantityD);
  const [item, setItem] = useState("")
  const [instruction, setInstruction] = useState("")
  const [frequency, setFrequency] = useState("")

  useEffect(() => {
    if (props.reset) {
      setFrequency("");
      setQuantity("");
      setItem("")
      setInstruction("")
    }
  }, [props.reset]);

  useEffect(() => {
    setUnitPrice(props.salePriceP);
    // props.unitPrice(props.salePriceP);
    // setItem(props.itemD)
    if (props.salePriceP || props.salePriceP == 0) {
      setQuantity(1);
      props.quantity(1);
    }
  }, [props.unitPriceD]);

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        width: "500px",
        flexDirection: "row",
        flexWrap: "wrap",
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
          Medication:
        </Typography>
        <input
          value={props.item}
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
          onChange={(e) => {
            props.medication(e.target.value);
            setItem(e.target.value);
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
          type="text"
          style={{
            width: "130px",
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
          Frequency:
        </Typography>
        <input
          value={frequency}
          type="text"
          style={{
            width: "130px",
            height: "38px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #6E6E6E",
          }}
          onChange={(e) => {
            props.frequency(e.target.value);
            setFrequency(e.target.value);
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
         Instruction:
        </Typography>
        <input
          value={instruction}
          type="text"
          style={{
            width: "250px",
            height: "38px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #6E6E6E",
          }}
          onChange={(e) => {
            props.instruction(e.target.value);
            setInstruction(e.target.value);
          }}
        />
      </div>

     
    </div>
  );
};

export default PriceBox;
