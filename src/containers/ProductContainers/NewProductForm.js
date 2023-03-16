import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, FormControl, MenuItem } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../Modal/Modal";
import { constants } from "../../Helpers/constantsFile";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

const NewProductForm = (props) => {

  const [disable, setDisable] = useState(false)
  const productTypes = useSelector((state) => state.productTypes.productTypes);
  const [productType, setProductType] = useState(props.update ? 
    props.instance?.prodcutType?._id : "");

  console.log(props.update && props.instance?.category?._id)

  const productTypeHandler = (e) => {
    setProductType(e.target.value);
  };
  const categories = useSelector((state) => state.categories.categories);
  console.log(categories)
  const [category, setCategory] = useState(props.update ? 
    props.instance?.category.categoryName : "");

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Generic Name", type: "text", name: "genericName" },
    { label: "Enter Measurement", type: "text", name: "unitMeasurment" },
    { label: "Enter Pack Size", type: "text", name: "packSize" },
    { label: "Enter Re-order Number", type: "text", name: "reOrderNumber" },
  ];

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: props.update ? props.instance.name : "",
      unitMeasurment: props.update ? props.instance.unitMeasurment : "",
      genericName: props.update ? props.instance.genericName : "",
      packSize: props.update ? props.instance.packSize : "",
      reOrderNumber: props.update ? props.instance.reOrderNumber : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      setDisable(true)
      values.prodcutType = productType
      values.category = category
      // values.prodcutType = (props.update && productType == "" ) && props.instance?.prodcutType?._id
      // values.category = (props.update && category == "") && props.instance?.category?._id
      if (props.update) {
        axios
          .patch(`${constants.baseUrl}/products/${props.instance._id}`, values)
          .then((res) => {
            alert("Successfully Updated");
            setDisable(false)
            resetForm();
            // props.reset();
            props.hideModal();
           props.change();
          })
          .catch((err) => {
            alert(err.response?.data?.message);
            setDisable(false)
          });
        props.reset();
      } else {
        axios
          .post(
            `${constants.baseUrl}/products`, values
            // {
              // headers: {
              //   "authorization": constants.token
              // }
            // }
          )
          .then((res) => {
            alert("Successfully Created");
            setDisable(false)
            resetForm();
            props.hideModal();
            props.change()
          })
          .catch((err) => {
            alert(err.response?.data?.message);
            setDisable(false)
          });
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          gap: "24px",
          flexDirection: "row",
          width: "630px",
          flexWrap: "wrap",
        }}
      >
        {fields?.map((a, index) => (
          <div style={{}}>
            <TextField
              autoComplete="off"
              variant="outlined"
              label={a.label}
              id={a.name}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "280px", color: "black", borderRadius: "20px" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}

        <FormControl
          style={{
            padding: "0px",
            margin: "0px",
            width: "280px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            select
            style={{ width: "100%", color: "black" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productType._id}
            label="Select Product Type"
            onChange={productTypeHandler}
          >
            {productTypes?.map((productType, index) => (
              <MenuItem value={productType._id} key={index}>
                {productType.typeName}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        
        <FormControl
          style={{
            padding: "0px",
            margin: "0px",
            width: "280px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            select
            style={{ width: "100%", color: "black" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category._id}
            label="Select Category"
            onChange={categoryHandler}
          >
            {categories?.map((category, index) => (
              <MenuItem value={category._id} key={index}>
                {category.categoryName}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <Button
          disabled = {disable}
          style={{
            width: "281px",
            fontSize: "16px",
            backgroundColor: disable ? "lightgray" : "#5130DE",
            color: "white",
            height: "50px",
            fontWeight: "bold",
          }}
          type="submit"
          variant="contained"
        >
          {props.update ? `Update Product` : `Create Product`}
        </Button>
      </form>
    </div>
  );
};

export default NewProductForm;

