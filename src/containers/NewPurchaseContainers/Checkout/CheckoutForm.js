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
    axios.post(`${constants.baseUrl}/purchases`, {
      products: props.products,
      date: props.data[0]?.date,
      refNumber: props.data[0]?.refNumber,
      paymentType: "cash",
      discount: discount
    }).then((res) => {
      alert("Succesfully created purchase!")
      setDisable(false)
      props.complete()
    }).catch((err) => {
      alert(err.response?.data?.message)
      setDisable(false)
    })
  }

    return (
      <div style = {{width: "260px",  background: "#F6F6F6", 
      marginTop: "28px", borderRadius: "8px", border: "1px solid #6E6E6E",
      flexDirection: "column", display: "flex", alignItems: "center",
      padding: "20px", gap: "15px"}}>


        <Typography style = {{fontWeight: "bold", fontSize: "18px", 
      marginBottom: "8px"}}>
          Checkout Form
        </Typography>
         

        <input
          type="text"
          placeholder="#Invoice Number"
          style={{
            width: "200px",
            height: "45px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid black",
          }}
          onChange={(e) => setDiscount(e.target.value)}
        />



        <input
          value = {`$${total - discount}`}
          type="number"
          placeholder="Enter Discount"
          style={{
            width: "200px",
            height: "45px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid black",
          }}
          // onChange={(e) => setName(e.target.value)}
        />
            

            <input
          value={`$${total}`}
          type="text"
          disabled = {true}
          style={{
            width: "200px",
            height: "45px",
            padding: "14px",
            fontWeight: 'bold',
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid black",
          }}
        />


            <Button
            disabled = {disable}
          style={{
            width: "200px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            background: disable ? "lightGray" : "#4421DE",
            height: "45px",
            color: "white",
          }}
          variant="contained"
          onClick = {completeHandler}
        >
         Complete
        </Button>
        </div>
    )
}

export default CheckoutForm