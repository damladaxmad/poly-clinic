import { useSelector } from "react-redux";
import MyTable from "../../utils/MyTable"
import Table from "../../utils/Table"
import { memo, useEffect } from "react";
import MaterialTable from "material-table";
import React, { useState } from "react";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownwardIcon';
import { forwardRef } from 'react';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Typography, Button, MenuItem, Menu, Avatar } from "@material-ui/core";
import {TiArrowUnsorted} from "react-icons/ti"
import { useDispatch } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import {MdClose} from "react-icons/md"
import axios from "axios";

const columns = [
    { title: "Test Name", field: "name", width: "33%", editable:'never'},
    // { title: "Type", field: "type", width: "20%", editable:'never'},
    { title: "Result", field: "response", width: "25%"},
    { title: "P.Outcomes", field: "possibleOutcome", width: "25%", editable:'never'}
  ]

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const LabItems = (props) => {

    const tableTestData = useSelector(state => state.tableTestData.tableTestData)
    const [data, setData] = useState(props.data)

    console.log(props.data)

    const handler = (data) => { 
        if (data?.length > 0) {
          return data
        } else {
          return
        }  
      };

      console.log(tableTestData)

      useEffect(() => {

      }, [tableTestData])

    return (
        <div style={{width: "100%", marginTop: "5px", marginBottom: "10px",
        height: props.data?.length > 2 && "210px",
        overflowY: props.data?.length > 3 && "scroll",
        overFlowX: "hidden",}}>

           <MaterialTable
      icons={tableIcons}
        columns={columns}
        data={data}

        editable={{
            onRowUpdate: (newData, oldData) => 
                new Promise((resolve, reject) => {
                    console.log(newData)
                    axios
                    .patch(
                      `${constants.baseUrl}/tests/${oldData?.id}`,
                      {response: newData.response} ,
                      {
                        headers: {
                          authorization: constants.token,
                        },
                      }
                    )
                    .then((res) => {
                      // alert("Succesfully created tests");
                      const dataUpdate = [...data];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setData([...dataUpdate]);
                      resolve()
                    //   props.hideModal();
                    })
                    .catch((err) => {
                      alert(err.response?.data?.message);
                    });
                  }),
            
            }}

        options={{
          rowStyle: {},
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
          headerStyle: { background: "#F8F6F6", fontSize: "13px",
          fontWeight: "bold"
      },
        }}
      
        style={{ borderRadius: "10px", boxShadow: "none",
        height: "150px"
        }}
       
      />
        </div>
    )
}

export default memo(LabItems)