import { useSelector } from "react-redux";
import MyModal from "../../Modal/Modal";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { constants } from "../../Helpers/constantsFile";
import axios from "axios";

const VisitPopUp = (props) => {

    const patients = useSelector(state => state.patients.patients)
    const [data, setData] = useState()

    const createTest = () => {
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
    // pwidth="650px"
    // pheight = "478px"
    top="30%"
    left="45%"
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
          sx={{ width: 250 }}
          onChange={(event, value) => {
            setData(value);
          }}
          options={patients}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.name}
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

        <Button
          //   disabled = {disable}
          style={{
            width: "250px",
            fontSize: "16px",
            backgroundColor: "#5130DE",
            color: "white",
            height: "45px",
            fontWeight: "bold",
          }}
          type="submit"
          variant="contained"
          onClick={() => createTest()}
        >
          Create Visit
        </Button>
        </div>

</MyModal>
    )
}

export default VisitPopUp