import { useState } from "react";
import MyModal from "../../Modal/Modal";
import { useSelector } from "react-redux";
import MyTable from "../../utils/MyTable"
import Table from "../../utils/Table"
import { memo, useEffect } from "react";
import MaterialTable from "material-table";
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


const UpdatePerscription = (props) => {

    const columns = [
        { title: "Medication", field: "medication", width: "30%" },
        { title: "Quantity", field: "quantity" , width: "15%" },
        { title: "Frequency", field: "frequency", width: "20%"  },
        { title: "Instruction", field: "instruction", width: "35%"   }, 
      ]

    const [data, setData] = useState(props.data)

    console.log(data)

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style = {{color: "#5130DE", fontSize: "28px"}} />),
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

  const createMedicine = () => {
    axios.patch(`${constants.baseUrl}/visitors/${props.visitor}`, {
      prescription: data
    },
  {
    headers: {
      "authorization": constants.token
    }
  }
  ).then((res) => {
    alert("Succesfully Updated!")
    props.change(res?.data?.data?.visitor)
    props.hideModal()
  }).catch((err) => {
    alert(err.response?.data?.message)
  })
  }

  return (
    <MyModal
    onClose={() => props.hideModal()}
    pwidth="720px"
  //   pheight = "478px"
    top="15%"
    left="28%"
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "450px",
        overflowY: data?.length > 3 && "scroll",
        alignItems: "center",
        gap: "15px",
        width: "700px",
        overflowX: "hidden",
        padding: "15px",
     
      }}
    >
    <MaterialTable
      title={<Typography style = {{fontWeight: "bold", fontSize: "20px"}}> Doctor Perscription</Typography>}
      columns={columns}
      icons={tableIcons}
      data={data}
      options={{search: false, paging: false,
        headerStyle: { fontSize: "13px",
        fontWeight: "bold"}
    }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 300)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 100)
          }),
      }}

      style = {{width: "100%"}}
    />

<Button
          style={{
            width: "190px",
            fontSize: "16px",
            fontWeight: "bold",
            height: "50px",
            marginTop: "14px",
            backgroundColor: "#5130DE",
            color: "white",
          }}
          onClick = {() => createMedicine()}
          type="submit"
          variant="contained"
        >
         SAVE ALL
        </Button>
    </div>
    </MyModal>
  )
}

export default UpdatePerscription