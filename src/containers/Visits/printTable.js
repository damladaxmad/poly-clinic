import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownwardIcon';
import { forwardRef } from 'react';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Typography, Button, MenuItem, Menu, Avatar } from "@material-ui/core";
import {TiArrowUnsorted} from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import {MdClose} from "react-icons/md"


const PrintTable = (props) => {
  const tableIcons = {
    // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    // SortArrow: forwardRef((props, ref) => <ArrowDownwardIcon{...props} ref={ref}/>)
    
  };

 
  const dispatch = useDispatch()

  const columns = props.columns;

    return (
    <div style={{ width: "100%", 
    margin: "auto" }}>

      <MaterialTable
      icons={tableIcons}
        columns={props.columns}
        data={props.data}
     
        options={{
          rowStyle: {border: "none"},
          showTitle: false,
          paging: false,
          exportButton: true,
          sorting: true,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 10,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "", border: "1px solid black", fontSize: "13px",
          fontWeight: "bold", 
      },
        }}
      
        style={{ borderRadius: "10px", boxShadow: "none",
         border: props.page == "New Purchase" ? "1px solid black" : "none",}}
       
      />
    </div>
  );
};

export default PrintTable;
