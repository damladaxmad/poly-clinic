import React, { useState, useEffect, useReducer } from "react";
import { Button, TextField } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setEmployees } from "../redux/actions/employeesActions";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import { addCustomer, deleteCustomer, setCustomers } from "../redux/actions/customersActions";
import Transactions from "../containers/CustomerContainers/Transactions."
import Payment from "../containers/CustomerContainers/Payment";
import VisitDetail from "../containers/Visits/VisitDetail";
import VisitTable from "../containers/Visits/VisitTable";
import VisitPopUp from "../containers/Visits/VisitPopUp";
import moment from "moment";
import { setVisitors } from "../redux/actions/vistorsActions";

const Visits = () => {

  const dispatch = useDispatch();
  const [newCustomers, setNewCustomers] = useState(false);
  const [buttonName, setButtonName] = useState("Add New Visits");
  const [update, setUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const statusArr = ["All", "Deen", "Clear"];
  const [status, setStatus] = useState(statusArr[0]);
  const [updatedCustomer, setUpdatedCustomer] = useState(null);
  const [del, setDel] = useState(1);
  const [showOrders, setShowOrders] = useState(false);
  const [showPayment, setShowPayment] = useState(false)
  const [customerInfo, setCustomerInfo] = useState();
  const [state, setState] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [instance, setInstance] = useState();
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const columns = [
    // { title: "ID", field: "customerId" },
    { title: "Patient Name", field: "name", width: "24%",
  render: (data) => <p>{data?.patient?.name}</p> },
    { title: "Visit Date", field: "date", render: (data) => <p> 
      {moment(data?.date).format("YYYY-MM-DD")}
    </p> },
    { title: "Phone Number", field: "phone",
    render: (data) => <p>{data?.patient?.phone}</p> },
    { title: "Age", field: "age",
    render: (data) => <p>{data?.patient?.age}</p> },
    { title: "Address", field: "district",
    render: (data) => <p>{data?.patient?.district}</p> },
  ];
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "text", name: "phone" },
    { label: "Enter Address", type: "text", name: "district" },
  ];


  useEffect(() => {
    setState("Loading...");
  }, [del]);


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
    // setDel((state) => state + 1);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const customers = useSelector((state) => state.customers.customers);
  
  const visits = useSelector(state => state.visitors.visitors)
  console.log(visits)

  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1);
  const [showVisitDetails, setShowVisitDetails] = useState(false)
  const [visitDetails, setVisitDetails] = useState()
  const [showPopUp, setShowPopUp] = useState(false)
  const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))

  const addCustomerHandler = () => {
    setQuery("");
    if (buttonName == "Add New Visits") {
      // setNewCustomers(true);
      // setButtonName("Go To Visits");
      setShowPopUp(true)
      return;
    } else if (buttonName == "Go To Visits") {
      setShowVisitDetails(false)
      setShowOrders(false);
      setShowTransactions(false);
      setNewCustomers(false);
      setButtonName("Add New Visits");
      setUpdate(false);
    }
  };

  const handler = (data) => {
    console.log(data)
    if (data?.length > 0) {
        return data.filter((std) =>
            (std.patient?.name?.toLowerCase().includes(query) )
        );

    } else {
      return;
    }
  };

  const updateHandler = (customer) => {
    setNewCustomers(true);
    setButtonName("Go To Visits");
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
    if (customers?.length < 1) setState("No visits found!");
  }, [customers]);

  useEffect(() => {}, [del]);

  useEffect(() => {
    if (query != "" || status != "All") {
      setState("No matching visits!");
    }
  }, [query, status]);

  const showOrdersHandler = (customer) => {
    setShowOrders(true);
    setButtonName("Go To Visits");
    setCustomerInfo(customer);
  };

  const hideModal = () => {};

  const addCus = (customer) => {
    dispatch(
      addCustomer(customer)
    )
    setDel(state => state + 1)
  } 

  dispatch(
    setVisitors(
      useFetch(`visitors/get-visitors-with-tests/${startDate}/${endDate}`, del, "visitors")
    )
  );

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
          {newCustomers
            ? "Create New Visits"
            : showVisitDetails
            ? "Visit Details"
            : showTransactions
            ? "Visit Transactions"
            : "Visits"}
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
            if (activeUser.privillages.includes("Visits"))
              addCustomerHandler();
            else alert("You have no access!");
          }}
          startIcon={
            newCustomers || showVisitDetails ? (
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
      {!showVisitDetails && (
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
          <div style = {{width: "40%", display: "flex", gap: "20px"}}>
      <TextField
            variant="outlined"
            type="date"
            label = "Start Date"
            value= {moment(new Date(startDate)).format("YYYY-MM-DD")}
            style={{ width: "50%", background: "white" }}
            onChange={(e) => {
                setStartDate(e.target.value)
                // setView(state => state + 1)
            }}
          />
          <TextField
             variant="outlined"
            type="date"
            label = "End Date"
            value= {moment(new Date(endDate)).format("YYYY-MM-DD")}
            placeholder="Search"
            style={{ width: "50%", background: "white" }}
            onChange={(e) => {
                setEndDate(e.target.value)
                // setView(state => state + 1)
            }}
          />


          </div>
        </div>
      )}

      {showTransactions && <Transactions instance={instance} name="Visits" />}
    {showPayment && <Payment instance={instance} 
    hideModal = {() => setShowPayment(false)} name = "visit"
    change={changeHandler}/>}

       {!showVisitDetails && <VisitTable
          showVisitDetails = {(data) => {
            setButtonName("Go To Visits");
            setShowVisitDetails(true)
            setVisitDetails(data)
          }}
          data={handler(visits)}
          state={state}
          columns={columns}
        /> }

        {showVisitDetails && <VisitDetail data = {visitDetails}
        change = {(data) => {
          setDel(state => state + 1)
          setVisitDetails(data)
        }}
        newChange = {() => {
          setDel(state => state + 1)
        }}/>}

        {showPopUp && <VisitPopUp 
          hideModal =  {() => {
            setShowPopUp(false)
            setDel(state => state + 1)
          }}
        />}
   
      {newCustomers && (
        <Register
          update={update}
          instance={updatedCustomer}
          reset={resetFomr}
          hideModal={(data) => {
            setUpdate(false);
            !update && setNewCustomers(false);
            update && dispatch(deleteCustomer(data))
            update && dispatch(addCustomer(data))
            changeHandler();
            setButtonName("Add New Visits");
          }}
          fields={fields}
          url="visits"
          name="Visit"
          change={() => changeHandler()}
          addCus = {(customer) => addCus(customer)}
        />
      )}
    </div>
  );
};

export default Visits;
