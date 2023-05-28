import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import MyModal from "../../Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import { setCustomers } from "../../redux/actions/customersActions";
import useFetch from "../../funcrions/DataFetchers";
import { setVendors } from "../../redux/actions/vendorsActions";

const Payment = (props) => {

  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [disabled, setDisabled] = useState(false)
  const [ok, setOk] = useState("")
  const [usernameOrPasswordError, setUsernameOrPasswordError] = useState('')
  const arr = [
    { label: "Enter Amount", type: "number", name: "credit" },
  ];

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px"}

  const dispatch = useDispatch()

  useEffect( () => {
    const fetchData = () => {
      if (true) {
        axios.get(`${constants.baseUrl}/customers/customers-with-transactions`, {
          headers: {
            "authorization": constants.token
          }
        }).then(res => {
          alert("Fetched it!")
          setCustomers(res.data?.data?.customers)
        }).catch(err => {
          alert(err.response?.data?.message)
        })
      }
    }

    fetchData()
   
  }, [ok])
  // dispatch(
  //   setCustomers(
  //     useFetch("customers/customers-with-transactions", ok, "customers")
  //   )
  // );

  // dispatch(
  //   setVendors(
  //     useFetch("vendors/vendors-with-transactions", ok, "vendors")
  //   )
  // );


  const validate = (values) => {
    const errors = {};

    if (!values.credit) {
      errors.credit = "Field is Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      credit: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) =>  {
      values.transactionType = "Payment"
      values[props.name] = props.instance._id
      values.user = activeUser.name
      setDisabled(true)

      const res = await axios.post(`${constants.baseUrl}/transactions`, values,
      {
        headers: {
          "authorization": constants.token
        }
      }).then(()=> {
        setOk("ok")
        props.hideModal()
        alert("Succesfully Paid")
        setDisabled(false)
        props.change()
      }
      ).catch((err)=> {
        props.hideModal()
        alert(err.response.data.message);
        setDisabled(false)
      }
      )
    },
  });

  return (
    <MyModal onClose = {props.hideModal} width = "300px">
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", gap: "16px", flexWrap: "wrap",
      justifyContent: "center", flexDirection: "column", width: "380px",
      padding:"20px 0px",
      alignItems: "center"
     }}
    >
      {arr.map((a, index) => (
        <div>
          <input
            placeholder={a.label}
            id={a.name}
            name={a.name}
            type={a.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[a.name]}
            style={{
              width: "290px",
              height: "50px",
              padding: "15px",
              fontSize: "16px",
              border: "1px solid grey",
              borderRadius: "6px",
            }}
            key={index}
          />
          {formik.touched[a.name] && formik.errors[a.name] ? (
            <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
          ) : null}
        </div>
      ))}

      <button
        disabled = {disabled}
        style={{
          width: "290px",
          fontSize: "20px",
          backgroundColor: disabled ? "lightgrey" : "#2F49D1",
          fontWeight: "600",
          color: "white",
          height: "45px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        type="submit"
      >
        {" "}
        Pay
      </button>
    
    </form>
    </MyModal>
  );
};

export default Payment;
