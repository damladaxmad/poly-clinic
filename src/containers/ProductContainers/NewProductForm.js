import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, FormControl, MenuItem } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../Modal/Modal";
import { constants } from "../../Helpers/constantsFile";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { addProduct, deleteProduct, setProducts, updateProduct } from "../../redux/actions/productsActions";

const NewProductForm = (props) => {

  const [disable, setDisable] = useState(false)
  const productTypes = ["INJECTION", "TAB", "SYRUP", "DROP", "CREAM", "SOLUTION", "SOUP", "GESAC", "INVENTORY", "GEL", "MALAP", "SUMPOSTRY", "HERBAL", "SHAMPOO", "LIPIN",]
  const [productType, setProductType] = useState(props.update ? 
    props.instance?.prodcutType?._id : "");

  console.log(props.update && props.instance?.category?._id)

  const productTypeHandler = (e) => {
    setProductType(e.target.value);
  };
  const measurements = ["PIECES", "STRIP"]
  const [measurement, setMeasurement] = useState(measurements[0]);
  const categories = useSelector(state => state.categories.categories)

  const [category, setCategory] = useState(categories[0]?._id)

  const measurementHandler = (e) => {
    setMeasurement(e.target.value);
  };

  const dispatch = useDispatch()

  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Quantity", type: "text", name: "quantity" },
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
      quantity: props.update ? props.instance.quantity : "",
      packSize: props.update ? props.instance.packSize : "",
      reOrderNumber: props.update ? props.instance.reOrderNumber : "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      setDisable(true)
      values.category = productType
      values.unitMeasurment = measurement
      // values.prodcutType = (props.update && productType == "" ) && props.instance?.prodcutType?._id
      // values.category = (props.update && category == "") && props.instance?.category?._id
      if (props.update) {
        axios
          .patch(`${constants.baseUrl}/products/${props.instance._id}`, values, {
            headers: {
              "authorization": constants.token
            }
          })
          .then((res) => {
            alert("Successfully Updated");
            setDisable(false)
            resetForm();
            // props.reset();
            props.hideModal();
           props.change();
           console.log(res.data?.data)
           dispatch(
            deleteProduct(res.data?.data?.product)
          );
           dispatch(
            addProduct(res.data?.data?.product)
          );
          })
          .catch((err) => {
            alert(err.response?.data?.message);
            setDisable(false)
          });
        props.reset();
      } else {
        axios
          .post(
            `${constants.baseUrl}/products`, values, {
              headers: {
                "authorization": constants.token
              }
            }
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
            console.log(res.data?.data?.createdProduct)
            dispatch(
              addProduct(res.data?.data?.createdProduct)
            );
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
              style={{ width: "280px", color: "black", borderRadius: "8px",
              height: "55px", padding: "15px", border: "1.5px solid lightGray" }}
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
            value={measurement}
            label="Select Measurement"
            onChange={measurementHandler}
          >
            {measurements?.map((measurement, index) => (
              <MenuItem value={measurement} key={index}>
                {measurement}
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
            style={{ width: "100%", color: "black",  }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productType}
            label="Select Category"
            onChange={productTypeHandler}
          >
            {productTypes?.map((productType, index) => (
              <MenuItem value={productType} key={index}>
                {productType}
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

