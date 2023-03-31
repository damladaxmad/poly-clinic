import Modal from "../../Modal/Modal";
import { Button, Divider  } from "@material-ui/core";
import {TextField, Select} from "@mui/material"
import React, { useState } from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";

const EditProfile = (props) => {

  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter username", type: "text", name: "username" },
    { label: "New Password", type: "password", name: "password" },
  ];
  
  const isPreviousValid = (password) => {
    if (props.user.password == password) return true
    return false
  }

  const validate = (values) => {
    const errors = {};
   
    if (!values.username) {
      errors.username = "Field is Required";
    }

    if (!values.password) {
      errors.password = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: props.user.username,
      password: "",
      name: `${props.user.name} `,
      previous: ""
    },
    validate,
    onSubmit: (values, { resetForm }) => {
        axios.patch(`${constants.baseUrl}/users/${props.user._id}`, values).then((res) => {
             alert("Successfully Updated")
        }).catch((err)=> {
          alert(err.response.data.message);
        });
        resetForm();
        props.hideModal();  
        alert(`${props.employee.first_name} ${props.employee.middle_name} is made a user`)
    
    },
  });

 
  return (
    <Modal onClose = {()=> props.hideModal() } pwidth = "450px" top = "26%">
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
        <h2>Reset User </h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "column", alignItems: "center" }}
      >
        {arr.map((a, index) => (
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
  

        <Button
          style={{
            width: "290px",
            fontSize: "16px",
            backgroundColor: "#19274B",
            color: "white",
            fontWeight: "bold"
          }}
          type="submit"
          variant="contained"
        >
          Reset User
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default EditProfile;
