import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from "react-redux";
import moment from "moment";
import { DateRangeRounded } from "@material-ui/icons";

const Selectors = (props) => {

  const medicine = useSelector(state => state.products.products)
  const vendors = useSelector(state => state.vendors.vendors)
  const [date, setDate] = useState(moment(new Date()).format("MM-DD-YYYY"))

    // const medicine = ["Emoxicilin Tablet", "Ampicilin Tablet", "Syrup Injection"];
    const types = ["invoice", "cash"]

    return (
        <div style = {{display: "flex", gap: "40px", flexDirection: "row",
        justifyContent: "space-between"}}>

          <div style = {{display: "flex", gap: "30px"}}>
           <Autocomplete
           autoComplete = {false}
           onChange={(event, value) => props.item(value?.name)} 
           key={`${props.autoReset}m`}
            id="country-select-demo"
            sx={{ width: 200 }}
            options={medicine}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.name} 
                {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
              class = "myText"
               variant="outlined"
               placeholder="Select Medicine"
               style = {{border: "1.5px solid #6E6E6E",
              borderRadius: "8px"}}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                   }}
              />
            )}
          />

           <Autocomplete
            id="country-select-demo"
            key={props.autoReset}
            sx={{ width: 200 }}
            onChange={(event, value) => props.vendor(value?._id)} 
            options={vendors}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.name} 
                {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
               variant="outlined"
               placeholder="Select Vendor"
               style = {{border: "1.5px solid #6E6E6E",
              borderRadius: "8px", }}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  }}
              />
            )}
          />

          </div>

          <div style = {{display: "flex", gap: "30px"}}>
          <Autocomplete
            id="country-select-demo"
            key={props.autoReset}
            onChange={(event, value) => props.type(value)} 
            sx={{ width: 140 }}
            options={types}
            autoHighlight
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option} 
                {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
               variant="outlined"
               placeholder="Select Type"
               style = {{border: "1.5px solid #6E6E6E",
              borderRadius: "8px", }}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  }}
              />
            )}
          />

      <input
        // value= {moment(new Date(date)).format("MM-DD-YYYY")}
        type="date"
        style={{
          width: "140px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
        }}
        onChange={(e) => {
          // setDate(e.target.value)
          props.date(e.target.value)
        }}
      />

      </div>
          
          </div>
    )
}

export default Selectors