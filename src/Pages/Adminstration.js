import React, { useState, useEffect, useReducer } from "react"
import {Tabs, Tab, Box} from "@mui/material"
import Users from "../containers/AdminstrationContainers/UsersContainer/Users"
import Access from "../containers/AdminstrationContainers/AccessContainers/Access";
import { useDispatch, useSelector } from "react-redux";
import CompanyInfo from "../containers/AdminstrationContainers/CompanyInfoContainer/CompanyInfo";
import ImportProducts from "../containers/AdminstrationContainers/ImportContainers/ImportProducts";
import { Button } from "@material-ui/core";
import Register from "../utils/Register";
import {MdAdd} from "react-icons/md"
import { setUsers } from "../redux/actions/usersActions";
import useFetch from "../funcrions/DataFetchers";
import {BiArrowBack} from "react-icons/bi"
import Transactions from "../containers/AdminstrationContainers/UsersContainer/Transactions"
import UsersCustomers from "../containers/AdminstrationContainers/UsersContainer/UsersCustomers";
import UsersVendors from "../containers/AdminstrationContainers/UsersContainer/UserVendors";

const Adminstration = () => {

  const fields  = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter username", type: "text", name: "username" },
    { label: "Enter phone", type: "number", name: "phone" },
    { label: "Enter Password", type: "password", name: "password" },
    { label: "Enter Fee", type: "number", name: "fee" },
  ];

  const statusArr = ["All", "Active", "Inactive"]
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const [value, setValue] = React.useState("users");
  const [newUser, setNewUser] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false)
  const [showVendors, setShowVendors] = useState(false)
  const [instance, setInstance] = useState();
  const [buttonName, setButtonName] = useState("Add New Users");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };



  const addHandler = () => {
    if (buttonName == "Add New Users") {
      setNewUser(true)
      setButtonName("Go To Users");
      setShowTransactions(false);
      setShowCustomers(false)
      return;
    } else if (buttonName == "Go To Users") {
      setShowTransactions(false);
      setShowCustomers(false);
      setShowVendors(false);
      setButtonName("Add New Users");
    }
  };

  const [change, setChange] = useState(1)
  const [myChange, setMyChange] = useState(1)

  const changeHandler = () => {
    setChange(state => state + 1)
  }

  const dispatch = useDispatch()
  dispatch(setUsers(useFetch("users/users-with-transactions", change, "users")))
  
  useEffect(() => {
    console.log(`chang is happening ${change}`)
  })
  
  return (
    <div
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      margin: "0px auto",
      gap: "0px",
      flexDirection: "column",
    }}
  >
    <div style = {{display: "flex", width: "95%", margin: "auto",
  justifyContent: "space-between"}}>
     <Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple = {true}
          >
            
       
          {activeUser.privillages?.includes("Users") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="users" label="Users"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Access") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="access" label="Access"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>
        {value == "users" && 
         <Button
         variant="contained"
         style={{
           backgroundColor: "#19274B",
           color: "white",
           width: "220px",
           fontWeight: "bold"
         }}
         onClick={() => {
           if (activeUser.privillages.includes("Add New Users"))
             addHandler();
           else alert("You have no access!");
         }}
         startIcon={
           newUser || showTransactions || showCustomers || showVendors ? (
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
        }

        </div>
        {showTransactions && <Transactions instance={instance} name="customer" />}
        {showCustomers && <UsersCustomers instance={instance} name="customer"/>}
        {showVendors && <UsersVendors instance={instance} name="vendor"/>}

    {(value == "users" && !showTransactions && !showCustomers && !showVendors) && <Users key = {change}

    showTransactions={(instance) => {
      setShowTransactions(true);
      setInstance(instance);
      setButtonName("Go To Users");
    }}

    showCustomers={(instance) => {
      setShowCustomers(true);
      setInstance(instance);
      setButtonName("Go To Users");
    }}

    showVendors={(instance) => {
      setShowVendors(true);
      setInstance(instance);
      setButtonName("Go To Users");
    }}
    />}
          
    {value == "access" && <Access/>}

    {newUser && (
        <Register
          hideModal={() => {
            setNewUser(false)
            setButtonName("Add New Users")
          }}
          fields={fields}
          url="users"
          name="User"
          change={changeHandler}
        />
      )}
    </div>
  );
};

export default Adminstration;
