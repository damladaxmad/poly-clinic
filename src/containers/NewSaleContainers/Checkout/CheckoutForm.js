import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { constants } from "../../../Helpers/constantsFile";
import { useDispatch, useSelector } from "react-redux";
import { addSale } from "../../../redux/actions/salesActions";


const CheckoutForm = (props) => {

  const [discount, setDiscount] = useState(0)
  const [disable, setDisable] = useState(false)
  const [date, setDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const activeUser = useSelector(state => state.activeUser.activeUser)

  let total = 0
  props.products?.map(product => {
    total += product.unitPrice * product.quantity
  })

  const dispatch = useDispatch()


  const completeHandler = () => {

    if (props.products?.length < 1) return alert("Add items to the list!")
    if (!props.data?.type) return alert("Please Enter Type")
    
    setDisable(true)
    axios.post(`${constants.baseUrl}/sales`, {
      products: props.products,
      date: date,
      paymentType: props.data?.type,
      discount: discount,
      user: activeUser?.name,
      customer: props.data?.type == "invoice" ? props.data?.customer : null
    },
    {
      headers: {
        "authorization": constants.token
      }
    }).then((res) => {
      alert("Succesfully created sale!")
      setDisable(false)
      props.complete()
      setDiscount("")
      dispatch(addSale(res.data?.data?.createdSale))
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
          type="date"
          value= {moment(new Date(date)).format("YYYY-MM-DD")}
          style={{
            width: "200px",
            height: "45px",
            padding: "10px",
            fontSize: "14px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid black",
          }}
          onChange={(e) => setDate(e.target.value)}
        />



        <input
          type="number"
          value = {discount}
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
          onChange={(e) => {
            if (parseFloat(e.target.value) > parseFloat(total)) return alert("Discount-ka kama badan karo total-ka")
            setDiscount(e.target.value)
          }}
        />
            

            <input
          value={`$${total - discount}`}
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