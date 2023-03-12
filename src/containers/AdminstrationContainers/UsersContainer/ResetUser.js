import Modal from "../../../Modal/Modal";
import { Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import {TextField, Select} from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";

const ResetUser = (props) => {

  const arr = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter username", type: "text", name: "username" },
    { label: "Enter Phone", type: "number", name: "phone" },
    { label: "Enter Password", type: "password", name: "password" },
    { label: "Enter Fee", type: "number", name: "fee" },
  ];

  const validate = (values) => {
    const errors = {};
   
    if (!values.username) {
      errors.username = "Field is Required";
    }
  

    // if (!values.password) {
    //   errors.password = "Field is Required";
    // }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: props.user.username,
      password: "",
      name: `${props.user.name} `
    },
    validate,
    onSubmit: (values, { resetForm }) => {
        axios.patch(`${constants.baseUrl}/users/${props.user._id}`, values, 
         {
          headers: {
            'authorization': constants.token
            },
        }).then((res) => {
             alert("Successfully Updated")
             resetForm();
             props.hideModal();
             props.change()
        },
       ).catch((err) => {
          alert(err.response.data.message);
        });
       
    
    },
  });

 
  return (
    <Modal onClose = {props.hideModal} pwidth = "450px" top = "26%">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px"
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
            <TextField
              disabled = {a.name == "name" ? true : null}
              variant="outlined"
              label={a.label}
              id={a.name}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "290px", color: "black" }}
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
            background: "#19274B",
            color: "white",
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

export default ResetUser;
