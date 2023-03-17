import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { constants } from "../../../Helpers/constantsFile";


const CheckoutForm = (props) => {

  const [discount, setDiscount] = useState(0)
  const [disable, setDisable] = useState(false)

  let total = 0
  props.products?.map(product => {
    total += product.unitPrice * product.quantity
  })

  console.log(`this is the total: ${total}`)

  const completeHandler = () => {
    if (props.products?.length < 1) return alert("Add items to the list!")
    setDisable(true)
    axios.post(`${constants.baseUrl}/sales`, {
      products: props.products,
      date: props.data[0]?.date,
      refNumber: props.data[0]?.refNumber,
      paymentType: "cash",
      discount: discount
    }).then((res) => {
      alert("Succesfully created sale!")
      props.complete()
      setDisable(false)
    }).catch((err) => {
      alert(err.response?.data?.message)
      setDisable(false)
    })
  }

    return (
        <div
        style={{
            width: "98%",
            background: "white",
            boxShadow: "inset 2px 2px 4px 0 rgba(0, 0, 0, 0.2)",
            height: "120px",
            borderRadius: "10px",
            padding: "10px 40px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "50px",
          }}>
            <div style = {{display: "flex", gap: "45px"}}>
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
          value={`$${total}`}
          type="text"
          disabled = {true}
          style={{
            width: "150px",
            height: "40px",
            padding: "10px",
            fontWeight: 'bold',
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid black",
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
          Discount:
        </Typography>
        <input
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
          onChange={(e) => setDiscount(e.target.value)}
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
          Grand Total:
        </Typography>
        <input
          value = {`$${total - discount}`}
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
          // onChange={(e) => setName(e.target.value)}
        />
      </div>
            </div>


            <Button
            disabled = {disable}
          style={{
            width: "200px",
            fontSize: "16px",
            fontWeight: "bold",
            background: disable ? "lightGray" : "#4421DE",
            height: "50px",
            color: "white",
            marginTop: "20px",
          }}
          type="submit"
          variant="contained"
          onClick = {completeHandler}
        >
         Complete
        </Button>
        </div>
    )
}

export default CheckoutForm