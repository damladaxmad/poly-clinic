import { Button, Typography } from "@mui/material";
import MaterialTable from "material-table";
import MyModal from "../../Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import moment from "moment";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import printHeader from "../../assets/images/printHeader.jpg";
import secondHeader from "../../assets/images/secondHeader.png";
import kulmiyeLogo from "../../assets/images/kulmiyeLogo.jpg";
import MyTable from "../../utils/MyTable"
import PrintTable from "./printTable";

const PrintSingle = (props) => {
    const componentRef = useRef();

    const columns = props.result ? [
        { title: "Test Name", field: "name", width: "50%",
      render: (data) => <p>{data?.testItem.name}</p> },
        { title: "Test Result", field: "price", width: "50%",
        render: (data) => <p>{data?.response}</p>}
      ] : 
      [
        { title: "Test Name", field: "name", width: "50%"},
        { title: "Test Price", field: "price", width: "50%",
    render: (data) => <p>${data?.price}</p>}
      ]
    const data = props.result ? [props?.singlePrint] :  [props?.singlePrint]

    console.log(props.result)

    return (

        <MyModal
    onClose={() => props.hideModal()}
    pwidth="650px"
    pheight = "478px"
    top="15%"
    left="30%"
  >
        <div
          id="saleReport"
          style={{
            alignSelf: "start",
          //   marginTop: "10px",
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            marginBottom: "30px",
            background: "white",
            borderRadius: '8px',
            paddingBottom: "10px",
            gap: "0px",
            overflowY: "scroll"
          }}
          class="waryaa"
          ref={componentRef}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "end",
            }}
          >
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#2F49D1",
                    color: "white",
                    width: "100px",
                    alignSelf: "flex-end",
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
          </div>
  
          <div style = {{
          }}>
          <img
              src={printHeader}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <div style = {{width: "90%", display: "flex",
        flexDirection: "column", justifyContent: "start",
        margin: "15px auto"}}>

          <div style = {{width: "100%", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        border: "1px solid grey", borderRadius: "10px", padding: "20px"}}>
            <div>
          <div style = {{display: "flex", gap: "20px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                Name:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {props.data?.patient?.name}
              </Typography>
            </div>
            <div style = {{display: "flex", gap: "20px",
          marginTop: "10px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                Phone:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {props.data?.patient?.phone}
              </Typography>
            </div>
            </div>
              <div>
            <div style = {{display: "flex", gap: "20px",
          marginTop: "10px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                Age:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {props.data?.patient?.age}
              </Typography>
            </div>
            <div style = {{display: "flex", gap: "20px",
          marginTop: "10px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                ID:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {props.data?.patient?.patientId >= 10 ? "0" : "00"}{props.data?.patient?.patientId}
              </Typography>
            </div>
            </div>
          </div>

          

          <div style = {{width: "100%", display: "flex",
        alignItems: "start", flexDirection: "column", gap: "10px",
        marginTop: "30px"}}>
            {props.result && <Typography style = {{fontSize: "16px",
        fontWeight: "bold"}}>
                {props.singlePrint?.testItem?.category}</Typography>}
             <PrintTable columns = {columns} data = {data} 
            />
          </div>

       
{/* 
          <div style = {{ height: "500px",
          display: "flex", justifyContent: "center"
          }}>
          <img
              src={kulmiyeLogo}
              style={{
                width: "70%",
                height: "100%",
                opacity: "0.1"
                
              }}
            />
          </div> */}

    
  
          </div>
          {/* <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "15px"
              }}>
                Doctor Signature:   _________________
              </Typography> */}
        </div>
        

     
      </MyModal>
    )
}

export default PrintSingle