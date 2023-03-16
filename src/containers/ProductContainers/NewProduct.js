import { Button, formatMs, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import MyModal from "../../Modal/Modal";
import React, { useState } from "react";
import { constants } from "../../Helpers/constantsFile";
import PriceBox from "../NewPurchaseContainers/PurchaseForm/PriceBox";
import NewProductForm from "./NewProductForm";

const NewProducts = (props) => {
  const [file, setFile] = useState();
  const [name, setName] = useState(props.update ? props.name : null);
  const [disabled, setDisabled] = useState(false);
  const formData = new FormData();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  if (file ) {
    formData.append("cover", file);
  }

  const addMenuHandler = () => {
    setDisabled(true);
    formData.append("name", `MENU ${name.toUpperCase()}`);
    if (props.update) {
      axios
        .patch(`${constants.baseUrl}/menus/${props.id}`, formData)
        .then((res) => {
          alert("Successfully Updated");
          props.hideModal();
          // props.change();
        })
        .catch((err) => {
          alert("Failed");
          setDisabled(false);
        });
    } else {
      axios
        .post(`${constants.baseUrl}/menus`, formData)
        .then((res) => {
          alert("Successfully Created");
          props.hideModal();
          props.change();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <MyModal onClose={() => props.hideModal()} pwidth = "650px"
    // pheight = "478px" 
    top = "17%" left = "32%">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
          width: "560px",
          padding: "15px",
        }}
      >
        <div style = {{display: "flex", width: "100%",
    }}>
     <Typography style = {{color: "#4F32D2", fontWeight: "bold", 
    fontSize: "24px", marginBottom: "10px"}}>
        {props.update ? "Update Product" : "Create Product"}
     </Typography>

        </div>

     <div style = {{display: "flex", width: "100%", 
    justifyContent: "space-between"}}>
        <NewProductForm hideModal = {() => {props.hideModal()}}
        change = {() => {props.change()}}
        update = {props.update} 
        instance = {props.instance}
        change = {()=> props.change()}/>
     </div>

        
      </div>
    </MyModal>
  );
};

export default NewProducts;