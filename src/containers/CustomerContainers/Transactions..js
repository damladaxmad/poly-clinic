import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import jaabirLogo from "../../assets/images/jaabirLogo.jpg";
import { Divider } from "@material-ui/core";
import femaleProfile from "../../assets/images/sampleProfile.png";
import MaterialTable from "material-table";
import moment from "moment";
import { useSelector } from "react-redux";
import { AiFillPrinter } from "react-icons/ai";
import { Button } from "@mui/material";
import { constants } from "../../Helpers/constantsFile";
import "../../utils/print.css";
import Details from "./Details";

const Transactions = (props) => {
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const componentRef = useRef();
  const [detailData, setDetailData] = useState();

  const detailHandler = (data) => {
    setDetailData(data);
    setShowDetails(true);
  };

  let balances = []
  let prevBalance = 0
  let newStuff = ""

  props.instance?.transactions?.map((t, index) => {
    balances.push((t.debit - t.credit) + prevBalance)
    prevBalance = balances[index]
  })

  // console.log(balances)
  let myIndex = 0

  const materialOptions = {
    showTitle: false,
    exportButton: true,
    sorting: false,
    showTextRowsSelected: false,
    toolbar: false,
    paging: false,
    pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
    pageSize: 4,
    draggable: false,
    actionsColumnIndex: -1,
    rowStyle: { border: "none" },
    headerStyle: {
      background: "#EFF0F6",
      fontSize: "13px",
      borderTop: "1px solid grey",
      borderBottom: "1px solid grey",
    },
  };

  const columns = [

    {
      title: "Description",
      field: "description", width: "25%",
      render: (data) => {
        return (
          <p
            style={{
              color:
                data?.description == "Sales Invoice" ||
                data?.description == "Purchase Order Invoice"
                  ? "blue"
                  : null,
              cursor:
                data?.description == "Sales Invoice" ||
                data?.description == "Purchase Order Invoice"
                  ? "pointer"
                  : null,
            }}
            onClick={() => {
              if (data?.description == "Payment") return
              detailHandler(data)
            }}
          >
            {(data?.purchase && data.purchase?.paymentType == "invoice") ? `${data.description} (${data.purchase?.refNumber})` : data.description}
          </p>
        );
      },
      cellStyle: { border: "none" },
    },
  
    {
      title: "Date",
      field: "date",
      render: (data) => {
        const formatted = moment(data.date).format("DD/MM/YYYY");
        return <p>{formatted}</p>;
      },
      cellStyle: { border: "none" },
    },
    { title: "User", field: "user", cellStyle: { border: "none" }, width: "20%" },
    { title: "Debit", field: "debit", cellStyle: { border: "none" } },
    { title: "Credit", field: "credit", cellStyle: { border: "none" } },
    {
      title: "Balance",
      field: "balance",
      render: (data) => {
        return (
          <p style={{ texAlign: "end" }}>
            {data.balance < 0
              ? `-${constants.moneySign}${balances[data.tableData.id] * -1}`
              : `${constants.moneySign}${balances[data.tableData.id]}`}
          </p>
        );
      },
      cellStyle: { border: "none" },
    },
  ];

  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      {showDetails && (
        <Details
          hideModal={() => setShowDetails(false)}
          data={detailData}
          name={props.name}
        />
      )}
      <div
        class="waryaa"
        ref={componentRef}
        style={{
          background: "#F7F7F7",
          width: "95%",
          margin: "20px auto",
          display: "flex",
          marginBottom: "0px",
          borderRadius: "10px 10px 0px 0px",
          flexDirection: "column",
        }}
      >
        <ReactToPrint
          trigger={() => (
            <Button
              // class = "wotton"
              variant="contained"
              style={{
                backgroundColor: "#2F49D1",
                color: "white",
                width: "100px",
                alignSelf: "flex-end",
                margin: "10px",
              }}
              startIcon={
                <AiFillPrinter
                  style={{
                    color: "white",
                  }}
                />
              }
            >
              Print
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle="print"
        />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
          class="imgDiv"
        >
          <img
            src={femaleProfile}
            style={{
              width: "150px",
              height: "150px",
            }}
          />
          <p style={{ margin: "0px", fontWeight: "700", fontSize: "25px" }}>
            {" "}
            {props.name} Transactions
          </p>
        </div>

        <Divider
          style={{ height: "1px", margin: "20px 0px", background: "grey" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <p style={{ fontWeight: "700" }}> {props.name} Name:</p>
            <p> {props.instance.name}</p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <p style={{ fontWeight: "700" }}> {props.name} Phone:</p>
            <p> {props.instance.phone}</p>
          </div>
        </div>

        <MaterialTable
          columns={columns}
          data={props.instance.transactions}
          options={materialOptions}
          style={{
            borderRadius: "10px",
            boxShadow: "none",
            width: "100%",
            marginTop: "0px",
            background: "#F7F7F7",
          }}
        />
        <div
          style={{
            margin: "0px auto",
            background: "#F7F7F7",
            borderRadius: "0px 0px 10px 10px",
            display: "flex",
            fontSize: "15px",
            justifyContent: "flex-end",
            gap: "15px",
            padding: "20px 60px",
            width: "100%",
          }}
        >
          <p
            style={{
              margin: "0px",
              fontWeight: "700",
              textAlign: "end",
            }}
          >
            Total:
          </p>
          <p>
            {props.instance.balance < 0
              ? `-${constants.moneySign}${props.instance.balance?.toFixed(2) * -1}`
              : `${constants.moneySign}${props.instance.balance.toFixed(2)}`}
          </p>
        </div>
      </div>
    </>
  );
};

export default Transactions;
