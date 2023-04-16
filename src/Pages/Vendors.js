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
import { setCustomers } from "../redux/actions/customersActions";
import Transactions from "../containers/CustomerContainers/Transactions."
import Payment from "../containers/CustomerContainers/Payment";
import { setVendors } from "../redux/actions/vendorsActions";

const Vendors = () => {
  
  const dispatch = useDispatch();
  const [newVendors, setNewVendors] = useState(false);
  const [buttonName, setButtonName] = useState("Add New Vendors");
  const [update, setUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const statusArr = ["All", "Deen", "Clear"];
  const [status, setStatus] = useState(statusArr[0]);
  const [updatedVendor, setUpdatedVendor] = useState(null);
  const [del, setDel] = useState(1);
  const [showOrders, setShowOrders] = useState(false);
  const [showPayment, setShowPayment] = useState(false)
  const [vendorInfo, setVendorInfo] = useState();
  const [state, setState] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [instance, setInstance] = useState();
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  
  const columns = [
    { title: "ID", field: "vendorId" },
    { title: "Full Name", field: "name", width: "4%" },
    { title: "Phone Number", field: "phone" },
    { title: "Address", field: "district" },
    { title: "Balance", field: "balance" },
  ];
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "text", name: "phone" },
    { label: "Enter Address", type: "text", name: "district" },
  ];

  dispatch(
    setVendors(
      useFetch("vendors/vendors-with-transactions", del, "vendors")
    )
  );

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

  const vendors = useSelector((state) => state.vendors.vendors);

  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1);

  const addVendorHandler = () => {
    setQuery("");
    if (buttonName == "Add New Vendors") {
      setNewVendors(true);
      setButtonName("Go To Vendors");
      return;
    } else if (buttonName == "Go To Vendors") {
      setShowTransactions(false);
      setNewVendors(false);
      setButtonName("Add New Vendors");
      setUpdate(false);
    }
  };

  const handler = (data) => {
    if (data?.length > 0) {
      if (query == "") {
        return data.filter((std) => {
          if (status == "Deen") return std.balance > 0;
          else if (status == "Clear") return std.balance == 0;
          else return std.balance >= 0 || std.balance <= 0;
        });
      } else {
        return data.filter(
          (std) =>
            (status == "Deen"
              ? std.balance > 0
              : status == "Clear"
              ? std.balance == 0
              : std.balance >= 0 || std.balance <= 0) &&
            (std.name.toLowerCase().includes(query) ||
              std.phone.toLowerCase().includes(query))
        );
      }
    } else {
      return;
    }
  };

  const updateHandler = (vendor) => {
    setNewVendors(true);
    setButtonName("Go To Venodors");
    setUpdate(true);
    setUpdatedVendor(vendor);
  };

  const resetFomr = () => {
    setForce((state) => state + 1);
  };

  useEffect(() => {
    setState("Loading...");
  }, [force]);

  useEffect(() => {
    if (vendors?.length < 1) setState("No vendors found!");
  }, [vendors]);

  useEffect(() => {}, [del]);

  useEffect(() => {
    if (query != "" || status != "All") {
      setState("No matching vendors!");
    }
  }, [query, status]);

  const showOrdersHandler = (vendor) => {
    setShowOrders(true);
    setButtonName("Go To Vendors");
    setVendorInfo(vendor);
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
          {" "}
          {newVendors
            ? "Create New Vendors"
            : showOrders
            ? "Vendor Details"
            : showTransactions
            ? "Vendor Transactions"
            : "Vendors"}
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#5130DE",
            color: "white",
            height: "45px",
            fontWeight: "bold"
          }}
          onClick={() => {
            if (activeUser.privillages.includes("Add New Vendors"))
              addVendorHandler();
            else alert("You have no access!");
          }}
          startIcon={
            newVendors || showOrders || showTransactions ? (
              <BiArrowBack
                style={{
                  color: "white",
                }}
              />
            ) : (
              <MdAdd
                style={{
                  color: "white",
                }}
              />
            )
          }
        >
          {buttonName}
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
          <FormControl style={{ padding: "0px", margin: "0px" }}>
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
          </FormControl>
        </div>
      )}

      {showTransactions && <Transactions instance={instance} name="Vendor" />}
    {showPayment && <Payment instance={instance} 
    hideModal = {() => setShowPayment(false)}
    name = "vendor"  change={changeHandler}/>}
       {!showTransactions && <Table
          data={handler(vendors)}
          showTransactions={(instance) => {
            setShowTransactions(true);
            setInstance(instance);
            setButtonName("Go To Vendors");
          }}

          pay={(instance) => {
            setShowPayment(true);
            setInstance(instance);
          }}
          change={changeHandler}
          update={updateHandler}
          showOrders={(vendor) => showOrdersHandler(vendor)}
          state={state}
          columns={columns}
          url="vendors"
          name="Vendor"
        /> }
   
      {newVendors && (
        <Register
          update={update}
          instance={updatedVendor}
          reset={resetFomr}
          hideModal={() => {
            setUpdate(false);
            setNewVendors(false);
            changeHandler();
            setButtonName("Add New Vendors");
          }}
          fields={fields}
          url="vendors"
          name="Vendor"
          change={changeHandler}
        />
      )}
    </div>
  );
};

export default Vendors;
