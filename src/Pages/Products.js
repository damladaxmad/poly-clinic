import React, { useState, useEffect, useReducer } from "react";
import { Button, TextField } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Autocomplete, Box, Select, Tab, Tabs, Typography } from "@mui/material";
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
import Stock from "../containers/ProductContainers/Stock";
import Dalab from "../containers/ProductContainers/Dalab/Dalab";
// import { TextField } from "@mui/material";


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
  const [value, setValue] = useState("products")

  const categories = ["INJECTION", "TAB", "SYRUP", "DROP", "CREAM", "SOLUTION", "SOUP", "GESAC", "INVENTORY", "GEL", "MALAP", "SUMPOSTRY", "HERBAL", "SHAMPOO", "LIPIN",]
  const [category, setCategory] = useState("")
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const columns = [
    { title: "Product Name", field: "name", width: "20%" },
    { title: "Quantity", field: "quantity" },
    { title: "Measurement", field: "unitMeasurment" },
    { title: "Size", field: "packSize" },
    { title: "Category", field: "category"},
    { title: "Cost", field: "salePrice", 
  render: (data) => <p> ${data.unitPrice}</p> },
    { title: "Price", field: "unitPrice", 
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

  console.log(category)

  const handler = (data) => { 
    if (data?.length > 0) {
      if (query == "") {
        return data.filter((std) => {
          if (category && std.category == category) return std
          if (!category) return std
        });
      } else {
      
        return data.filter((std) => {
          if (category && std.name.toLowerCase().includes(query.toLowerCase()) 
          && std.category == category) return std
          if (!category) return std.name.toLowerCase().includes(query.toLowerCase())
        });
    } 
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

  console.log(products)

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

<Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            
          {activeUser.privillages?.includes("Products") && <Tab
            disableFocusRipple = {true}
            disableRipple = {true}
            value="products" label="Products"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Products") && <Tab
            disableFocusRipple = {true}
            disableRipple = {true}
            value="stock" label="Stock"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Products") && <Tab
            disableFocusRipple = {true}
            disableRipple = {true}
            value="dalab" label="Dalab"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          </Tabs>
        </Box>
    
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
      {value == "products" && (
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
            marginTop: "30px",
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

          <Autocomplete
          id="country-select-demo"
          // key={`${props.autoReset}t`}
          onChange={(event, value) => setCategory(value)}
          sx={{ width: 200 }}
          options={categories}
          autoHighlight
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Category"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        </div>
      )}

      {value == "products" && (
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

      {value == "stock" && <Stock/>}
      {value == "dalab" && <Dalab/>}
    </div>
  );
};

export default Products;
