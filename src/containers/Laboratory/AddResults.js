
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../../Modal/Modal";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { constants } from "../../Helpers/constantsFile";
import axios from "axios";
import LabItems from "./LabItems";
import { addTableTestData } from "../../redux/actions/tableTestDataActions";

const AddResults = (props) => {

  const testItems = props?.data
  const [data, setData] = useState();
  const [ids, setIds] = useState({
    testItem: null,
    visitor: null
  })
  const [apiData, setApiData] = useState([])
  let cleanArr = []

  props.data?.map(d => {
    if (d.testItem?.type.toLowerCase() == "urine" || d.testItem?.type.toLowerCase() == "stool") return
    cleanArr.push({
        id: d._id, name: d.testItem?.name,
        response: d.response,
        type: d.testItem?.type,
        possibleOutcome: d.testItem?.possibleOutcome
    })
  })

  console.log(cleanArr)

  console.log(props.data)

  const dispatch = useDispatch()
  const createTest = () => {
    axios
      .post(
        `${constants.baseUrl}/tests`,
        apiData ,
        {
          headers: {
            authorization: constants.token,
          },
        }
      )
      .then((res) => {
        alert("Succesfully created tests");
        props.hideModal();
      })
      .catch((err) => {
        alert(err.response.data?.message);
      });
  };

  return (
    <MyModal
      onClose={() => props.hideModal()}
      pwidth="620px"
    //   pheight = "478px"
      top="20%"
      left="32%"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          gap: "15px",
          width: "580px",
          overFlowX: "hidden",
          padding: "15px",
       
        }}
      >
      <Typography style = {{fontSize: "24px", 
    fontWeight: "bold"}}>
        Add Results
      </Typography>

        <LabItems data = {cleanArr}/>

        {/* <Button
          //   disabled = {disable}
          style={{
            width: "250px",
            fontSize: "16px",
            backgroundColor: "#5130DE",
            color: "white",
            height: "45px",
            fontWeight: "bold",
            marginTop: "20px"
          }}
          type="submit"
          variant="contained"
          onClick={() => createTest()}
        >
          Save result
        </Button> */}
      </div>
    </MyModal>
  );
};

export default AddResults;

