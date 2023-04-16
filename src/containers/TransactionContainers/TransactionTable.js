import React, { useState, useEffect, useReducer } from "react";
import { FormControl, MenuItem, Menu, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@mui/material";
import axios from "axios";
import Table from "../../utils/Table";
import moment from "moment/moment";

const TransactionTable = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(1);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );

  useEffect(() => {

  },[startDate, endDate])

  const columns = [
    { title: "ID", field: "saleNumber" },
    {
      title: "Date",
      field: "date",
      render: (data) => <p> {moment(data.created_at).format("DD/MM/YYYY")}</p>,
    },
    { title: "Type", field: "paymentType" },
    { title: "Discount", field: "discount" },
    { title: "Total", field: "total" },
    { title: "Invoice", field: "invoice" },
    { title: "Status", field: "status" },
  ];

  const parentDivStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0px",
    padding: "20px",
    background: "white",
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "8px 8px 0px 0px",
  };

  const searchStyle = {
    width: "400px",
    height: "40px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    background: "#EFF0F6",
    border: "none",
  };

  const selectStyle = { height: "40px", color: "#B9B9B9", width: "150px" };

  const statusArr = ["All", "Active", "Inactive"];
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1);

  const change = () => {
    setForce((state) => state + 1);
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const handler = (data) => {
    if (data?.length > 0) {
      return data.filter(
        (std) =>
      (std.invoice?.toLowerCase().includes(query) ||
          std.refNumber?.toLowerCase().includes(query) ) && (
          moment(std.date).format("MM-DD-YYYY")  >= startDate &&
          moment(std.date).format("MM-DD-YYYY")  <= endDate)
      );
    } else {
      return;
    }
  };

  useEffect(() => {
    setState("Loading...");
  }, [force]);

  useEffect(() => {
    if (props.data?.length < 1) setState("Nothing found!");
  }, [props.data, startDate, endDate]);

  useEffect(() => {
    if (query != "") {
      setState("No matching records!");
    }
  }, [query]);

  return (
    <>
      <div style={parentDivStyle}>
        <input
          type="text"
          placeholder="Search"
          style={searchStyle}
          onChange={(e) => setQuery(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="date"
          label="Start Date"
          value={moment(new Date(startDate)).format("YYYY-MM-DD")}
          style={{ width: "20%", background: "white" }}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          type="date"
          label="End Date"
          value={moment(new Date(endDate)).format("YYYY-MM-DD")}
          placeholder="Search"
          style={{ width: "20%", background: "white" }}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
      </div>

      <Table
        data={handler(props.data)}
        change={change}
        state={state}
        columns={columns}
        url={props.url}
        name={props.name}
        type="Transaction"
      />
    </>
  );
};

export default TransactionTable;
