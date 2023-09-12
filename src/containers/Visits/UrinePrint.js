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

const UrinePrint = (props) => {
    console.log(props.data)
    const componentRef = useRef();

    const columns = [
        { title: "Medication", field: "medication", width: "30%" },
        { title: "Qty", field: "quantity" , width: "20%" },
        { title: "Frequency", field: "frequency", width: "20%"  },
        { title: "Instruction", field: "instruction", width: "30%"   }, 
      ]

    let data;
    props.data?.tests?.map(t => {
        if (t.urineResult?.response.length > 0) data = t?.urineResult?.response
    })

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

          {/* <Typography style = {{fontSize: "18px", fontWeight: "bold",
        marginTop: "30px",}}> 
          Urine Examination Result</Typography> */}
  
       {data?.map(d => {
        return (
            <Physical name = {d.name} result = {d.result}/>
        )
       })}

          </div>
          <Typography style = {{
                fontSize: "16px",
                fontWeight: "500",
                marginTop: "15px",
                alignSelf: "center",
                marginTop: "25px"
              }}>
                Doctor Signature:   _________________
              </Typography>
        </div>
        

     
      </MyModal>
    )
}

const Physical = (props) => {
    console.log(props.result)
    return (
        <div style = {{width: "100%",
         borderLeft: "1px solid black", marginTop: "30px",
         borderTop: "1px solid black", alignSelf: "center",
         }}>

            <div style={{width: "100%", borderBottom: '1px solid black',
        padding: "6px",  borderRight: '1px solid black',}}>
                <Typography style = {{
                    fontWeight: "bold", fontSize: "16px"
                }}> {props.name}</Typography>
            </div>

            <div style = {{width: "100%", display: "flex", flexWrap: "wrap"}}>  
           {props.result?.map(r => {
            return <KeyValue title = {r.key} value = {r.value}/>
})}
            </div>  

        </div>
    )
}

const KeyValue = (props) => {
    return (
        <div style = {{width: "50%", borderBottom: "1px solid black",
    display: "flex",
        padding: "0px"}}>
            <Typography style = {{width: "50%", borderRight: "1px solid black",
        padding: "4px 10px"}}>  {props.title} </Typography>
            <Typography style = {{width: "50%", fontWeight: "bold",
        borderRight: "1px solid black",
        padding: "4px 10px"}}>  {props.value} </Typography>
        </div>
    )
}

export default UrinePrint