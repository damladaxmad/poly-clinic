import { Button, Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import JsPDF from "jspdf";
import moment from "moment";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useSelector } from "react-redux";
import "../../../utils/print.css";


const ThePage = (props) => {
  const componentRef = useRef();
  const dalabData = useSelector(state => state.tableDalab.tableDalab)

  return (
    <>
      <div
        id="saleReport"
        style={{
        //   alignSelf: "center",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          marginBottom: "30px",
          background: "white",
          borderRadius: '8px',
          padding: "30px 65px",
          gap: "10px",
        //   background:"lightGrey",
          marginRight: "22px"
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

        <div style = {{display:"flex", flexDirection:"column",
    alignItems: "center", marginBottom: "30px"}}>      
        <Typography style = {{
            fontWeight: "bold", fontSize: "24px"
        }}> KULMIYE POLY CLINIC CENTER</Typography>
        <Typography style = {{
             fontSize: "20px"
        }}> MOGADISHU - SOOMALIA</Typography>
        </div>
        {dalabData?.map((data, index) => {
            return  <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent:"space-between",
              borderBottom: "0.5px solid #C1C1C1",
              padding: "6px 0px",
              fontSize: 17,
            }}
          >
            <div style = {{display: "flex", width: "35%", gap: "30px"}}>
            <p style={{ margin: "0px"  }}>
             {index+1}.
            </p>
            <p style={{ margin: "0px",   }}>
             {data.item}
            </p>
            </div>
            <p style={{ margin: "0px", width: "21%", textAlign: "end" }}>
              [ {data.category} ]
            </p>
            <p style={{ margin: "0px", width: "21%", textAlign: "end" }}>
              {data.quantity}B
            </p>
          
          </div>
        })}
       
      </div>
    </>
  );
};


export default ThePage;
