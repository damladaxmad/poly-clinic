import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { forwardRef } from 'react';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Typography, Button, MenuItem, Menu, Avatar } from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../Helpers/constantsFile";
import { deleteFunction } from "../funcrions/deleteStuff";
import ResetUser from "../containers/AdminstrationContainers/UsersContainer/ResetUser";
import { useNavigate, useLocation } from "react-router-dom";
import ChargeUser from "../containers/AdminstrationContainers/UsersContainer/ChargeUser";
import Payment from "../containers/AdminstrationContainers/UsersContainer/Payment";

const Table = (props) => {
  const tableIcons = {
    // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false);
  const [userShow, setUserShow] = useState(false);
  const [cVModal, setCVmodal] = useState(false);
  const [instance, setInstance] = useState("");
  const [showChargeModal, setShowChargeModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const columns = props.columns;

  const showModal = () => {
    setShow(true);
    handleClose();
  };

  const showUserModal = () => {
    setUserShow(true);
    handleClose();
  };

  const hideModal = () => {
    setShow(false);
    setCVmodal(false);
    props.change();
  };

  const hideUserModal = () => {
    setUserShow(false);
  };

  const showCustomerVendorModal = () => {
    setCVmodal(true);
    setAnchorEl(null);
  };

  const showOrders = () => {
    props.showOrders(instance)
  }
  const showTransactionsFun = () => {
    props.showTransactions(instance)
    handleClose()
  }
  const showCustomersFun = () => {
    props.showCustomers(instance)
    handleClose()
  }
  const showVendorsFun = () => {
    props.showVendors(instance)
    handleClose()
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    instance
  ) => {
    setAnchorEl(event.currentTarget);
    setInstance(instance);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteInstance = () => {
    deleteFunction(
      `Delete ${props.name}`,
      props.name == "Expense" ? instance.description : instance.name,
      `${constants.baseUrl}/${props.url}/${instance._id}`,
      props.change
    );
    setAnchorEl(null);
    handleClose();
  };

  const updateInstance = () => {
    props.update(instance);
    handleClose();
  };


  const disableUser = () => {
    handleClose()
    axios.patch(`${constants.baseUrl}/users/${instance._id}`, {
      status: "disabled"
    },
    {
      headers: {
        "authorization": constants.token
      }
    }).then(res => {
      alert("Succesfully Disabled User")
      props.change()
    })
  }

  const enableUser = () => {
    handleClose()
    axios.patch(`${constants.baseUrl}/users/${instance._id}`, {
      status: "active"
    }).then(res => {
      alert("Succesfully Enabled User")
      props.change()
    })
  }
  const dollarUser = () => {
    handleClose()
    axios.patch(`${constants.baseUrl}/users/${instance._id}`, {
      currencyMark: "$"
    }).then(res => {
      alert("Succesfully Dollared User")
      props.change()
    })
  }

  const cashUser = () => {
    handleClose()
    axios.patch(`${constants.baseUrl}/users/${instance._id}`, {
      currencyMark: "sh."
    }).then(res => {
      alert("Succesfully Cashed User")
      props.change()
    })
  }
  const changePassword = () => {
    handleClose()
    axios.post(`${constants.baseUrl}/users/reset-password/${instance._id}`, {
      password: "12345", passwordConfirm: "12345"
    },
    {
      headers: {
        'authorization': constants.token
      },
    }).then(res => {
      alert("Succesfully Changed Password")
      props.change()
    }).catch((err) => {
      alert(err.response?.data?.message)
    })
  }



  const restore = () => {
    axios.post(`${constants.baseUrl}/${props.url}/restore/${instance._id}`).then((res)=> {
      props.change()
      alert("Successfully Restored")
    }).catch((err)=> {
      alert("something went wrong")
    })
    handleClose()
  }
  let state = props.state;

  return (
    <div style={{ width: "98%",}}>
      
      {userShow && (
        <ResetUser
          hideModal={hideUserModal}
          user={instance}
          change={() => props.change()}
        />
      )}

        {showChargeModal && <ChargeUser  hideModal={() => {
          setShowChargeModal(false)
        }}
          user={instance}
          change={() => props.change()}
        />}
        {showPaymentModal && <Payment  hideModal={() => {
          setShowPaymentModal(false)
        }}
          user={instance}
          change={() => props.change()}
        />}
  

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{marginTop: "25px"}}
      >
        {(props.name == "User") && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Payment")){
              handleClose()
              setShowPaymentModal(true)
              }
              else alert("You have no access!");
            }}
          >
            Payment
          </MenuItem>
        )}

        {props.name == "User" && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Reset User"))
                showUserModal();
              else alert("You have no access");
            }}
          >
            Reset User
          </MenuItem>
        )}
        {props.name == "User" && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Reset User"))
                {
                  setShowChargeModal(true);
                  handleClose()
                }
              else alert("You have no access");
            }}
          >
            Charge User
          </MenuItem>
        )}
        {props.name == "User" && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Disable User"))
                instance.status == "disabled" ? enableUser() : disableUser();
              else alert("You have no access");
            }}
          >
           {instance.status == "disabled" ? "Enable User" : "Disable User"}
          </MenuItem>
        )}
        {props.name == "User" && (
          <MenuItem
            onClick={() => {
             changePassword()
            }}
          >
           Change Password
          </MenuItem>
        )}

   
     {props.name == "Employee" && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes("Give User")) showModal();
              else alert("You have no access");
            }}
          >
            Give User
          </MenuItem>
        )}

        {/* {props.name !== "Customer" && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes(`Delete ${props.name}`))
                deleteInstance();
              else alert("You have no access!");
            }}
          >
            Delete {props.name}
          </MenuItem>
        )} */}

        {(props.name == "Employee" ||
          props.name == "Styles" ||
          props.name == "Customer" || props.name == "Expense") && (
          <MenuItem
            onClick={() => {
              if (activeUser.privillages.includes(`Update ${props.name}`))
                updateInstance();
              else alert("You have no access!");
            }}
          >
            Update {props.name}
          </MenuItem>
        )}

        {(props.name == "User")
          &&  <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Transactions"))
          showTransactionsFun()
          else alert("You have no access!")
          }}>View Transactions</MenuItem>}

        {(props.name == "User")
          &&  <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Customers"))
          showCustomersFun()
          else alert("You have no access!")
          }}>View Customers</MenuItem>}

        {(props.name == "User")
          &&  <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Customers"))
          showVendorsFun()
          else alert("You have no access!")
          }}>View Vendors</MenuItem>}

        {props.name == "Customer" 
          &&  <MenuItem onClick={() => {
          if (activeUser.privillages.includes("View Orders"))
          showOrders()
          else alert("You have no access!")
          }}>View Orders</MenuItem>}

      </Menu>

      <MaterialTable
      icons={tableIcons}
        columns={columns}
        data={props.data}
        localization={{
          body: {
            emptyDataSourceMessage: state,
          },
        }}
        options={{
          rowStyle: {},
          showTitle: false,
          exportButton: true,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 5,
        //   pageSize: props.data.length < 100 ? props.data.length < 8 ? 8 : props.data.length : 100,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#F6F6F6", fontSize: "13px",
        // borderBottom: '1px solid black',
        // borderTop: '1px solid black' 
      },
        }}
        actions={[
          {
            icon: () => (
              <BiDotsHorizontalRounded
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            ),
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClick(event, rowData);
            },
            position: "row",
          },
        ]}
        style={{ borderRadius: "10px", boxShadow: "none",
        border: "1px solid black" }}
      />
    </div>
  );
};

export default Table;
