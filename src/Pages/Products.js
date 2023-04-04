import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setEmployees } from "../redux/actions/employeesActions";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import { setCustomers, setProducts } from "../redux/actions/productsActions";
import NewProducts from "../containers/ProductContainers/NewProduct";
import { setProductTypes } from "../redux/actions/productTypesActions";
import { setCategory } from "../redux/actions/categoryActions";


const Products = () => {
  const [newCustomers, setNewCustomers] = useState(false);
  const [buttonName, setButtonName] = useState("Add New Customers");
  const [update, setUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const statusArr = ["All", "Deen", "Clear"];
  const [status, setStatus] = useState(statusArr[0]);
  const [updatedCustomer, setUpdatedCustomer] = useState(null);
  const [del, setDel] = useState(1);
  const [showOrders, setShowOrders] = useState(false);
  const [customerInfo, setCustomerInfo] = useState();
  const [state, setState] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [instance, setInstance] = useState();
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const columns = [
    { title: "Product Name", field: "name", width: "4%" },
    { title: "Quantity", field: "quantity" },
    { title: "Measurement", field: "unitMeasurment" },
    { title: "Category", field: "prodcutType", 
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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    customer
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeHandler = () => {
    setDel((state) => state + 1);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const products = useSelector((state) => state.products.products);

  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1);

  const addCustomerHandler = () => {
    setQuery("");
    if (buttonName == "Add New Customers") {
      setNewCustomers(true);
      return;
    } 
  };

  const handler = (data) => { 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.name.toString().toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  const updateHandler = (customer) => {
    setNewCustomers(true);
    setButtonName("Go To Customers");
    setUpdate(true);
    setUpdatedCustomer(customer);
  };

  const resetFomr = () => {
    setForce((state) => state + 1);
  };

  useEffect(() => {
    setState("Loading...");
  }, [force]);

  useEffect(() => {
    if (products?.length < 1) setState("No products found!");
  }, [products]);

  useEffect(() => {}, [del]);

  useEffect(() => {
    if (query != "" || status != "All") {
      setState("No matching products!");
    }
  }, [query, status]);

  const showOrdersHandler = (customer) => {
    setShowOrders(true);
    setButtonName("Go To Customers");
    setCustomerInfo(customer);
  };

  const hideModal = () => {};

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
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
        <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
          Products
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#4F32D2",
            height: "45px",
            fontSize: "13px",
            fontWeight: "bold",
            width: "250px",
            color: "white",
          }}
          onClick={() => {
            if (activeUser.privillages.includes("Add New Customers"))
              addCustomerHandler();
            else alert("You have no access!");
          }}
          startIcon={
            <MdAdd
                style={{
                  color: "white",
                }}
              />
          }
        >
          Add New Products
        </Button>
      </div>
      {!showOrders && !showTransactions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "20px",
            background: "white",
            width: "95.3%",
            margin: "auto",
            marginTop: "20px",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "400px",
              height: "40px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <FormControl style={{ padding: "0px", margin: "0px" }}>
            <Select
              style={{ height: "40px", color: "#B9B9B9", width: "172px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={statusHandler}
            >
              {statusArr.map((status, index) => (
                <MenuItem value={status} key={index}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </div>
      )}

      {!showOrders && !showTransactions && (
        <Table
          data={handler(products)}
          showTransactions={(instance) => {
            setShowTransactions(true);
            setInstance(instance);
            setButtonName("Go To Customers");
          }}
          change={changeHandler}
          update={updateHandler}
          showOrders={(customer) => showOrdersHandler(customer)}
          state={state}
          columns={columns}
          url="products"
          name="Product"
        />
      )}
      {newCustomers && (
       <NewProducts hideModal = { ()=> {
        setNewCustomers(false)

       }}  change={changeHandler} 
       update = {update}
       instance={updatedCustomer}/>
      )}
    </div>
  );
};

export default Products;
