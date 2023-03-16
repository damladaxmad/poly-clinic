import { Typography } from "@material-ui/core";
import React, { useState, useEffect, useReducer } from "react";
import Types from "../containers/Categories/Types";
import Category from "../containers/Categories/Category";


const Categories = () => {
  

  const columns = [
    { title: "Product Name", field: "name", width: "4%" },
    { title: "Quantity", field: "quantity" },
    { title: "Measurement", field: "unitMeasurment" },
    { title: "Product Type", field: "category", 
  render: (data) => <p> {data?.prodcutType.typeName}</p> },
    { title: "Unit Price", field: "unitPrice", 
  render: (data) => <p> ${data.unitPrice}</p> },
    { title: "Sale Price", field: "salePrice", 
  render: (data) => <p> ${data.salePrice}</p> },
   
  ];

  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "text", name: "phone" },
  ];

//   const handleClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     customer
//   ) => {
//     setAnchorEl(event.currentTarget);
//   };


//   const dispatch = useDispatch();
//   dispatch(
//     setProducts(
//       useFetch("products", del, "products")
//     )
//   );

  const handler = (data) => { 
    if (data?.length > 0) {
      return data
    } else {
      return
    }  
  };


//   useEffect(() => {
//     if (products?.length < 1) setState("No products found!");
//   }, [products]);



  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EFF0F6",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "space-between",
        //   alignItems: "center",
        gap:"30px",
          width: "95%",
          margin: "auto",
        }}
      >
        <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
        Types & Categories
        </Typography>

        <div
        style={{
          width: "98%",
          background: "white",
        //   height: "480px",
          borderRadius: "10px",
          padding: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: "50px",
        }}
      >
        <Category/>
        <Types/>

        </div>

      </div>
      </div>
  );
};

export default Categories;
