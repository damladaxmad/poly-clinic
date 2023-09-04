import { useDispatch, useSelector } from "react-redux";
import MyModal from "../../Modal/Modal";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { constants } from "../../Helpers/constantsFile";
import axios from "axios";
import TestItemTable from "./TestItemTable";
import { addTableTestData } from "../../redux/actions/tableTestDataActions";

const RequestTests = (props) => {
  const testItems = props.data
  const [data, setData] = useState();
  const [ids, setIds] = useState({
    testItem: null,
    visitor: null
  })
  const [apiData, setApiData] = useState([])
  console.log(apiData)

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
      pwidth="400px"
    //   pheight = "478px"
      top="25%"
      left="40%"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          gap: "15px",
          width: "380px",
          overFlowX: "hidden",
          padding: "15px",
       
        }}
      >
        <div style = {{display: "flex", width: "100%",
        justifyContent: "space-between"}}>
          <Autocomplete
            id="country-select-demo"
            // key={props.autoReset}
            // disabled={disable}
            sx={{ width: 210 }}
            onChange={(event, value) => {
                setData(value)
                setIds((prevState) => {
                    return {
                      ...prevState,
                      testItem: value?.id,
                      visitor: props?.visitor
                    };
                  });
            }}
            options={testItems}
            autoHighlight
            getOptionLabel={(option) => option?.testItem.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option?.testItem.name}
                {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                placeholder="Select Test Item"
                style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
          <Button
            //   disabled = {disable}
            style={{
              width: "100px",
              fontSize: "16px",
              backgroundColor: "black",
              color: "white",
              height: "40px",
              fontWeight: "bold",
            }}
            type="submit"
            variant="contained"
            onClick={() => {
                setApiData([...apiData, ids])
                if (!data) return
                dispatch(addTableTestData(data))
            }}
          >
            Add
          </Button>
        </div>

        <TestItemTable />

        <Button
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
          Save All
        </Button>
      </div>
    </MyModal>
  );
};

export default RequestTests;
