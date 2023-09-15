import { useSelector } from "react-redux";
import MyModal from "../../Modal/Modal";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { constants } from "../../Helpers/constantsFile";
import axios from "axios";
import Register from "../../utils/Register";

const VisitPopUp = (props) => {

    const patients = useSelector(state => state.patients.patients?.reverse())
    const [data, setData] = useState()
    const [showPatient, setShowPatient] = useState(false)

    const fields = [
      { label: "Enter Name", type: "text", name: "name" },
      { label: "Enter Phone", type: "text", name: "phone" },
      { label: "Enter Age", type: "text", name: "age" },
      { label: "Enter Address", type: "text", name: "district" },
    ];

    const createTest = (data) => {
        axios.post(`${constants.baseUrl}/visitors`, {
          patient: data
        }, 
        {
          headers: {
            "authorization": constants.token
          }
        }).then(res => {
          alert("Succesfully created visitor")
          props.hideModal()
        }).catch(err => {
          alert(err.response.data?.message)
        })
    }


    return  ( <MyModal
    onClose={() => props.hideModal()}
    // pwidth="50px"
    // pheight = "478px"
    top="30%"
    left="42%"
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "15px",
        width: "100%",
        overFlowX: "hidden",
        padding: "15px",
      }}
    >

  
      <Autocomplete
          id="country-select-demo"
          // key={props.autoReset}
          // disabled={disable}
          sx={{ width: 300 }}
          onChange={(event, value) => {
            setData(value);
          }}
          options={patients}
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
              placeholder="Select Patient"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        
        <div style = {{display: "flex", flexDirection: "row",
      gap: "10px", alignSelf: "center",
      cursor: "pointer"}}>
          <Typography style = {{
            fontSize: "15px"
          }}>
            patient does not exist?
          </Typography>
          <Typography style = {{
            fontSize: "15px",
            color: "#5130DE",
            fontWeight: "bold"
          }}
          onClick = {() => {
            setShowPatient(true)
          }}>
            Create
          </Typography>
        </div>
        {showPatient && (
          <Register
            //   update={update}
            //   instance={updatedCustomer}
            //   reset={resetFomr}
            hideModal={(data) => {
              setShowPatient(false);
              createTest(data?.createdPatient?._id)
            }}
            fields={fields}
            url="patients"
            name="Patient"
          />
        )}
        <Button
          //   disabled = {disable}
          style={{
            width: "300px",
            fontSize: "16px",
            backgroundColor: "#5130DE",
            color: "white",
            height: "45px",
            fontWeight: "bold",
          }}
          type="submit"
          variant="contained"
          onClick={() => createTest(data)}
        >
          Create Visit
        </Button>
        </div>

</MyModal>
    )
}

export default VisitPopUp