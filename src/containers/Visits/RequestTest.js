import { useDispatch, useSelector } from "react-redux";
import MyModal from "../../Modal/Modal";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { constants } from "../../Helpers/constantsFile";
import axios from "axios";
import TestItemTable from "./TestItemTable";
import { addTableTestData, deleteTableTestData, setTableTestData } from "../../redux/actions/tableTestDataActions";

const RequestTests = (props) => {
  const testItems = useSelector(state => state.tests.tests)
  console.log(testItems)
  const [data, setData] = useState();
  const [ids, setIds] = useState({
    testItem: null,
    visitor: null
  })
  const [apiData, setApiData] = useState([])
  const dispach = useDispatch()
  console.log(apiData)

  const dispatch = useDispatch()
  const createTest = async () => {
   await axios
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
        dispach(setTableTestData([]))
        props.hideModal();
      })
      .catch((err) => {
        alert(err.response?.data?.message);
      });

      await axios
      .get(
        `${constants.baseUrl}/visitors/${props?.visitor}`,
        {
          headers: {
            authorization: constants.token,
          },
        }
      )
      .then((res) => {
        // alert("Succesfully read visitor");
        dispach(setTableTestData([]))
        props.hideModal();
        props.newChange(res?.data?.data)
      })
      .catch((err) => {
        alert(err.response.data?.message);
      });
  };

  const removeItem = (item) => {
    dispach(deleteTableTestData(item))
    console.log(apiData)
    setApiData((current) => current.filter((i) => i.testItem !== item._id));
  };

  const handler = (data) => {
    if(data) {
    if (data?.length > 0) {
        return data.filter((std) => {
           return (std )
    });

    } 
  }
  else {
      return;
    }
  };

  return (
    <MyModal
      onClose={() => {
        props.hideModal()
        dispach(setTableTestData([]))
      }}
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
            options={handler(testItems)}
            autoHighlight
            getOptionLabel={(option) => option?.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option?.name}
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

        <TestItemTable removeItem = {(item)=> removeItem(item)} />

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
