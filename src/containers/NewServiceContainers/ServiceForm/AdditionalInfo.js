import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdditionalInfo = (props) => {
  const products = useSelector(state => state.products.products)
  let remaining = 0
  products?.map(product => {
    if (product.name == props.item) remaining = product.quantity
  })

  // useEffect( () => {

  // }, [remaining])

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
        Remaining:
      </Typography>
      <input
        value={remaining}
        disabled = {true}
        type="text"
        style={{
          width: "150px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
        }}
        // onChange={(e) => props.unitPrice(e.target.value)}
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
        Invoice Number:
      </Typography>
      <input
        // value={name}
        type="text"
        style={{
          width: "150px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
        }}
        onChange={(e) => props.refNumber(e.target.value)}
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
        Purchase Date:
      </Typography>
      <input
        type="date"
        style={{
          width: "150px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
      
        }}
        onChange={(e) => props.date(e.target.value)}
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
        Expiry Date:
      </Typography>
      <input
        // value={name}
        type="date"
        style={{
          width: "150px",
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



export default AdditionalInfo;
