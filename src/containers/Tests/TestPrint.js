import { Button, Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import moment from "moment";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import printHeader from "../../assets/images/printHeader.jpg";
import kulmiyeLogo from "../../assets/images/kulmiyeLogo.jpg";

const TestPrint = (props) => {
    const componentRef = useRef();

    return (
        <>
        {props.apiData?.map(data => {
          return    <div
          id="saleReport"
          style={{
            alignSelf: "center",
          //   marginTop: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "800px",
            marginBottom: "30px",
            background: "white",
            borderRadius: '8px',
            paddingBottom: "10px",
            gap: "10px",
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
                height: "80%",
              }}
            />
          </div>

          <div style = {{width: "90%", display: "flex",
        flexDirection: "column", margin: "auto"}}>

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
                {props.patientInfo?.name}
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
                {props.patientInfo?.phone}
              </Typography>
            </div>

          

          <div style = {{width: "100%", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        marginTop: "30px"}}>
              <Typography style = {{
                fontSize: "22px",
              }}>
                ____{data.name}:
              </Typography>

              <div style = {{width: "70%", height: "50px", background: "white",
            border: "2px solid grey", borderRadius: "5px"}}>
              </div>
          </div>

          <Typography style = {{
                fontSize: "22px",
                fontWeight: "bold",
                marginTop: "30px"
              }}>
            Prescription:
          </Typography>

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
          </div>

    
  
          </div>
          <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                Doctor Signature:   _________________
              </Typography>
        </div>
        })}

        <Button variant="contained" style = {{
          backgroundColor: "#2F49D1",
          color: "white",
          width: "100px",
          alignSelf: "center"
        }}
        onClick = {() => props.goBack()}>
          Go back
        </Button>
     
      </>
    )
}

export default TestPrint