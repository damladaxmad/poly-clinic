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
import printHeader from "../../assets/images/greenB.png";
import secondHeader from "../../assets/images/secondHeader.png";
import kulmiyeLogo from "../../assets/images/kulmiyeLogo.jpg";
import MyTable from "../../utils/MyTable"
import PrintTable from "./printTable";

const ResultsPrint = (props) => {
    const componentRef = useRef();

    const columns =  [
      { title: "Test Name", field: "name", width: "33%",
    render: (data) => <p>{data?.testItem.name}</p> },
      { title: "Test Result", field: "price", width: "33%",
      render: (data) => <p>{data?.response}</p>},
      { title: "Possible Oucome", field: "price", width: "33%",
      render: (data) => <div style = {{}}>{data?.testItem.pOutcome?.map(d => {
        return <p style = {{margin: "0px"}}>{d}</p>
      })}</div>},
      
    ] 
    const data =  props.data?.tests
    
    function groupBy(items) {
      return items.reduce((acc, curr) => {
        if (curr?.testItem?.category) {
          const { category } = curr?.testItem;
          const currentItems = acc[category];
      
          return { 
            ...acc,
            [category]: currentItems ? [...currentItems, curr] : [curr]
          };
        }
        return acc;
      }, {});
    }
    
    let singleObject = groupBy(props.data?.tests)
    console.log(singleObject)
    delete singleObject?.urine
    delete singleObject?.stool
    delete singleObject?.URINE
    delete singleObject?.STOOL

    var outputData = [];
for (var i in singleObject) {
    // i is the property name
    outputData.push(singleObject[i]);
}
  console.log(outputData)
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
            width: "101%",
            height: "100%",
            padding: "15px",
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
                Date:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {moment(props.data?.date).format("YYYY/MM/DD")}
                 </Typography>
            </div>
            </div>
          </div>

          
            {outputData?.map(d => {
                return <div style = {{width: "100%", display: "flex",
                alignItems: "start", flexDirection: "column", gap: "12px",
                marginTop: "30px"}}>
                     <PrintTable columns = {columns} data = {d} 
                    />
                  </div>
            })}  
          

       
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

export default ResultsPrint