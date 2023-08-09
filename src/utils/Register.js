import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, FormControl, MenuItem } from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai"
import Modal from "../Modal/Modal";
import { constants } from "../Helpers/constantsFile";
import { useSelector } from "react-redux";

const Register = (props) => {

  const types = ["Shaati", "Surwaal", "Qamiis", "Jaakad", "Futishaari"]
  const [type, setType] = useState("")

  const typeHandler = (e) => {
    setType(e.target.value)
  }

  const validate = (values) => {
    const errors = {};

     if (!values.name) {
       errors.name = "Field is Required";
     }
    //  if (!values.username) {
    //    errors.username = "Field is Required";
    //  }
     if (!values.phone) {
       errors.phone = "Field is Required";
     }
    //  if (!values.password) {
    //    errors.password = "Field is Required";
    //  }

    return errors;
  };

  const formik = useFormik({
    initialValues:{
        name: props.update ? props.instance.name : "",
        phone: props.update ? props.instance.phone : "",
        age: props.update ? props.instance.age : "",
        district: props.update ? props.instance.district : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (props.name == "User" ) values.passwordConfirm = values.password
      if (props.name == "Patient" ) values.patientId = 5
      if (props.update){
        axios.patch(`${constants.baseUrl}/${props.url}/${props.instance._id}`, values, {
          headers: {
            "authorization": constants.token
          }
        }).then((res) => {
          alert("Successfully Updated")
          resetForm();
          props.name != "Patient" && props.reset()
          props.hideModal(res.data?.data.customer)
          props.name == "Employee" && props.change()
        }).catch((err) => {
          alert(err.response?.data?.message);
        });
        props.reset()
      } else {
        
        axios.post(`${constants.baseUrl}/${props.url}`, values,
        {
          headers: {
            "authorization": constants.token
          }
        }).then((res) => {
          alert("Successfully Created")
          resetForm();
          // (props.name == "Customer" || props.name == "Vendor")&&props.reset()
          props.hideModal()
          props.change()
          console.log(res.data?.data?.customer)
          props.name == "Customer" && props.addCus(res.data?.data?.customer)
        }).catch((err) => {
          alert(err.response?.data?.message);
          // props.reset()
        });
        // props.change()
          // props.hideModal()
          // props.reset()
      }    
    
    },
  });

 
  return (
    <Modal onClose = {props.hideModal} pwidth = {props.name == "Expense" ?"630px" : "450px"}
    left = {props.name == "Expense" ? "32%" : "38%"} top = "18%">
       <div
        style={{
          display: "flex",
          width: "410px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          padding: "10px"
        }}
      >
        <h2>{props.update ? `${props.name} Update` : `${props.name} Creation`}</h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: props.name == "Expense" ? "row" : "column", alignItems: "center",
    flexWrap: props.name == "Expense" ? "wrap" : "nowrap" }}
      >
        {props.fields?.map((a, index) => (
          <div>
           <input
              autoComplete="off"
              variant="outlined"
              label={a.label}
              id={a.name}
              placeholder = {a.label}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "290px", color: "black", borderRadius: "8px",
              height: "50px", padding: "15px", border: "1.5px solid lightGray" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}

      {(props.name == "Styles" && !props.styleType) &&  <FormControl
              style={{
                padding: "0px",
                margin: "0px",
                width: "290px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                select
                style={{width: "100%", color: "black"}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Select a type"
                onChange={typeHandler}
              >
               {types?.map((type, index) => (
                  <MenuItem value={type} key={index}>
                    {type}
                  </MenuItem>
                ))
              }
              </TextField>

              
            </FormControl>}

        <Button
          style={{
            width: "290px",
            fontSize: "16px",
            backgroundColor: "#19274B",
            color: "white",
            marginLeft: props.name == "Expense" && "200px"
          }}
          type="submit"
          variant="contained"
        >
          {props.update ? `Update ${props.name}` : `Create ${props.name}`}
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default Register;
